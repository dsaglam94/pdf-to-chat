'use client';

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import { Button } from './button';

export default function Header() {
  return (
    <header className="container bg-white flex items-center  justify-between mx-auto my-5 py-5 px-8 rounded-xl border-solid border-[1px] border-gray-400 shadow-md">
      <Link href="/">
        <div>PDF To Chat</div>
      </Link>

      <div className="flex items-center gap-5">
        <SignedIn>
          <Link
            href="/dashboard"
            className="bg-white text-black px-6 py-2 border-solid border-[1px] border-gray-300 rounded-[20px] font-semibold"
          >
            Dashboard
          </Link>
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
