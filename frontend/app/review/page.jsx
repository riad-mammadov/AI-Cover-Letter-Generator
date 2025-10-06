"use client";

import { useRef, useCallback, useState } from "react";
import { Sparkles, FileCheck, Upload, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";

export default function CVReviewPage() {
  const [fileName, setFileName] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const router = useRouter();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file);
    setModalOpen(true);
  };

  const handleCancel = () => {
    fileInputRef.current.value = "";
    setFileName(null);
  };

  const handleConfirm = async () => {
    if (!fileName) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("uploaded_file", fileName);

    try {
      const data = await fetch(
        // "https://ai-cover-letter-generator-w1dv.onrender.com/file/upload",
        "http://localhost:8000/file/upload_review",
        {
          method: "POST",
          body: formData,
        }
      );

      const response = await data.json();
      console.log(response.text);
    } catch (error) {
      console.log(error);
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
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="bg-neutral-900 border-neutral-700"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              File Uploaded Successfully
            </AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              Please confirm if{" "}
              <span className="font-bold text-neutral-300">
                {fileName?.name.replace(".pdf", "")}
              </span>{" "}
              is the file that you would like to review
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-3">
            <AlertDialogCancel
              onClick={handleCancel}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 hover:cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-neutral-700 text-white hover:bg-neutral-600 hover:cursor-pointer"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
