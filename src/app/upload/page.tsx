"use client";

import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { UploadButton } from "@/utils/uploadthing";
import { revalidateRoot } from "@/revalidateRoot";

export default function UploadPage() {
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

      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={() => revalidateRoot()}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
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
