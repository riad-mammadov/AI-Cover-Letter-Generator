"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { signOut } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Paperclip,
  Plus,
  MessageSquare,
  FileText,
  User,
  Settings,
  Menu,
  X,
  Sparkles,
  Download,
  Copy,
  LogOut,
  MoreHorizontal,
  Home,
} from "lucide-react";
import Link from "next/link";

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Mock data for now
  const [messages] = useState([
    {
      id: 1,
      type: "assistant",
      content: `Hi! I'm ready to help you create the perfect cover letter. Upload your resume and share the job description you're applying for, and I'll craft a personalized cover letter that highlights your best qualities.`,
    },
  ]);

  const [chatHistory] = useState([
    {
      id: 1,
      title: "Software Engineer at Google",
      date: "Today",
      preview: "Dear Hiring Manager, I am writing to express...",
    },
    {
      id: 2,
      title: "Product Manager at Meta",
      date: "Yesterday",
      preview: "I am excited to apply for the Product Manager...",
    },
    {
      id: 3,
      title: "UX Designer at Apple",
      date: "2 days ago",
      preview: "As a passionate UX designer with 5 years...",
    },
    {
      id: 4,
      title: "Data Scientist at Netflix",
      date: "1 week ago",
      preview: "Dear Netflix Team, I am thrilled to apply...",
    },
  ]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedFile) return;
    setIsLoading(true);
    console.log("Sending message:", inputValue);
    console.log("With file:", selectedFile);
    setInputValue("");
    setSelectedFile(null);
    setIsLoading(false);
  };

  const handleNewChat = async () => {
    console.log("Creating new chat");
  };

  const handleChatSelect = async (chatId) => {
    console.log("Loading chat:", chatId);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const formData = new FormData();
    formData.append("uploaded_file", file);

    try {
      const data = await fetch("http://127.0.0.1:8000/file/upload", {
        method: "POST",
        body: formData,
      });

      if (!data.ok) {
        throw new Error("Failed to upload file");
      }

      const response = await data.json();
      console.log("File uploaded successfully:", response);

      // You can now setInput(data.text) or process it with LLM
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-80 backdrop-blur-xl bg-slate-900/80 border-r border-slate-700/50 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                CoverMe
              </span>
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

          {/* New Chat Button */}
          <div className="p-6">
            <Button
              variant="ghost"
              onClick={handleNewChat}
              className="w-full justify-center gap-3 bg-gray-700 text-slate-200 hover:bg-gray-600 hover:text-white transition-all duration-200 cursor-pointer font-medium py-3 rounded-xl"
            >
              <Plus className="w-5 h-5" />
              New Cover Letter
            </Button>
          </div>

          {/* Chat history */}
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Recent Chats
              </h3>
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  variant="ghost"
                  onClick={() => handleChatSelect(chat.id)}
                  className="w-full justify-start h-auto p-4 text-left hover:bg-slate-800/50 group rounded-xl transition-all duration-200 border border-transparent hover:border-slate-700/50 hover:shadow-lg"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <MessageSquare className="w-4 h-4 text-violet-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-white truncate">
                          {chat.title}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white hover:bg-slate-700/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Chat options for:", chat.id);
                        }}
                      >
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-slate-400 truncate mb-2 leading-relaxed">
                      {chat.preview}
                    </p>
                    <span className="text-xs text-slate-500 font-medium">
                      {chat.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* User profile on sidebar */}
          <div className="p-6 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/30 to-gray-800/30">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                {/* <p className="text-sm font-semibold text-white truncate">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {session?.user?.email}
                </p> */}
              </div>
              <div className="flex gap-1">
                <Link href="/">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-9 h-9 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg"
                  >
                    <Home className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="backdrop-blur-xl bg-slate-900/50 border-b border-slate-700/50 px-6 py-4 shadow-lg">
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
            <div className="text-sm text-slate-300 font-medium">
              {/* Welcome back, {session?.user?.name?.split(" ")[0]}! */}
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "assistant" && (
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-purple-500/25">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] ${
                    message.type === "user" ? "order-first" : ""
                  }`}
                >
                  <div
                    className={`rounded-2xl px-6 py-4 shadow-lg ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white ml-auto shadow-purple-500/25"
                        : "bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-100 shadow-slate-900/25"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    {message.type === "assistant" && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/30">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 text-xs hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-lg"
                        >
                          <Copy className="w-3 h-3 mr-2" />
                          Copy
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                {message.type === "user" && (
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    {/* {session?.user?.image ? (
                      <img
                        src={session.user.image || "/placeholder.svg"}
                        alt={session.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )} */}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-purple-500/25">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-6 py-4 shadow-lg shadow-slate-900/25">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-xl p-6">
          <div className="max-w-4xl mx-auto">
            {/* File Upload Indicator */}
            {selectedFile && (
              <div className="mb-4 p-4 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-violet-400" />
                    <span className="text-sm text-violet-300 font-medium">
                      {selectedFile.name}
                    </span>
                    <span className="text-xs text-violet-400 bg-violet-500/20 px-2 py-1 rounded-full">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                    className="h-8 w-8 p-0 text-violet-400 hover:text-violet-300 hover:bg-violet-500/20 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
            <div className="flex items-end gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 shadow-lg">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFileUpload}
                className="flex-shrink-0 w-10 h-10 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe the job you're applying for, or upload your resume and job description..."
                className="flex-1 min-h-[24px] max-h-32 resize-none border-none bg-transparent focus:ring-0 focus-visible:ring-0 text-sm placeholder:text-slate-500 text-slate-100 leading-relaxed"
                rows={1}
              />
              <Button
                onClick={handleSendMessage}
                disabled={(!inputValue.trim() && !selectedFile) || isLoading}
                className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200 hover:shadow-purple-500/40 hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 text-center mt-3 font-medium">
              Supports PDF files
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
