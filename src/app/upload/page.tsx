"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Upload, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";

export default function UploadPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Bitte wähle eine Bilddatei aus");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would upload the file to your server or storage service here
    console.log("Datei wird hochgeladen:", selectedFile.name);

    setIsUploading(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900 mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-serif font-medium text-rose-700">
            Foto hochladen
          </h1>
        </div>
      </header>

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            {!preview ? (
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center ${
                  isDragging ? "border-rose-500 bg-rose-50" : "border-gray-300"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Ziehe dein Foto hierher oder klicke, um es auszuwählen
                  </p>
                  <label className="cursor-pointer">
                    <Button variant="outline" className="relative">
                      Foto auswählen
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Vorschau"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                    }}
                  >
                    Foto ändern
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="bg-rose-600 hover:bg-rose-700"
                  >
                    {isUploading ? (
                      <>Wird hochgeladen...</>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Foto hochladen
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <footer className="bg-white py-6 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Vielen Dank, dass du deine Erinnerungen mit uns teilst!
          </p>
        </div>
      </footer>
    </div>
  );
}
