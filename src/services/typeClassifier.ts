import { TypeMap } from '../types'

/**
 * 宿命図の左上の数値から10種類のタイプを判定する
 * @param topLeftValue - 宿命図の左上の数値
 * @returns タイプ名
 */
export function classifyType(topLeftValue: number): string {
  if (topLeftValue === null || topLeftValue === undefined) {
    throw new Error('数値が欠損しています')
  }

  const lastDigit = topLeftValue % 10
  const typeName = TypeMap[lastDigit]

  if (!typeName) {
    throw new Error('不正な値です')
  }

  return typeName
}
