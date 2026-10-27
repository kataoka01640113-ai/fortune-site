import React, { useState } from 'react'

interface TopPageProps {
  onStart: () => void
}

export default function TopPage({ onStart }: TopPageProps) {
  return (
    <div className="page top-page">
      <header className="header">
        <h1 className="app-title">算命学タイプ診断</h1>
        <p className="app-subtitle">あなたの生年月日から宿命のタイプを診断します</p>
      </header>

      <main className="main">
        <div className="content-box">
          <h2>算命学とは</h2>
          <p>
            算命学は、生年月日から人生の運命を診断する占いの手法です。
            あなた固有の「宿命図」を求めることで、基本性格、才能、適職、恋愛・結婚運などを知ることができます。
          </p>
        </div>

        <div className="content-box">
          <h2>このアプリについて</h2>
          <p>
            あなたの生年月日と性別を入力すると、該当するタイプを判定し、
            詳しい診断結果と宿命図を表示します。
            個人情報は診断に必要な範囲でのみ使用し、保存や外部送信は行いません。
          </p>
        </div>

        <button className="btn btn-primary btn-large" onClick={onStart}>
          あなたのタイプを診断
        </button>
      </main>
    </div>
  )
}
