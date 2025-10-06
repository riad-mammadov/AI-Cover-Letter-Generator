import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white">
      {/* Header with back button */}
      <Header />

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 md:mb-6">
              About CoverMe
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              An AI-powered (Google Gemini) cover letter generator designed to
              help job seekers create cover letters in seconds, without having
              to spend time writing them manually.
            </p>
          </div>

          <div className="grid gap-8 md:gap-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4 md:mb-6 text-blue-400">
                What CoverMe Does
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  CoverMe uses AI to generate cover letters that match your
                  experience with specific job requirements. Simply upload your
                  resume, paste the job description, and let our CoverMe handle
                  the rest.
                </p>
                <p>
                  The application analyses the job description to identify key
                  requirements and integrates your skills and experience into a
                  narrative that recruiters will love.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4 md:mb-6 text-purple-400">
                Portfolio Project
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  This application is part of my portfolio and demonstrates my
                  modern full stack development skills, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    React & Next.js – building a fast and dynamic frontend
                  </li>
                  <li>FastAPI – creating a robust and efficient backend API</li>
                  <li>
                    AI Integration - leveraging Google Gemini for content
                    generation
                  </li>
                  <li>
                    Tailwind - implementing responsive, mobile-first design
                  </li>
                  <li>Modern UI/UX – ensuring usability and simplicity</li>
                </ul>
                <p>
                  I chose to build this project because it addresses a real
                  problem job seekers (me included) face: writing and tailoring
                  multiple cover letters. By automating the process, it makes
                  applications faster, easier, and more effective.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4 md:mb-6 text-pink-400">
                Built With
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="font-semibold">Next.js</div>
                  <div className="text-sm text-gray-400">Framework</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="font-semibold">React</div>
                  <div className="text-sm text-gray-400">Frontend</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="font-semibold">FastAPI</div>
                  <div className="text-sm text-gray-400">Framework</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="font-semibold">Tailwind</div>
                  <div className="text-sm text-gray-400">Styling</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
