"use client";

import React from "react";
import Link from "next/link";

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CollectionModal({ isOpen, onClose }: CollectionModalProps) {
  if (!isOpen) return null;

  const tools = [
    {
      id: "explorer",
      title: "📐 3D 회전체 탐구실",
      description: "평면도형을 회전축을 기준으로 회전하여 생기는 입체도형을 3D 공간에서 직접 그리며 탐구하고 체험해보세요.",
      link: "/explorer",
      badge: "수학 기하학",
      color: "from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border-blue-200/50 dark:border-blue-800/30",
      iconBg: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    },
    {
      id: "chatbot",
      title: "🤖 에듀 챗봇 (AI Study Partner)",
      description: "공부하면서 생기는 궁금증을 질문해보세요. 친절한 AI 선생님이 단계적으로 친절하게 설명해 줍니다.",
      link: "/chatbot",
      badge: "AI 학습 비서",
      color: "from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border-purple-200/50 dark:border-purple-800/30",
      iconBg: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl rounded-3xl overflow-hidden transform transition-all duration-300 scale-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              📂 에듀 툴킷 모음집
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              원하는 에듀 툴을 골라 흥미로운 학습을 시작해 보세요.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors duration-200 font-bold"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* Tools list */}
        <div className="p-6 overflow-y-auto space-y-4 flex-grow">
          {tools.map((tool) => (
            <Link 
              key={tool.id} 
              href={tool.link}
              onClick={onClose}
              className={`block p-5 border rounded-2xl bg-gradient-to-r ${tool.color} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${tool.iconBg}`}>
                    {tool.badge}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {tool.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/80 dark:bg-slate-800/80 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold hover:scale-110 transition-transform">
                  ➔
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
          학습에 필요한 다양한 웹 도구들이 모음집에 계속 추가됩니다.
        </div>
      </div>
    </div>
  );
}
