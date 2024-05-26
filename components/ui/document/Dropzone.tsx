'use client';
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useDropzone } from 'react-dropzone';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

export default function Dropzone() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const router = useRouter();
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setUploading(true);
      setProgress(0);

      if (!acceptedFiles.length) {
        toast({
          description: 'Invalid file type. Please upload a PDF file',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }

      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('file', file, file.name);

      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round(
            (event.loaded / event.total) * 100
          );
          setProgress(percentCompleted);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          if (data.success) {
            toast({
              description: data.message,
              variant: 'default',
            });
            router.push(`/document/${data.documentId}`);
          }
        } else {
          const error = JSON.parse(xhr.responseText);
          toast({
            description: error.message || 'Error uploading file',
            variant: 'destructive',
          });
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        toast({
          description: 'Error uploading file',
          variant: 'destructive',
        });
      };

      xhr.open('POST', '/api/document');
      xhr.send(formData);
    },
    [router, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
    },
    onDrop,
  });

  if (uploading) {
    return (
      <div className="w-full h-[200px] border-[2px] border-dashed border-gray-300 rounded-md p-10 flex items-center justify-center">
        <div className="text-center w-full flex flex-col items-center gap-3">
          <p className="text-sm text-gray-700">Uploading... {progress}%</p>
          <Progress value={progress} className="w-[80%]" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-[200px] border-[2px] border-dashed border-gray-300 rounded-md p-10 flex items-center justify-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            width={40}
            height={40}
            src="/upload-icon.svg"
            alt="upload icon"
          />
          <p className="text-xs font-medium text-center w-[70%] text-gray-600">
            Drop your PDF here ...
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            width={40}
            height={40}
            src="/upload-icon.svg"
            alt="upload icon"
          />
          <p className="text-xs font-medium text-center w-[70%] text-gray-600">
            Drag and drop your PDF files here, or click to select files
          </p>
        </div>
      )}
    </div>
  );
}
