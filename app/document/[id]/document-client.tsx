'use client';
import { Document } from '@prisma/client';
import { useState } from 'react';

import { Viewer, Worker } from '@react-pdf-viewer/core';

import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

import type {
  ToolbarSlot,
  TransformToolbarSlot,
} from '@react-pdf-viewer/toolbar';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

type Message = {
  type: 'ai' | 'user';
  content: string;
};

export default function DocumentClient({
  currentDocument,
}: {
  currentDocument: Document;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const toolbarPluginInstance = toolbarPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Download: () => <></>,
    SwitchTheme: () => <></>,
    Open: () => <></>,
  });

  return (
    <div className="container px-0 flex justify-between h-[90vh]">
      {/* Left handside */}
      <div className="w-full">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
          <div
            className={`w-full h-[85vh] flex-col text-white !important flex`}
          >
            <div
              className="align-center bg-[#eeeeee] flex p-1"
              style={{
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              }}
            >
              <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
            </div>
            <Viewer
              fileUrl={currentDocument.fileUrl}
              plugins={[toolbarPluginInstance, pageNavigationPluginInstance]}
            />
          </div>
        </Worker>
      </div>

      {/* Right handside */}
      <div className="w-full h-[90vh] bg-red-500">
        <div>
          {messages.length === 0 && (
            <div className="text-center text-gray-500">
              No messages yet. Start a conversation.
            </div>
          )}
        </div>
        <div>
          {messages.map((message, index) => (
            <div key={index} className="flex">
              <div
                className={`${
                  message.type === 'ai' ? 'bg-blue-500' : 'bg-green-500'
                } p-2 rounded-lg`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
