"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="relative w-full max-w-6xl mx-auto flex items-center sm:flex-col sm:flex-row space-y-4 justify-center sm:justify-between py-6 px-4 sm:px-6 z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              CoverMe
            </h1>
            <p className="text-xs text-gray-500">AI Powered</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/generate">
            <Button
              variant="secondary"
              className="hover:cursor-pointer bg-gray-700 text-slate-300 hover:bg-gray-600 hover:text-white font-sans font-semibold backdrop-blur-sm transition-all duration-200
"
            >
              <span className="">Cover Letter</span>
            </Button>
          </Link>
          <Link href="/generate">
            <Button
              variant="secondary"
              className="hover:cursor-pointer bg-gray-700 text-slate-300 hover:bg-gray-600 hover:text-white font-sans font-semibold backdrop-blur-sm transition-all duration-200
"
            >
              <span className="">CV Review</span>
            </Button>
          </Link>
        </div>
      </header>
    </>
  );
}
