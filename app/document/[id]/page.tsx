'use server';

import prisma from '@/utils/prisma';
import DocumentClient from './document-client';

export default async function page({ params }: { params: { id: string } }) {
  const currentDocument = await prisma.document.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!currentDocument) {
    return <div>There is no document associated with this ID.</div>;
  }

  return (
    <div>
      <DocumentClient currentDocument={currentDocument} />
    </div>
  );
}
