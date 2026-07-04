"use client";

import React, { useState } from "react";

export default function Home() {
  const [showToast, setShowToast] = useState(false);

  const handleButtonClick = () => {
    setShowToast(true);
    // Hide toast after 4 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50/30 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      
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
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">
              소개
            </a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">
              가이드
            </a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">
              커뮤니티
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center">
        
        {/* Hero Section */}
        <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              선생님들을 위한 친절한 코딩 멘토링
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            나만의{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              교육용 웹앱
            </span>{" "}
            만들기
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
            코딩을 처음 접하는 선생님도, 아이디어를 직접 앱으로 완성할 수 있는 뼈대 코드입니다. 
            원하는 레이아웃을 바탕으로 교실에 필요한 퀴즈, 타이머, 협동 학습판 등 풍부한 상상력을 현실로 만들어보세요!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="placeholder-btn"
              onClick={handleButtonClick}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              새로운 기능 추가해보기 🚀
            </button>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-slate-200/50 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-2xl border border-slate-300/30 transition-all duration-300 hover:scale-105 text-center"
            >
              공식 문서 둘러보기
            </a>
          </div>
        </section>

        {/* Feature Templates Showroom (For Teachers' inspiration) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              앞으로 채워나갈 수 있는 아이디어 예시들 ✨
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              이 뼈대 코드 위에 아래와 같은 웹앱 모듈을 자유롭게 얹어 확장해보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 flex items-center justify-center text-xl font-bold mb-4">
                📝
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">교실 단어 퀴즈 앱</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                학생들이 화면에서 단어 맞추기 퀴즈를 풀고 즉시 점수를 채점받을 수 있는 인터랙티브 모듈입니다.
              </p>
            </div>
            
            {/* Box 2 */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl font-bold mb-4">
                ⏱️
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">모둠 타이머 & 룰렛</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                모둠별 토의 시간을 표시하는 타이머와 발표자를 공정하게 뽑아주는 재미있는 랜덤 룰렛 기능입니다.
              </p>
            </div>
            
            {/* Box 3 */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl font-bold mb-4">
                💬
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">실시간 협동 질문판</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                수업 중에 학생들이 실시간으로 익명 질문이나 의견을 보드에 띄워 다 함께 공유하는 공간입니다.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-100/50 dark:bg-slate-950/50 border-t border-slate-200/50 dark:border-slate-800/50 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="mb-2">© 2026 EduBuilder. All rights reserved.</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Designed with ❤️ for Teachers & Students to build awesome class apps.
          </p>
        </div>
      </footer>

      {/* Interactive Toast Notification (React State implementation) */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center p-4 w-full max-w-sm text-slate-800 bg-white/95 dark:bg-slate-800/95 dark:text-slate-100 rounded-2xl shadow-2xl border border-indigo-100 dark:border-indigo-950 backdrop-blur-lg transform animate-bounce transition-all">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg">
            🚀
          </div>
          <div className="ml-3 text-sm font-medium">
            <p className="font-bold text-indigo-600 dark:text-indigo-400">멘토 가이드 💡</p>
            <p className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">
              성공적으로 연결되었습니다! 이 버튼을 수정하려면 <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded text-pink-600 dark:text-pink-400 text-[11px]">app/page.tsx</code> 파일의 <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded text-pink-600 dark:text-pink-400 text-[11px]">handleButtonClick</code> 함수를 찾아 원하시는 액션을 입력하세요.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
