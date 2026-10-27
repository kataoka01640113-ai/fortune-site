import React, { useState } from 'react'
import './styles.css'
import TopPage from './components/TopPage'
import InputPage from './components/InputPage'
import ResultPage from './components/ResultPage'
import type { DiagnosisResult } from './types'

type PageType = 'top' | 'input' | 'result'

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('top')
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null)

  const handleStartDiagnosis = () => {
    setCurrentPage('input')
  }

  const handleDiagnosisSubmit = (result: DiagnosisResult) => {
    setDiagnosisResult(result)
    setCurrentPage('result')
  }

  const handleReturnToInput = () => {
    setCurrentPage('input')
  }

  const handleReturnToTop = () => {
    setCurrentPage('top')
  }

  return (
    <div className="app">
      {currentPage === 'top' && <TopPage onStart={handleStartDiagnosis} />}
      {currentPage === 'input' && <InputPage onSubmit={handleDiagnosisSubmit} />}
      {currentPage === 'result' && diagnosisResult && (
        <ResultPage result={diagnosisResult} onDiagnoseAgain={handleReturnToInput} />
      )}
    </div>
  )
}
