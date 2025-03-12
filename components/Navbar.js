'use client';
import React from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Video } from "lucide-react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function  Navbar()  {
  const { isSignedIn, user, isLoaded } = useUser();
  
  const getFormattedDate = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      weekday: "short",
      month: "short",
      day: "numeric",
    }).replace(",", "");
  };
  
  
  return (
    <nav className="flex items-center justify-between pl-3 shadow-lg shadow-gray-200 dark:shadow-gray-800 sticky left-0 top-0 bg-white dark:bg-black">
      <Link href='/' className="font-bold text-lg sm:text-xl flex justify-center items-center gap-2">
        <Video /> Debo-Meet
      </Link>
      
      <div className="flex justify-center items-center gap-2">
        <div className="sm:mr-3 text-xs sm:text-lg">{getFormattedDate()}</div>
        <ThemeToggle/>
        <header className="flex justify-end items-center sm:p-4 pr-1 sm:gap-4 h-16">
          <SignedOut>
            <div  className="flex flex-col sm:flex-row gap-1">
              <SignInButton className="text-white text-xs bg-violet-800 hover:underline hover:bg-violet-500 px-2 py-1 rounded-lg">
                Sign in
              </SignInButton>
              <SignUpButton className="text-white text-xs bg-violet-800 hover:underline hover:bg-violet-500 px-2 py-1 rounded-lg">
                Sign up
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      </div>
    </nav>
  );
};
