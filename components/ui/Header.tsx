'use client';
import Link from 'next/link';

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

import { Button } from './button';

export default function Header() {
  return (
    <header className="container bg-white flex items-center  justify-between mx-auto my-5 py-5 px-8 rounded-md border-solid border-[1px] border-gray-400 shadow-md">
      <Link href="/">
        <div>PDF To Chat</div>
      </Link>

      <div className="flex items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <Button variant="secondary">Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </header>
  );
}
