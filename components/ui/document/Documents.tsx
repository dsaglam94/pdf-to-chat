import { Document } from '@prisma/client';

import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { MessageCircleMoreIcon, Trash2Icon } from 'lucide-react';

export default function Documents({ docList }: { docList: Document[] }) {
  const router = useRouter();
  const { toast } = useToast();

  async function deleteDocument(id: string) {
    try {
      const res = await fetch(`/api/document/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        toast({
          description: data.message,
          variant: 'default',
        });

        router.refresh();
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast({
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      {docList.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between border-[2px] border-solid border-gray-200 shadow-md rounded-md p-1"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/document-icon.svg"
              alt="document icon"
              width={20}
              height={20}
            />
            <p className="text-sm font-medium text-gray-700">{doc.fileName}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {`${formatDistanceToNow(doc.createdAt)} ago`}
            </span>

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
        </div>
      ))}
    </div>
  );
}
