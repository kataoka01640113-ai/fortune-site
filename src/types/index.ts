export interface Shukumeizu {
  topLeft: number;
  topCenter: string;
  topRight: string;
  middleLeft: string;
  middleCenter: string;
  middleRight: string;
  bottomLeft: string;
  bottomCenter: string;
  bottomRight: string;
}

export interface DiagnosisText {
  [key: string]: string;
}

export interface DiagnosisResult {
  birthDate: string;
  gender: string;
  type: string;
  typeName: string;
  shukumeizu: Shukumeizu;
  diagnosisText: DiagnosisText;
  hiroMessage?: string;
}

export const TypeMap: Record<number, string> = {
  1: '大樹',
  2: '草花',
  3: '太陽',
  4: '灯火',
  5: '山岳',
  6: '大地',
  7: '鋼鉄',
  8: '宝石',
  9: '大海',
  0: '雨露'
};

export const TypeFileMap: Record<string, string> = {
  '大樹': 'daiju',
  '草花': 'kusabana',
  '太陽': 'taiyo',
  '灯火': 'tomoshibi',
  '山岳': 'sangaku',
  '大地': 'daichi',
  '鋼鉄': 'kotetsu',
  '宝石': 'houseki',
  '大海': 'taikai',
  '雨露': 'uro'
};
