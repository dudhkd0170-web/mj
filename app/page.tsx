"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CollectionModal from "../components/CollectionModal";

export default function Home() {
  const [showPastelGradient, setShowPastelGradient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <span className="text-2xl">🎓</span>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
              EduBuilder
            </span>
          </div>
          <nav className="flex items-center space-x-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-semibold px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900 rounded-full border border-indigo-150/50 transition-all duration-200 flex items-center gap-1.5 shadow-sm"
            >
              도구 모음집 📂
            </button>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 dark:bg-slate-850 dark:text-slate-300 rounded-full">
              수학 탐구실 📐
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
              3D 기하학 체험관 & AI 학습 지원
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            실시간{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              3D 회전체 탐구실
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
            평면 도형을 회전축을 기준으로 회전시켰을 때 생기는 3D 회전체(원기둥, 원뿔, 구 등)를 탐구해봅시다. 
            단면을 직접 그리고 마우스로 회전해 보며 기하학적 원리를 손쉽게 체험해보세요!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/explorer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              3D 회전체 탐구실 입장하기 🚀
            </Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 hover:text-slate-900 bg-white dark:bg-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
            >
              학습 도구 모음집 📂
            </button>
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
          <p className="mb-2">© 2026 EduBuilder. All rights reserved.</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Designed for Math Teachers and Interactive Student Exploration. Powered by Next.js & Three.js.
          </p>
        </div>
      </footer>

      {/* Collection Hub Modal */}
      <CollectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}
