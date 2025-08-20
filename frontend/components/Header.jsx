"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-4 sm:px-6 z-10">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            CoverMe
          </h1>
          <p className="hidden xs:block text-xs text-gray-500">AI Powered</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/generate">
          <Button
            variant="secondary"
            className="hover:cursor-pointer bg-gray-700 text-slate-200 hover:bg-gray-600 hover:text-white font-serif backdrop-blur-sm transition-all duration-200
"
          >
            <span className="">Get Started</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
