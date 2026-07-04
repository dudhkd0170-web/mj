"use client";

import React from "react";
import SolidExplorer from "@/components/SolidExplorer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50/20 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎓</span>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
              EduBuilder
            </span>
          </div>
          <nav className="flex items-center space-x-6">
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 rounded-full">
              수학 탐구실 📐
            </span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Intro Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              3D 기하학 체험관
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
            실시간{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              3D 회전체 탐구실
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            평면 도형을 회전축(빨간 점선)을 기준으로 회전시켰을 때 생기는 3D 회전체(원기둥, 원뿔, 구 등)를 탐구해봅시다. 
            단면을 직접 그리고 마우스로 회전해 보며 기하학적 원리를 손쉽게 체험해보세요!
          </p>
        </section>

        {/* Core Component Area */}
        <section className="mb-12">
          <SolidExplorer />
        </section>

        {/* Educational Mentor Guide Tips */}
        <section className="max-w-4xl mx-auto bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/40 rounded-3xl p-6 md:p-8">
          <h3 className="text-base font-bold text-indigo-950 dark:text-indigo-200 mb-3 flex items-center space-x-2">
            <span>💡</span>
            <span>코딩 멘토의 교육용 탐구 가이드</span>
          </h3>
          <ul className="space-y-3 text-xs md:text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">📌</span>
              <span><strong>직사각형 그리기 (원기둥)</strong>: 격자 스냅 모드에서 회전축과 평행한 수직선을 그린 뒤 닫아주면 원기둥이 탄생합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">📌</span>
              <span><strong>직각삼각형 그리기 (원뿔)</strong>: 축에서 출발하여 빗변을 그리고 다시 축으로 연결하면 깔끔한 원뿔이 렌더링됩니다.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">📌</span>
              <span><strong>반원 그리기 (구)</strong>: 자유 곡선 모드로 축의 한 점에서 출발해 둥근 반원을 그리고 반대편 축 끝점으로 돌아오면 완벽한 공 모양의 구가 나타납니다!</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">📌</span>
              <span><strong>축과 떨어뜨려 그리기 (도넛)</strong>: 회전축에서 오른쪽으로 간격을 살짝 띄운 채 사각형이나 원을 그리면 가운데가 뚫린 도넛(토러스) 모양이 생성됩니다.</span>
            </li>
          </ul>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-100/50 dark:bg-slate-950/50 border-t border-slate-200/50 dark:border-slate-800/50 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="mb-2">© 2026 EduBuilder. All rights reserved.</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Designed for Math Teachers and Interactive Student Exploration. Powered by Next.js & Three.js.
          </p>
        </div>
      </footer>

    </div>
  );
}
