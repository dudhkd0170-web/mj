"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [showPastelGradient, setShowPastelGradient] = useState(false);

  useEffect(() => {
    // 15% probability to trigger the pastel ink bleed on load
    const randomChance = Math.random() < 0.15;
    if (randomChance) {
      setShowPastelGradient(true);
    }
  }, []);

  const handleDoubleClick = () => {
    setShowPastelGradient((prev) => !prev);
  };

  return (
    <div 
      className="flex flex-col min-h-screen hanji-bg transition-colors duration-300 select-none"
      onDoubleClick={handleDoubleClick}
      title="화면을 더블 클릭하면 은은한 한지 물방울 파스텔 그라데이션을 켜고 끌 수 있습니다."
    >
      
      {/* Background ink bleed container */}
      {showPastelGradient && (
        <div className="ink-bleed-container">
          <svg className="absolute w-0 h-0" style={{ pointerEvents: 'none' }}>
            <defs>
              <filter id="hanji-bleed">
                <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* Pastel ink bleeding blobs */}
          <div 
            className="ink-blob bg-rose-200/35 dark:bg-rose-950/20"
            style={{
              width: "600px",
              height: "600px",
              left: "10%",
              top: "15%",
              animationDelay: "0s",
              "--tx": "60px",
              "--ty": "-40px",
            } as React.CSSProperties}
          />
          <div 
            className="ink-blob bg-sky-200/35 dark:bg-sky-950/20"
            style={{
              width: "650px",
              height: "650px",
              right: "15%",
              top: "10%",
              animationDelay: "1.2s",
              "--tx": "-50px",
              "--ty": "50px",
            } as React.CSSProperties}
          />
          <div 
            className="ink-blob bg-purple-200/30 dark:bg-purple-950/15"
            style={{
              width: "550px",
              height: "550px",
              left: "35%",
              bottom: "10%",
              animationDelay: "0.6s",
              "--tx": "30px",
              "--ty": "-60px",
            } as React.CSSProperties}
          />
          <div 
            className="ink-blob bg-amber-100/40 dark:bg-amber-950/20"
            style={{
              width: "500px",
              height: "500px",
              right: "25%",
              bottom: "15%",
              animationDelay: "1.8s",
              "--tx": "-40px",
              "--ty": "-30px",
            } as React.CSSProperties}
          />
        </div>
      )}

      {/* Header */}
      <header className="relative z-50 w-full backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border-b border-slate-200/40 dark:border-slate-800/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📐</span>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
              미정쌤의 수학교실
            </span>
          </div>
          <nav className="flex items-center space-x-4">
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 rounded-full">
              수학 놀이터 🎮
            </span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        
        {/* Intro Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-100/50 dark:border-indigo-900/50 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              3D 기하학 탐구 & AI 학습 챗봇
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            반가워요!{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              미정쌤의 수학교실
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-650 dark:text-slate-350 leading-relaxed mb-12">
            3D 공간에서 평면도형을 돌리며 입체도형의 부피와 모양을 입체적으로 관찰하고, 
            공부하면서 막히거나 궁금한 점은 인공지능 에듀봇에게 물어보며 재미있게 배워봅시다!
          </p>

          {/* Program buttons shown directly on main screen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto w-full px-4">
            <Link 
              href="/explorer"
              className="flex flex-col items-center justify-center p-6 bg-white/70 hover:bg-white dark:bg-slate-900/70 dark:hover:bg-slate-900 border border-slate-200/60 dark:border-slate-800/65 rounded-3xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                📐
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                3D 회전체 탐구실
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                도형의 단면을 그리고 돌려보며 회전체를 직접 관찰해 보세요.
              </p>
              <span className="mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                입장하기 ➔
              </span>
            </Link>

            <Link 
              href="/chatbot"
              className="flex flex-col items-center justify-center p-6 bg-white/70 hover:bg-white dark:bg-slate-900/70 dark:hover:bg-slate-900 border border-slate-200/60 dark:border-slate-800/65 rounded-3xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                🤖
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                에듀 챗봇 질문하기
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                공부하다가 모르는 수학 개념이나 공식을 질문해 보세요.
              </p>
              <span className="mt-4 text-sm font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                질문하기 ➔
              </span>
            </Link>
          </div>
        </section>

      </main>

      {/* Control droppers for testing the Hanji pastel effect */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <button
          onClick={handleDoubleClick}
          className={`p-3 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ${
            showPastelGradient 
              ? "bg-gradient-to-tr from-pink-400 to-indigo-400 text-white border-transparent"
              : "bg-white/80 dark:bg-slate-850 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800"
          }`}
          title="물방울 그라데이션 토글 (더블 클릭으로도 토글 가능)"
        >
          <span className="text-xl">💧</span>
        </button>
        <span className="text-[10px] text-slate-400 bg-white/70 dark:bg-slate-900/70 px-2 py-0.5 rounded-full border border-slate-100 dark:border-slate-800 pointer-events-none select-none">
          {showPastelGradient ? "그라데이션 ON" : "더블클릭 시 그라데이션 ON"}
        </span>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-slate-100/30 dark:bg-slate-950/30 border-t border-slate-200/40 dark:border-slate-800/40 py-8 transition-colors duration-300 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="mb-2">© 2026 미정쌤의 수학교실. All rights reserved.</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Designed for Interactive Student Exploration. Powered by Next.js & Three.js.
          </p>
        </div>
      </footer>

    </div>
  );
}
