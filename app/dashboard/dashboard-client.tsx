'use client';
import { Document } from '@prisma/client';

import Dropzone from '@/components/ui/document/Dropzone';
import ReachedUploadLimit from '@/components/ui/document/ReachedUploadLimit';
import Documents from '@/components/ui/document/Documents';

export default function Dashboard({ docList }: { docList: Document[] }) {
  let dropzoneArea = null;

  if (docList.length > 2) {
    dropzoneArea = <ReachedUploadLimit />;
  } else {
    dropzoneArea = <Dropzone />;
  }

  return (
    <div className="container flex flex-col md:flex-row gap-5 mx-auto my-10 ">
      <div className="flex-1">{dropzoneArea}</div>
      <Documents docList={docList} />
    </div>
  );
}
