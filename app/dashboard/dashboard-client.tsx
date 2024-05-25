'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Document } from '@prisma/client';

import Dropzone from '@/components/ui/Dropzone';
import ReachedUploadLimit from '@/components/ui/ReachedUploadLimit';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MessageCircleMoreIcon, Trash2Icon } from 'lucide-react';

export default function Dashboard({ docList }: { docList: Document[] }) {
  const router = useRouter();
  let dropzoneArea = null;

  async function deleteDocument(id: string) {
    try {
      const res = await fetch(`/api/document/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        console.log(data.message);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (docList.length > 3) {
    dropzoneArea = <ReachedUploadLimit docList={docList} />;
  } else {
    dropzoneArea = <Dropzone />;
  }

  return (
    <div className="container flex flex-col-reverse md:flex-row gap-5 mx-auto my-10 ">
      <div className="flex-1">{dropzoneArea}</div>
      <div className="flex-1">
        <div className="flex items-center gap-1 mb-3">
          <Image
            width={25}
            height={25}
            src="/uploaded-doc-icon.svg"
            alt="uploaded document icon"
          />
          <h2 className="font-semibold">Uploaded Documents</h2>
        </div>
        <div className="flex flex-col gap-3 pl-5">
          {docList.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="font-semibold">-</span>
                <p className="text-sm text-gray-700">{doc.fileName}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" size="sm" className="text-sm">
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => router.push(`/document/${doc.id}`)}
                  >
                    <MessageCircleMoreIcon className="mr-2 h-4 w-4" />
                    <span>Chat</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteDocument(doc.id)}>
                    <Trash2Icon className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
