'use server';
import { currentUser, User } from '@clerk/nextjs/server';

import prisma from '@/utils/prisma';

import Dashboard from './dashboard-client';

export default async function page() {
  const user: User | null = await currentUser();

  const docList = await prisma.document.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main>
      <div>
        <Dashboard docList={docList} />
      </div>
    </main>
  );
}
