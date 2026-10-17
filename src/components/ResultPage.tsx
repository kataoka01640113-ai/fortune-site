import React from 'react'
import type { DiagnosisResult } from '../types'
import { siteConfig } from '../config/siteConfig'

interface ResultPageProps {
  result: DiagnosisResult
  onDiagnoseAgain: () => void
}

export default function ResultPage({ result, onDiagnoseAgain }: ResultPageProps) {
  return (
    <div className="page result-page">
      <header className="header">
        <h1 className="app-title">診断結果</h1>
      </header>

      <main className="main">
        <div className="result-container">
          <div className="result-header">
            <h2 className="type-name">{result.typeName}</h2>
            <p className="birth-date">{result.birthDate}生まれ</p>
          </div>

          <section className="diagnosis-sections">
            {Object.entries(result.diagnosisText).map(([key, value]) => {
              if (!value || value.trim() === '') return null
              if (key.includes('HIRO')) return null
              return (
                <div key={key} className="diagnosis-section">
                  <h3 className="section-title">{key}</h3>
                  <p className="section-content">{value}</p>
                </div>
              )
            })}
          </section>

          <section className="shukumeizu-section">
            <h3 className="section-title">宿命図</h3>
            <div className="shukumeizu-grid">
              <div className="shukumeizu-cell">{result.shukumeizu.topLeft}</div>
              <div className="shukumeizu-cell">{result.shukumeizu.topCenter}</div>
              <div className="shukumeizu-cell">{result.shukumeizu.topRight}</div>

              <div className="shukumeizu-cell">{result.shukumeizu.middleLeft}</div>
              <div className="shukumeizu-cell">{result.shukumeizu.middleCenter}</div>
              <div className="shukumeizu-cell">{result.shukumeizu.middleRight}</div>

              <div className="shukumeizu-cell">{result.shukumeizu.bottomLeft}</div>
              <div className="shukumeizu-cell">{result.shukumeizu.bottomCenter}</div>
              <div className="shukumeizu-cell">{result.shukumeizu.bottomRight}</div>
            </div>
          </section>

          {result.hiroMessage && (
            <section className="hiro-message-section">
              <h3 className="section-title">HIRO（占い師）から一言</h3>
              <div 
                className="hiro-message-content"
                dangerouslySetInnerHTML={{ __html: result.hiroMessage }}
              />
            </section>
          )}

          <section className="social-links-section">
            {siteConfig.lineUrl && (
              <a href={siteConfig.lineUrl} target="_blank" rel="noopener noreferrer" className="btn btn-social">
                公式LINEへのご案内
              </a>
            )}
            {siteConfig.instagramUrl && (
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-social">
                さらに詳しく知りたい方はこちら
              </a>
            )}
            {siteConfig.reservationUrl && (
              <a href={siteConfig.reservationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-social">
                鑑定予約
              </a>
            )}
          </section>

          <button onClick={onDiagnoseAgain} className="btn btn-primary btn-large">
            もう一度診断する
          </button>
        </div>
      </main>
    </div>
  )
}
