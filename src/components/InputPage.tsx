import React, { useState } from 'react'
import type { DiagnosisResult } from '../types'
import { classifyType } from '../services/typeClassifier'
import { fetchExcelFile, getShukumeizuFromExcel, dateToExcelSerialNumber } from '../services/shukumeizuService'
import { loadDiagnosisText, loadHiroMessage } from '../services/diagnosisService'

interface InputPageProps {
  onSubmit: (result: DiagnosisResult) => void
}

export default function InputPage({ onSubmit }: InputPageProps) {
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('male')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isValidDate = (y: number, m: number, d: number): boolean => {
    if (m < 1 || m > 12) return false
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
      daysInMonth[1] = 29
    }
    return d >= 1 && d <= daysInMonth[m - 1]
  }

  const parseDateString = (dateStr: string): { year: number; month: number; day: number } | null => {
    if (dateStr.length !== 8 || !/^\d{8}$/.test(dateStr)) {
      return null
    }
    const year = parseInt(dateStr.substring(0, 4))
    const month = parseInt(dateStr.substring(4, 6))
    const day = parseInt(dateStr.substring(6, 8))
    return { year, month, day }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!birthDate) {
      setError('生年月日を入力してください')
      return
    }

    const parsed = parseDateString(birthDate)
    if (!parsed) {
      setError('生年月日は8桁の数字で入力してください（例：19900415）')
      return
    }

    const { year: y, month: m, day: d } = parsed

    if (!isValidDate(y, m, d)) {
      setError('実在しない日付です')
      return
    }

    setLoading(true)

    try {
      const serialNumber = dateToExcelSerialNumber(y, m, d)
      
      let shukumeizu
      try {
        const excelBuffer = await fetchExcelFile('/result/shukumeizu/shukumeizu.xlsx')
        shukumeizu = getShukumeizuFromExcel(excelBuffer, serialNumber)
      } catch (excelError) {
        // Excelが利用できない場合はスキップ（getShukumeizuFromExcelで自動的にJSONにフォールバック）
        shukumeizu = getShukumeizuFromExcel(new ArrayBuffer(0), serialNumber)
      }

      if (shukumeizu.topLeft === null || shukumeizu.topLeft === undefined) {
        setError('宿命図の左上の数値が欠損しています')
        setLoading(false)
        return
      }

      const typeName = classifyType(shukumeizu.topLeft)
      const diagnosisText = await loadDiagnosisText(typeName)
      const hiroMessage = await loadHiroMessage(typeName)

      const result: DiagnosisResult = {
        birthDate: `${y}年${m}月${d}日`,
        gender: gender === 'male' ? '男性' : '女性',
        type: shukumeizu.topLeft.toString(),
        typeName,
        shukumeizu,
        diagnosisText,
        hiroMessage: hiroMessage || undefined
      }

      onSubmit(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : '診断処理中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page input-page">
      <header className="header">
        <h1 className="app-title">生年月日を入力</h1>
      </header>

      <main className="main">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="birthDate">生年月日</label>
            <input
              id="birthDate"
              type="text"
              maxLength="8"
              placeholder="19900415"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value.replace(/\D/g, ''))}
              className="input-date-field"
              inputMode="numeric"
            />
            <div className="input-hint">8桁の数字で入力してください</div>
          </div>

          <div className="form-group">
            <label htmlFor="gender">性別</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input-select"
            >
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="btn btn-primary btn-large">
            {loading ? '診断中...' : '診断する'}
          </button>
        </form>
      </main>
    </div>
  )
}
