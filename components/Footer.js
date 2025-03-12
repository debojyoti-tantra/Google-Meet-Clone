'use client';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

export default function  Footer()  {
  const { isSignedIn, user, isLoaded } = useUser();
  
  return (
    <div className="flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Meeting Info
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-200 dark:bg-gray-700">
        <div className="text-center">
          <Image
            src="/videoQuality.jpg"
            alt="Feature 1"
            width={150}
            height={150}
            className="mx-auto mb-2 rounded-full"
          />
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
            HD Video Quality
          </h3>
           <p className='text-sm text-gray-600 dark:text-gray-300'>
            Experience crystal clear video calls
           </p>
        </div>
        <div className="text-center">
          <Image
            src="/screenShare.jpg"
            alt="Feature 1"
            width={150}
            height={150}
            className="mx-auto mb-2 rounded-full"
          />
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
             Screen Sharing
          </h3>
           <p className='text-sm text-gray-600 dark:text-gray-300'>
              Easily  share your screen with participant
           </p>
        </div>
        <div className="text-center">
          <Image
            src="/videoSecure.jpg"
            alt="Feature 1"
            width={150}
            height={150}
            className="mx-auto mb-2 rounded-full"
          />
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
             Secure Meetings
          </h3>
           <p className='text-sm text-gray-600 dark:text-gray-300'>
               Your meetings are protected and private
           </p>
        </div>
       </div>
    </div>
  );
};
