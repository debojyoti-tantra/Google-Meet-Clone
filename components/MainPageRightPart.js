'use client';
import React from 'react';
import {Button} from '@/components/ui/button.jsx';
import Image from "next/image";
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useState } from 'react';

const MainPageRightPart = () => {
  const [i, setI] = useState(0);
  
  const cards = [
    {
      image: '/image_1.svg',
      title: 'Get a link you can share',
      desc: 'Click New meeting to get a link you can send to people you want to meet with'
    },
    {
      image: '/image_2.svg',
      title: 'Plan ahead',
      desc: 'Click New meeting to schedule meetings in Google Calendar and send invites to participants'
    },
    {
      image: '/image_3.svg',
      title: 'Your meeting is safe',
      desc: 'No one can join a meeting unless invited or admitted by the host'
    }
  ];
  
  const indexDec = () => {
    if (i<=0) {
      setI(2);
    } else if (i<=2 && i>0) {
      setI(i-1);
    }
  };
  
  const indexInc = () => {
    if (i>=2) {
      setI(0);
    } else if (i<2 && i>=0) {
      setI(i+1);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center items-center gap-2">
        <Button onClick={indexDec} className="text-2xl p-3"><CircleChevronLeft /></Button>
        <Image src={cards[i].image} width={100} height={100} alt='image' className="w-[50vw] h-[50vw] sm:w-[20vw] sm:h-[20vw]" />
        <Button onClick={indexInc} className="text-2xl p-3"><CircleChevronRight /></Button>
      </div>
      <div className="flex justify-center items-center flex-col mt-4 sm:w-[28vw]">
        <p className="font-semibold mx-auto">{cards[i].title}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{cards[i].desc}</p>
      </div>
    </div>
  );
};
  
export default MainPageRightPart;
