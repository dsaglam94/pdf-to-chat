import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadToS3(file: Buffer, fileName: string) {
  const fileBuffer = file;
  const key = `${fileName}-${Date.now()}`;
  console.log('Uploading file to S3...', fileName);

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
    Key: key,
    Body: fileBuffer,
  };

  const command = new PutObjectCommand(params);
  const test = await s3.send(command);

  // then fetch the url of the uplodaded file from AWS
  const url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;

  console.log('File uploaded successfully!', test, url);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ message: 'File is required!' });
    }

    if (file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = await uploadToS3(buffer, file.name);

      return NextResponse.json({
        message: 'File uploaded successfully!',
        fileName,
      });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
