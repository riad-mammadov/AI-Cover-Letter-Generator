"use client";

import { useRef, useCallback, useState } from "react";
import { Sparkles, FileText, Zap } from "lucide-react";
import Header from "@/components/Header";

export default function CoverLetterGenerator() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-gray-100 relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center bg-transparent justify-center w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10 py-2 sm:py-0">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-2 sm:px-4 sm:py-2 mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
            <span className="text-xs sm:text-sm text-purple-300">
              Powered by Google Gemini
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Perfect Cover
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Letters, Instantly
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Transform your resume and any job description into a compelling,
            personalised cover letter in seconds.
          </p>
        </div>

        {/* <div className="flex flex-col justify-center items-center w-full max-w-3xl mb-12">
          <Link href="/protected">
            <Button
              variant="secondary"
              className="bg-white/5 h-12 w-12hover:cursor-pointer border-white/10 hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-200"
            >
              Generate Cover Letter
            </Button>
          </Link>
        </div> */}

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl mb-8 sm:mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:bg-white/10 transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">
              Lightning Fast
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Generate cover letters instantly, saving you time and effort.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:bg-white/10 transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">
              AI-Powered
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Let us match your skills effortlessly, guided by an optimised
              prompt so you can focus on what truly matters.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:bg-white/10 transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">
              Personalised
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Each letter is uniquely crafted for the specific role, ensuring
              the best possible cover letters.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
