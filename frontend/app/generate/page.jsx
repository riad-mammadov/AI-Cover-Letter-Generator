"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Paperclip,
  FileText,
  User,
  Menu,
  X,
  Sparkles,
  Copy,
  Home,
  Info,
  HelpCircle,
  HeartPlus,
  ViewIcon,
} from "lucide-react";
import Link from "next/link";

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Mock data for now
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "model",
      content: `I'm ready to help you create the perfect cover letter! Upload your resume and share the job description you're applying for, and I'll craft a personalised cover letter that highlights your best qualities.`,
    },
  ]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const scrollAreaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy text:", err);
    });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedFile) return;

    let displayText = inputValue.trim();

    if (displayText.length > 500) {
      displayText = displayText.slice(0, 500) + "...";
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        type: "user",
        content: displayText,
      },
    ]);

    const formData = new FormData();
    formData.append("uploaded_file", selectedFile);
    formData.append("description", inputValue.trim());

    const currValue = inputValue.trim();
    setIsLoading(true);
    setInputValue("");

    try {
      const data = await fetch("http://127.0.0.1:8000/file/upload", {
        method: "POST",
        body: formData,
      });

      if (!data.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            type: "model",
            content:
              "An error occurred while generating the cover letter. Please try again.",
          },
        ]);
        setInputValue(currValue);
        setIsLoading(false);
        return;
      }

      const response = await data.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          type: response.role,
          content:
            response.text ||
            "An error occurred while generating the cover letter. Please try again.",
        },
      ]);
      console.log("File uploaded successfully:", response);
    } catch (err) {
      console.error("Error uploading file:", err);
    }

    setIsLoading(false);
  };

  const handleClearChat = async () => {
    setMessages([
      {
        id: 1,
        type: "model",
        content: `I'm ready to help you create the perfect cover letter! Upload your resume and share the job description you're applying for, and I'll craft a personalised cover letter that highlights your best qualities.`,
      },
    ]);
    setInputValue("");
    setSelectedFile(null);
    setSidebarOpen(false);
    scrollToBottom();
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
      <div
        className={`${
          sidebarOpen ? "-translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-80 sm:w-72 md:w-80 backdrop-blur-xl bg-slate-900/80 border-r border-slate-700/50 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-gray-800/50">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                  CoverMe
                </span>
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-4 sm:p-6">
            <Button
              variant="ghost"
              onClick={handleClearChat}
              className="w-full justify-center gap-3 bg-gray-700 text-slate-200 hover:bg-gray-600 hover:text-white transition-all duration-200 cursor-pointer font-serif font-medium py-3 rounded-xl text-sm sm:text-base"
            >
              Clear Chat
            </Button>
          </div>

          <div className="flex-1 px-4 sm:px-6 overflow-y-auto">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Navigation
              </h3>

              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full hover:cursor-pointer justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl p-3 sm:p-4 transition-all duration-200"
                >
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                  <span className="text-sm font-medium">Home</span>
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  variant="ghost"
                  className="w-full hover:cursor-pointer justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl p-3 sm:p-4 transition-all duration-200"
                  onClick={() => console.log("About clicked")}
                >
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                  <span className="text-sm font-medium">About</span>
                </Button>
              </Link>
              <Link href="https://riadmammadov.co.uk" target="_blank">
                <Button
                  variant="ghost"
                  className="w-full hover:cursor-pointer justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl p-3 sm:p-4 transition-all duration-200"
                  onClick={() => console.log("Help clicked")}
                >
                  <ViewIcon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                  <span className="text-sm font-medium">
                    Visit My Portfolio
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Project Info at Bottom */}
          <div className="p-4 sm:p-6 bg-slate-800/30 border-t border-slate-700/30">
            <h4 className="text-sm font-semibold text-white mb-2">
              Disclaimer
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              This tool is here to help, but your final cover letter should
              reflect your own voice and experiences. Always review and
              customise the generated content to ensure it is accurate.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="backdrop-blur-xl bg-slate-900/50 border-b border-slate-700/50 px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between lg:justify-start">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-700/50"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
            <div className="text-xs sm:text-xs text-slate-400 text-right sm:text-left">
              <span className="hidden sm:inline">Powered by </span>
              <span className="hidden sm:inline text-slate-200 font-medium">
                Next.js
              </span>
              <span className="hidden xs:inline">, </span>
              <span className="hidden xs:inline text-slate-200 font-medium">
                Tailwind
              </span>
              <span className="hidden sm:inline">, </span>
              <span className="hidden sm:inline text-slate-200 font-medium">
                FastAPI
              </span>
              <span className="hidden sm:inline"> & </span>
              <span className="hidden sm:inline text-slate-200 font-medium">
                Google Gemini
              </span>
              <span className="hidden sm:inline"> · Crafted by </span>
              <span className="hidden sm:inline text-slate-200 font-semibold">
                Riad
              </span>
            </div>
          </div>
        </header>
        {/* Messages Area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea ref={scrollAreaRef} className="h-full">
            <div className="p-3 sm:p-6">
              <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 sm:gap-4 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.type === "model" && (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-purple-500/25">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[90%] sm:max-w-[85%] ${
                        message.type === "user" ? "order-first" : ""
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-lg ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white ml-auto shadow-purple-500/25"
                            : "bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-100 shadow-slate-900/25"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                        {message.type === "model" && (
                          <div className="flex items-center gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700/30">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(message.content)}
                              className="h-7 sm:h-8 px-2 sm:px-3 text-xs hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-lg"
                            >
                              <Copy className="w-3 h-3 mr-1 sm:mr-2" />
                              Copy
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    {message.type === "user" && (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 sm:gap-4 justify-start">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-purple-500/25">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-lg shadow-slate-900/25">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-slate-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-xl p-3 sm:p-6 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            {/* File Upload Indicator */}
            {selectedFile && (
              <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 flex-shrink-0" />
                    <span className="text-sm text-violet-300 font-medium truncate">
                      {selectedFile.name}
                    </span>
                    <span className="text-xs text-violet-400 bg-violet-500/20 px-2 py-1 rounded-full flex-shrink-0">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-violet-400 hover:text-violet-300 hover:bg-violet-500/20 rounded-lg flex-shrink-0 ml-2"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            )}
            <div className="flex items-end gap-2 sm:gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-3 sm:p-4 shadow-lg">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe the job you're applying for, or paste in the job description..."
                className="resize-none border-none bg-transparent focus:ring-0 focus-visible:ring-0 text-sm placeholder:text-slate-500 text-slate-100 leading-relaxed min-h-[80px] sm:min-h-[96px]"
                rows={3}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
              />
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFileUpload}
                  className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
                >
                  <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim() || !selectedFile}
                  className="disabled:cursor-not-allowed flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r cursor-pointer from-violet-600 to-purple-600 rounded-xl shadow-md shadow-purple-500/25 transition-all duration-200 hover:shadow-purple-500/40 hover:scale-105"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center mt-2 sm:mt-3 font-medium">
              Supports PDF files
            </p>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
