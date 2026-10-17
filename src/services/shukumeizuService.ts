import * as XLSX from 'xlsx'
import type { Shukumeizu } from './types'
import { shukumeizuData } from './shukumeizuData'

/**
 * 生年月日をExcelの検索キーに変換する
 * 例：1976年4月18日 → "1976-04-18"
 */
export function dateToExcelKey(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

/**
 * JSONデータから宿命図を取得する（フォールバック用）
 */
export function getShukumeizuFromJSON(dateKey: string): Shukumeizu {
  const entry = shukumeizuData.find((item: any) => item.dateKey === dateKey)
  if (!entry) {
    throw new Error(`対応する宿命図が見つかりません（${dateKey}）`)
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
 * @param dateKey - 検索キー（例：1976-04-18）
 * @returns 宿命図
 */
export function getShukumeizuFromExcel(excelFile: ArrayBuffer, dateKey: string): Shukumeizu {
  try {
    const workbook = XLSX.read(excelFile, { type: 'array' })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]

    if (!worksheet) {
      throw new Error('Excelシートが見つかりません')
    }

    const data: unknown[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][]

    for (const row of data) {
      if (row[0] === dateKey) {
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

    throw new Error(`対応する宿命図が見つかりません（${dateKey}）`)
  } catch (error) {
    // Excelの読み込みが失敗した場合はJSONデータで試す
    return getShukumeizuFromJSON(dateKey)
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
