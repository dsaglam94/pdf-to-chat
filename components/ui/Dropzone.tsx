'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import { useDropzone } from 'react-dropzone';

export default function Dropzone() {
  const [uploading, setUploading] = React.useState(false);

  const router = useRouter();

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', acceptedFiles[0], acceptedFiles[0].name);

      try {
        const res = await fetch('/api/s3-upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          router.push(`/document/${data.documentId}`);
        }
      } catch (error) {
        // TODO: handle error better
        console.error(error);
        setUploading(false);
      } finally {
        setUploading(false);
      }
    },
    [router]
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
      <div className="max-w-2xl h-[300px] border-[2px] border-solid border-gray-300 rounded-xl p-10 flex items-center justify-center mx-auto my-10">
        <p>Uploading ...</p>
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl h-[300px] border-[2px] border-solid border-gray-300 rounded-xl p-10 flex items-center justify-center mx-auto my-10"
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
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
}
