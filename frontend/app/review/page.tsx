"use client";

import React, { useRef, useCallback, useState } from "react";
import {
  Sparkles,
  FileCheck,
  Upload,
  CheckCircle,
  Copy,
  CopyCheck,
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function CVReviewPage() {
  interface APIResponse {
    text: string;
  }
  const [fileName, setFileName] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const copyToClipboard = (text: string) => {
    setCopied(true);
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy text:", err);
    });
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file);
    setModalOpen(true);
  };

  const handleCancel = () => {
    fileInputRef.current.value = "";
    setFileName(null);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleConfirm = async () => {
    if (!fileName) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("uploaded_file", fileName);

    try {
      const data = await fetch(
        "https://ai-cover-letter-generator-w1dv.onrender.com/file/upload_review",
        {
          method: "POST",
          body: formData,
        }
      );
      const response: APIResponse = await data.json();
      setResponse(response.text);
      setLoading(false);
      setModalOpen((prev) => !prev);
      setSecondModalOpen((prev) => !prev);
      fileInputRef.current.value = "";
      setFileName(null);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2250);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-gray-100 relative overflow-hidden">
      <Header />
      {/* Hero Section */}
      <main className="flex flex-col items-center bg-transparent justify-center w-full max-w-4xl mx-auto px-4 sm:px-6 relative py-6 z-10 ">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Professional CV
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Review & Analysis
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Upload your CV and get instant AI-powered feedback to improve your
            resume and stand out.
          </p>
          {response && (
            <div className="flex flex-row items-center justify-center space-x-2">
              <Button
                className="mt-4 bg-gray-700 text-slate-300 hover:bg-gray-600 hover:text-white font-sans font-semibold  transition-all duration-200 cursor-pointer"
                variant="secondary"
                size="default"
                onClick={() => setSecondModalOpen(true)}
              >
                View Previous Results
              </Button>
              <Button
                className="mt-4 bg-gray-700 text-slate-300 hover:bg-gray-600 hover:text-white font-sans font-semibold  transition-all duration-200 cursor-pointer"
                variant="secondary"
                size="icon"
                onClick={() => copyToClipboard(response)}
              >
                {copied ? <CopyCheck /> : <Copy />}
              </Button>
            </div>
          )}
        </div>

        {/* Upload Section */}
        <div className="w-full max-w-2xl mb-8 sm:mb-12">
          <div
            onClick={handleUploadClick}
            className={`
              bg-white/5 backdrop-blur-sm border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center 
              cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-purple-500/50
              "border-white/20"
              
              ${fileName ? "border-green-500/50 bg-green-500/5" : ""}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-4">
              {fileName ? (
                <>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                      File Uploaded
                    </h3>
                    <span className="text-sm text-violet-300 font-medium truncate">
                      {fileName.name}
                    </span>
                    <span className="text-xs text-violet-400 bg-violet-500/20 px-2 py-1 rounded-full flex-shrink-0">
                      {(fileName.size / 1024).toFixed(1)} KB
                    </span>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                      Click to upload a different file
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                      Upload Your CV
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      Drag and drop your file here, or click to browse
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                      Supports PDF
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
        <AlertDialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="bg-neutral-900 border-neutral-700"
        >
          <AlertDialogHeader className="">
            <AlertDialogTitle className="text-white">
              {error
                ? "File Upload Unsuccessful"
                : "File Uploaded Successfully"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              {error ? (
                "An error occurred. For more information, check console logs."
              ) : (
                <>
                  Ready to start a review on{" "}
                  <span className="font-semibold text-neutral-300">
                    {fileName?.name.replace(".pdf", "") || "this file"}
                  </span>
                  ? Continue to proceed, or cancel and pick another file.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-3">
            {!error && (
              <>
                <AlertDialogCancel
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300 border-none hover:cursor-pointer"
                >
                  Cancel
                </AlertDialogCancel>

                <Button
                  size="default"
                  variant="default"
                  onClick={handleConfirm}
                  className="bg-stone-600 text-gray-200 hover:bg-stone-500 hover:cursor-pointer"
                >
                  {!loading ? "Continue" : <Spinner className="" />}
                </Button>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={secondModalOpen} onOpenChange={setSecondModalOpen}>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="bg-neutral-900 border-neutral-700 max-w-3xl"
        >
          <DialogHeader className="">
            <DialogTitle className="text-white text-2xl font-semibold">
              Your CV Review
            </DialogTitle>
            <DialogDescription className="" asChild>
              <div className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line max-h-[70vh] overflow-y-auto p-2 text-left">
                {response}
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end mt-4">
            <Button
              variant="default"
              size="default"
              onClick={() => setSecondModalOpen(false)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 border-none cursor-pointer"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
