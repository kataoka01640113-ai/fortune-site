import { TypeFileMap, type DiagnosisText } from '../types'

/**
 * タイプ名から診断テキストファイル名を取得
 */
function getTextFileName(typeName: string): string {
  const fileName = TypeFileMap[typeName]
  if (!fileName) {
    throw new Error(`対応するテキストファイルが見つかりません：${typeName}`)
  }
  return fileName
}

/**
 * テキストファイルをパースして診断内容を抽出
 */
export function parseTextFile(content: string): DiagnosisText {
  const result: DiagnosisText = {}
  const lines = content.split('\n')

  let currentSection = ''
  let currentContent: string[] = []

  for (const line of lines) {
    const trimmedLine = line.trim()

    if (trimmedLine.startsWith('#')) {
      if (currentSection && currentContent.length > 0) {
        result[currentSection] = currentContent.join('\n').trim()
      }

      currentSection = trimmedLine.replace(/^#+\s*/, '')
      currentContent = []
    } else if (trimmedLine || currentSection) {
      currentContent.push(line)
    }
  }

  if (currentSection && currentContent.length > 0) {
    result[currentSection] = currentContent.join('\n').trim()
  }

  return result
}

/**
 * 診断テキストファイルを読み込む
 */
export async function loadDiagnosisText(typeName: string): Promise<DiagnosisText> {
  const fileName = getTextFileName(typeName)
  const url = `/result/diagnosis-results/${fileName}.txt`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      if (response.status === 404) {
        return {}
      }
      throw new Error('診断テキストの読み込みに失敗しました')
    }
    const content = await response.text()
    return parseTextFile(content)
  } catch (error) {
    console.error(`診断テキスト読み込みエラー (${fileName}):`, error)
    return {}
  }
}

/**
 * HIROのメッセージを読み込む
 */
export async function loadHiroMessage(typeName: string): Promise<string | undefined> {
  const fileName = getTextFileName(typeName)
  const url = `/result/diagnosis-results/${fileName}.txt`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      return undefined
    }
    const content = await response.text()
    const lines = content.split('\n')
    
    let inHiroSection = false
    const hiroLines: string[] = []
    
    for (const line of lines) {
      const trimmedLine = line.trim()
      
      if (trimmedLine.startsWith('#') && trimmedLine.includes('HIRO')) {
        inHiroSection = true
        continue
      }
      
      if (trimmedLine.startsWith('#') && inHiroSection) {
        break
      }
      
      if (inHiroSection && (trimmedLine || hiroLines.length > 0)) {
        if (trimmedLine) {
          hiroLines.push(`<p>${trimmedLine}</p>`)
        }
      }
    }
    
    return hiroLines.length > 0 ? hiroLines.join('\n') : undefined
  } catch (error) {
    console.error(`HIROメッセージ読み込みエラー (${fileName}):`, error)
    return undefined
  }
}
