import prisma from '@/utils/prisma';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // check if document exists
    // if it does, delete it from S3 and then delete it from the database
    const document = await prisma.document.findUnique({
      where: {
        id,
      },
    });

    const input = {
      Bucket: process.env.AWS_BUCKET,
      Key: document?.fileName,
    };

    // delete object from S3
    const command = new DeleteObjectCommand(input);
    await s3.send(command);

    // delete document from the database
    await prisma.document.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully!',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error deleting document.',
      error,
    });
  }
}
