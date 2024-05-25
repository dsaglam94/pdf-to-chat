import { NextResponse } from 'next/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getAuth } from '@clerk/nextjs/server';

import prisma from '@/utils/prisma';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadToS3(file: Buffer, fileName: string) {
  const fileBuffer = file;
  console.log('Uploading file to S3...', fileName);

  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: fileName,
    Body: fileBuffer,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  // build the URL for the uploaded object
  const url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

  console.log('File uploaded successfully!', url);
  return url;
}

export async function POST(request: Request) {
  try {
    const { userId } = getAuth(request as any);

    if (!userId) {
      return NextResponse.json({
        error: 'You must be logged in to ingest data',
      });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ message: 'File is required!' });
    }

    if (file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadToS3(buffer, file.name);

      const doc = await prisma.document.create({
        data: {
          userId,
          fileUrl: url,
          fileName: file.name,
        },
      });

      console.log('Document created:', doc);

      return NextResponse.json({
        success: true,
        message: 'File uploaded successfully!',
        documentId: doc.id,
        url,
      });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
