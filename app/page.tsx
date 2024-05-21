'use server';
import { redirect } from 'next/navigation';

import { User, currentUser } from '@clerk/nextjs/server';

import Header from '@/components/home/Header';

export default async function Home() {
  const user: User | null = await currentUser();
  const isUserLoggedIn = !!user;

  if (isUserLoggedIn) {
    redirect('/dashboard');
  }

  return (
    <>
      <Header />
    </>
  );
}
