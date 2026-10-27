import * as XLSX from 'xlsx'
import type { Shukumeizu } from './types'
import { shukumeizuData } from './shukumeizuData'

/**
 * 生年月日をExcelのシリアル値に変換する
 * 1900/1/1 = 1, 2026/12/31 = 46387のような形式
 * @param year - 年
 * @param month - 月（1-12）
 * @param day - 日（1-31）
 * @returns Excelシリアル値
 */
export function dateToExcelSerialNumber(year: number, month: number, day: number): number {
  // 1899年12月31日を基準点(0)とする
  const baseDate = new Date(1899, 11, 31)
  const targetDate = new Date(year, month - 1, day)
  
  // 日数の差を計算（ミリ秒 -> 日数）
  const timeDiff = targetDate.getTime() - baseDate.getTime()
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1
  
  return daysDiff
}

/**
 * 生年月日をExcelの検索キーに変換する（互換性用）
 * 例：1976年4月18日 → "1976-04-18"
 */
export function dateToExcelKey(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

/**
 * JSONデータから宿命図を取得する（フォールバック用）
 */
export function getShukumeizuFromJSON(serialNumber: number): Shukumeizu {
  const entry = shukumeizuData.find((item: any) => item.serialNumber === serialNumber)
  if (!entry) {
    throw new Error(`対応する宿命図が見つかりません（シリアル値：${serialNumber}）`)
  }

  return {
    topLeft: entry.topLeft,
    topCenter: entry.topCenter,
    topRight: entry.topRight,
    middleLeft: entry.middleLeft,
    middleCenter: entry.middleCenter,
    middleRight: entry.middleRight,
    bottomLeft: entry.bottomLeft,
    bottomCenter: entry.bottomCenter,
    bottomRight: entry.bottomRight
  }
}

/**
 * Excelファイルから宿命図を取得する
 * @param excelFile - Excelファイル（ArrayBuffer）
 * @param serialNumber - Excelシリアル値
 * @returns 宿命図
 */
export function getShukumeizuFromExcel(excelFile: ArrayBuffer, serialNumber: number): Shukumeizu {
  try {
    const workbook = XLSX.read(excelFile, { type: 'array' })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]

    if (!worksheet) {
      throw new Error('Excelシートが見つかりません')
    }

    const data: unknown[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][]

    for (const row of data) {
      // Excelの第1列がシリアル値として扱われる
      const rowSerialNumber = Number(row[0])
      if (rowSerialNumber === serialNumber) {
        return {
          topLeft: Number(row[1]),
          topCenter: String(row[2] || ''),
          topRight: String(row[3] || ''),
          middleLeft: String(row[4] || ''),
          middleCenter: String(row[5] || ''),
          middleRight: String(row[6] || ''),
          bottomLeft: String(row[7] || ''),
          bottomCenter: String(row[8] || ''),
          bottomRight: String(row[9] || '')
        }
      }
    }

    throw new Error(`対応する宿命図が見つかりません（シリアル値：${serialNumber}）`)
  } catch (error) {
    // Excelの読み込みが失敗した場合はJSONデータで試す
    return getShukumeizuFromJSON(serialNumber)
  }
}

/**
 * URLからExcelファイルを取得する
 */
export async function fetchExcelFile(url: string): Promise<ArrayBuffer> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Excelファイルの読み込みに失敗しました')
    }
    return await response.arrayBuffer()
  } catch (error) {
    // Excelが利用できない場合は、JSONデータを使用する
    console.warn('Excelファイルの読み込みに失敗しました。JSONデータを使用します。')
    return new ArrayBuffer(0)
  }
}
