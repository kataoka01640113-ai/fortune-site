import { describe, it, expect } from 'vitest'
import { classifyType } from '../src/services/typeClassifier'

describe('typeClassifier', () => {
  it('37から鋼鉄を判定できる', () => {
    expect(classifyType(37)).toBe('鋼鉄')
  })

  it('21から大樹を判定できる', () => {
    expect(classifyType(21)).toBe('大樹')
  })

  it('10から雨露を判定できる', () => {
    expect(classifyType(10)).toBe('雨露')
  })

  it('28から草花を判定できる', () => {
    expect(classifyType(28)).toBe('草花')
  })

  it('不正な値を適切に処理できる', () => {
    expect(() => classifyType(null as any)).toThrow('数値が欠損しています')
    expect(() => classifyType(undefined as any)).toThrow('数値が欠損しています')
  })

  it('すべてのタイプが正しく判定できる', () => {
    expect(classifyType(1)).toBe('大樹')
    expect(classifyType(2)).toBe('草花')
    expect(classifyType(3)).toBe('太陽')
    expect(classifyType(4)).toBe('灯火')
    expect(classifyType(5)).toBe('山岳')
    expect(classifyType(6)).toBe('大地')
    expect(classifyType(7)).toBe('鋼鉄')
    expect(classifyType(8)).toBe('宝石')
    expect(classifyType(9)).toBe('大海')
    expect(classifyType(10)).toBe('雨露')
  })
})
