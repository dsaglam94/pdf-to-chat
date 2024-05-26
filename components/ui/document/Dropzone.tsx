'use client';
import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useDropzone } from 'react-dropzone';
import { useToast } from '@/components/ui/use-toast';

export default function Dropzone() {
  const [uploading, setUploading] = React.useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', acceptedFiles[0], acceptedFiles[0].name);

      try {
        const res = await fetch('/api/document', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          toast({
            description: data.message,
            variant: 'default',
          });

          router.push(`/document/${data.documentId}`);
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          toast({
            description: error.message,
            variant: 'destructive',
          });
        }
        setUploading(false);
      } finally {
        setUploading(false);
      }
    },
    [router, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'aplication/pdf': ['.pdf'],
    },
    onDrop,
  });

  if (uploading) {
    return (
      <div className="max-w-2xl h-[300px] border-[2px] border-solid border-gray-300 rounded-md p-10 flex items-center justify-center">
        <p>Uploading ...</p>
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl h-[300px] border-[2px] border-solid border-gray-300 rounded-md p-10 flex items-center justify-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            width={70}
            height={70}
            src="/upload-icon.svg"
            alt="upload icon"
          />
          <p>Drop your PDF here ...</p>
        </div>
      ) : (
        <p className="text-center">
          Drag and drop some files here, or click to select files
        </p>
      )}
    </div>
  );
}