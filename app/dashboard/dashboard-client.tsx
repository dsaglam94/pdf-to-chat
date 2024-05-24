'use client';

import Dropzone from '@/components/ui/Dropzone';
import ReachedUploadLimit from '@/components/ui/ReachedUploadLimit';

import { Document } from '@prisma/client';

export default function Dashboard({ docList }: { docList: Document[] }) {
  let dropzoneArea = null;

  console.log(docList);

  if (docList.length > 3) {
    dropzoneArea = <ReachedUploadLimit docList={docList} />;
  } else {
    dropzoneArea = <Dropzone />;
  }

  return <>{dropzoneArea}</>;
}
