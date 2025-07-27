"use client";

import { useRef, useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, User, Sparkles, FileText, Zap } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Header from "@/components/Header";

export default function CoverLetterGenerator() {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const { data: session } = useSession();
  const handleAttachClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      console.log("File attached:", file.name);
      // TBC
    }
  }, []);

  const handleGenerateClick = useCallback(() => {
    const jobDescription = document.getElementById("job-description")?.value;
    console.log(
      "Generating cover letter with job description:",
      jobDescription
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-gray-100 relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center bg-transparent justify-center w-full max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Powered by GPT-4</span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Perfect Cover
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Letters, Instantly
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Transform your resume and any job description into a compelling,
            personalized cover letter in seconds.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-400">
              Generate professional cover letters in under 30 seconds.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
            <div className="w-16 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-400">
              Let our powerful AI match your skills effortlessly, guided by an
              optimised prompt so you can focus on what truly matters.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Personalized</h3>
            <p className="text-sm text-gray-400">
              Each letter is uniquely crafted for the specific role, ensuring
              the best possible cover letters.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
