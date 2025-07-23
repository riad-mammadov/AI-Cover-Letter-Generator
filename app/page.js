"use client";

import { useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, UploadCloud } from "lucide-react";

export default function CoverLetterGenerator() {
  const fileInputRef = useRef(null);

  const handleAttachClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File attached:", file.name);
      // TBC
    }
  }, []);

  const handleGenerateClick = useCallback(() => {
    const jobDescription = document.getElementById("job-description").value;
    console.log(
      "Generating cover letter with job description:",
      jobDescription
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100">
      {/* Header */}
      <header className="w-full max-w-3xl mx-auto text-center py-10 px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-slate-300 to-gray-100 bg-clip-text text-transparent">
          CoverMe
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-400">
          Your resume. Their job description. One perfect cover letter.
        </p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-6 pb-24">
        <div className="w-full bg-[#2B2D42] rounded-2xl shadow-lg p-8 text-center text-gray-100 border border-gray-700">
          <p className="text-2xl font-bold mb-3 tracking-tight">
            Let’s craft a cover letter that stands out.
          </p>
          <p className="text-base text-gray-400">
            Attach your resume and paste the job description below to get
            started.
          </p>
        </div>
      </main>

      {/* Input Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-4 sm:px-6 shadow-xl z-50">
        <div className="mx-auto w-full max-w-3xl flex items-center justify-center gap-2 bg-gray-800 border border-gray-700 rounded-3xl p-2">
          {/* File input for resume upload */}
          <Input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          {/* Attach button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAttachClick}
            className="w-10 h-10 text-gray-400 hover:text-white hover:cursor-pointer hover:bg-transparent transition-colors"
            aria-label="Attach Resume"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          {/* Job Description*/}
          <Textarea
            id="job-description"
            placeholder="Paste the full job description here..."
            rows={1}
            className="flex-1 resize-none border-none bg-transparent text-gray-50 placeholder-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-transparent focus:shadow-none text-base max-h-[150px] overflow-y-auto py-2"
          />
          {/* Generate Button */}
          <Button
            onClick={handleGenerateClick}
            variant="ghost"
            size="icon"
            className="w-10 h-10 hover:cursor-pointer text-gray-400 hover:bg-transparent hover:text-white rounded-full transition duration-200"
            aria-label="Generate Cover Letter"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
