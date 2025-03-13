'use client';
import React from 'react';
import {Button} from '@/components/ui/button.jsx';
import { Video, Plus, Link, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const MainPageLeftPart = () => {
  const router = useRouter(); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [generatedMeetingUrl, setGeneratedMeetingUrl] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  
  useEffect(() => {  
    setBaseUrl(window.location.origin);
  }, []);
  
  const handelCreateMeetingForLater = () => {
    const roomId = uuidv4();
    console.log(roomId);
    const url = `${baseUrl}/video-meeting/${roomId}`;
    setGeneratedMeetingUrl(url);
    setIsDialogOpen(true);
    toast.success('Meeting link generated successfully...');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMeetingUrl);
    toast.info('Link copied successfully');
  };
  
  const handelJoinMeeting = () => {
    if (meetingLink) {
      const formattedLink = meetingLink.includes('http')
      ?meetingLink
      :`${baseUrl}/video-meeting/${meetingLink}`;
      
      router.push(formattedLink);
      toast.info('meeting joining....');
    } else {
      toast.error('please enter valid link or code');
    }
  };
  
  const handelStartMeeting = () => {
    const roomId = uuidv4();
    const meetingUrl = `${baseUrl}/video-meeting/${roomId}`;
    router.push(meetingUrl);
    toast.info('starting meeting....');
  };
  
  return (
    <div className="flex flex-col mt-11 sm:mt-36 gap-3 m-5">
      <h1 className="text-5xl">Video calls and meetings for everyone</h1>
      <p className="text-xl">Connect, collaborate, and celebrate from anywhere with Debo-Meet</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button><Video /> New metting</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handelCreateMeetingForLater}>
                <Link /> Create a meeting for later
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handelStartMeeting}>
                <Plus /> Start a instant meeting
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex items-center gap-1">
          <Input placeholder="Enter a code or link..." value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} />
          <Button onClick={handelJoinMeeting}>Join</Button>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Here&apos;s your joining information</DialogTitle>
              <DialogDescription>
              <span>
                <span>Send this to people that you want to meet with. Make sure that you save it so that you can use it later, too.</span>
                <span className="flex justify-between items-center">
                  <span className="border p-1 w-full h-full">
                    {generatedMeetingUrl.slice(0,40)}...
                  </span>
                  <Button onClick={copyToClipboard}>Copy <Copy /></Button>
                </span>
              </span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        
      </div>
    </div>
  );
};

export default MainPageLeftPart;
