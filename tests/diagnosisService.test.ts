import { describe, it, expect } from 'vitest'
import { parseTextFile } from '../src/services/diagnosisService'

describe('diagnosisService', () => {
  it('見出しと本文を正しく解析できる', () => {
    const text = `# 基本性格
これは基本性格です。

# 才能
これは才能です。

# 適職
これは適職です。`

    const result = parseTextFile(text)
    
    expect(result['基本性格']).toContain('これは基本性格です。')
    expect(result['才能']).toContain('これは才能です。')
    expect(result['適職']).toContain('これは適職です。')
  })

  it('未設定の項目を非表示にできる', () => {
    const text = `# 基本性格
これは基本性格です。`

    const result = parseTextFile(text)
    
    expect(result['基本性格']).toBeDefined()
    expect(result['才能']).toBeUndefined()
  })

  it('複数行の本文を正しく処理できる', () => {
    const text = `# 基本性格
第1行目
第2行目
第3行目`

    const result = parseTextFile(text)
    
    expect(result['基本性格']).toContain('第1行目')
    expect(result['基本性格']).toContain('第2行目')
    expect(result['基本性格']).toContain('第3行目')
  })
})
