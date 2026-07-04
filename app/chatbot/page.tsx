"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "안녕하세요! 에듀빌더의 AI 튜터 **에듀봇**입니다. 🤖\n수학, 과학 등 공부하다 궁금한 점이 생겼나요? 무엇이든 물어보세요! 친절하게 설명해 드릴게요. ✏️",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const queryText = textToSend || inputValue;
    if (!queryText.trim() || isLoading) return;

    setErrorMsg(null);
    if (!textToSend) {
      setInputValue("");
    }

    const newUserMessage: Message = { role: "user", content: queryText };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const apiMessages = updatedMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "서버 응답 오류가 발생했습니다.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "답변을 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const formatMessageContent = (text: string) => {
    return text.split("\n").map((line, lineIndex) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={lineIndex} className="block min-h-[1.2em]">
          {parts.map((part, partIndex) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={partIndex} className="font-extrabold text-indigo-700 dark:text-indigo-400">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  const quickSuggestions = [
    { label: "회전체란 무엇인가요? 📐", query: "회전체가 무엇인지 이해하기 쉽게 설명해 주세요!" },
    { label: "원기둥과 원뿔 차이 🍦", query: "원기둥과 원뿔은 어떻게 다르고, 부피 구하는 공식은 어떻게 되나요?" },
    { label: "공부 집중하는 방법 📚", query: "공부를 시작하려는데 집중이 잘 안 돼요. 집중력을 높이는 팁이 있나요?" },
    { label: "질문 만들어보기 🧠", query: "재미있는 수학 퀴즈 하나 내줄 수 있나요? 제가 맞춰볼게요!" },
  ];

  return (
    <div className="flex flex-col min-h-screen hanji-bg text-slate-800 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/40 dark:border-slate-800/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-xl hover:scale-105 transition-transform" title="홈으로">
              🏠
            </Link>
            <span className="text-slate-300">|</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <span className="text-lg font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight">
                에듀봇 AI 튜터
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => {
                if (window.confirm("대화 기록을 초기화하시겠습니까?")) {
                  setMessages([
                    {
                      role: "assistant",
                      content: "안녕하세요! 에듀빌더의 AI 튜터 **에듀봇**입니다. 🤖\n공부하다 궁금한 점이 생겼나요? 무엇이든 물어보세요! 친절하게 설명해 드릴게요. ✏️",
                    }
                  ]);
                  setErrorMsg(null);
                }
              }}
              className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-350 rounded-lg transition-colors border border-slate-200/40 dark:border-slate-800/40 font-semibold"
            >
              대화 초기화 🧹
            </button>
            <Link 
              href="/"
              className="text-xs px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow-sm transition-colors"
            >
              홈으로 가기
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-8 flex flex-col gap-6 h-[calc(100vh-4rem)]">
        
        {/* Intro Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            💡 똑똑한 학습 파트너, 에듀봇!
          </h2>
          <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed">
            원리부터 설명해 주는 친절한 선생님입니다. 수학 공식, 3D 회전체 관련 기하학 질문, 교과 내용, 공부 꿀팁 등을 편안하게 물어보세요!
          </p>
        </div>

        {/* Chat Window Panel */}
        <div className="flex-grow flex flex-col bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-xl overflow-hidden min-h-0">
          
          {/* Message Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm ${
                  msg.role === "user" 
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                    : "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                }`}>
                  {msg.role === "user" ? "🧑‍🎓" : "🤖"}
                </div>

                {/* Bubble */}
                <div className={`p-4 rounded-2xl leading-relaxed text-sm ${
                  msg.role === "user" 
                    ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/10"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-150 rounded-tl-none shadow-sm"
                }`}>
                  <div className="space-y-1 font-medium">
                    {formatMessageContent(msg.content)}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 max-w-[80%] mr-auto">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                  🤖
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none flex items-center space-x-1.5 shadow-sm">
                  <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200/50 dark:border-red-900/30 rounded-2xl text-sm text-red-600 dark:text-red-300 flex items-center gap-2">
                ⚠️ <span>{errorMsg}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions (Only show when not loading) */}
          {!isLoading && messages.length <= 2 && (
            <div className="px-6 py-2.5 flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/10">
              {quickSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion.query)}
                  className="text-xs px-3 py-1.5 bg-white dark:bg-slate-850 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-800 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/95 dark:bg-slate-900/95 flex items-center gap-3">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder={isLoading ? "답변을 기다리는 중..." : "질문을 입력하세요... (예: 구의 부피 공식은?)"}
              className="flex-grow px-4 py-3 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 transition-all disabled:opacity-60"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !inputValue.trim()}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/35 transform active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 disabled:shadow-none flex items-center justify-center"
            >
              전송 🚀
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
