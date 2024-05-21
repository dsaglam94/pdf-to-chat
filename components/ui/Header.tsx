'use server';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Header() {
  // const user = currentUser();
  // const isUserLoggedIn = !!user;

  // if (!isUserLoggedIn) {
  //   redirect('/');
  // }

  return (
    <header className="container bg-white flex items-center  justify-between mx-auto my-5 py-5 px-8 rounded-full border-solid border-[1px] border-gray-400 shadow-md">
      <div>PDF To Chat</div>
      <nav>
        <div>Dashboard</div>
        <UserButton />
      </nav>
    </header>
  );
}
