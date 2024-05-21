'use client';

import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="container bg-white flex items-center  justify-between mx-auto my-5 py-5 px-8 rounded-full border-solid border-[1px] border-gray-400 shadow-md">
      <div>PDF To Chat</div>

      <div className="flex items-center gap-5">
        <Link
          href="/dashboard"
          className="bg-white text-black px-6 py-2 border-solid border-[1px] border-gray-300 rounded-[20px] font-semibold"
        >
          Log In
        </Link>

        <Link
          href="/dashboard"
          className="bg-black text-white px-6 py-2 border-solid border-[1px] border-transparent rounded-[20px] font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
}
