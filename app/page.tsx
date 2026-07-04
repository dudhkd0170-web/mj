"use client";

import React from "react";
import Link from "next/link";

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
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        
        {/* Intro Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              3D 기하학 체험관
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

          <Link 
            href="/explorer"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transform hover:-translate-y-1 transition-all duration-300"
          >
            3D 회전체 탐구실 입장하기 🚀
          </Link>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-100/50 dark:bg-slate-950/50 border-t border-slate-200/50 dark:border-slate-800/50 py-8 transition-colors duration-300 mt-auto">
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
