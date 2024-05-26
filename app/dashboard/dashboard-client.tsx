'use client';
import { Document } from '@prisma/client';

import Dropzone from '@/components/ui/document/Dropzone';
import Documents from '@/components/ui/document/Documents';

export default function Dashboard({ docList }: { docList: Document[] }) {
  return (
    <div className="max-w-2xl flex flex-col items-center justify-center gap-10 mx-auto mt-10">
      <h1 className="text-2xl md:text-4xl font-bold text-center leading-[1.1] tracking-tighter">
        Chat with your PDFs
      </h1>

      <Documents docList={docList} />

      {docList.length > 2 ? (
        <p className="text-sm text-gray-700 text-center">
          You have reached your upload limit. Please delete some documents to
          upload more.
        </p>
      ) : (
        <>
          <h2 className="font-bold text-2xl leading-[1.1] tracking-tighter">
            Or upload a new PDF
          </h2>

          <div className="max-w-md w-full">
            <Dropzone />
          </div>
        </>
      )}
    </div>
  );
}
