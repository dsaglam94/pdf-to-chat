'use client';

import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function ReachedUploadLimit() {
  return (
    <div className="max-w-2xl h-[300px] border-[2px] border-solid border-gray-300 rounded-md p-10 flex flex-col items-center justify-center text-center mx-auto my-10 gap-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-1">
              <Image
                src="/info-icon.svg"
                alt="info-icon"
                width={25}
                height={25}
              />
              <p>You reached your upload limit.</p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span className="text-sm text-gray-600">
              Currently, users are allowed to upload up to 3 documents.
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
