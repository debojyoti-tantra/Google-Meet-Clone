'use client';
import React, {useRef} from 'react';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { toast } from 'react-toastify';
import { Loader } from "lucide-react";
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function  Page()  {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const params = useParams();
  const containerRef = useRef(null);  // ref for video container element
  const [zp, setZp] = useState(null);
  const [isInMeeting, setIsInMeeting] = useState(false);
  
  const roomId = params.roomId;
  
  const joinMeeting = async (element) => {
    // generate Kit Token
    const appID = Number(process.env.NEXT_PUBLIC_ZEGOAPP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
    if (!appID && !serverSecret) {
      throw new Error('please provide appID and serverSecret');
    }
    
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,  user?.id, user?.fullName);

  
    // Create instance object from Kit Token.
    const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
    setZp(zegoInstance);
    // start the call
    zegoInstance.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Join via this link',
          url: `${window.location.origin}/video-meeting/${roomId}`
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
      showAudioVideoSettingsButton:true,
      showScreenSharingButton:true,
      showTurnOffRemoteCameraButton:true,
      showTurnOffRemoteMicrophoneButton:true,
      showRemoveUserButton:true,
      onJoinRoom:() =>{
        toast.success('Meeting joined succesfully');
        setIsInMeeting(true);
      },
      onLeaveRoom:() =>{
        endMeeting();
      },
    });
    };
    
    const endMeeting =() =>{
      if(zp){
        zp.destroy();
      }
      toast.success('Meeting end succesfully');
      setZp(null);
      setIsInMeeting(false);
      router.push('/');
    };
    
    useEffect(() => { 
      if (!isLoaded || !containerRef.current) return;
    
      if (isSignedIn && user) {
        if (!zp) {
          console.log('ession authenticated. Joining meeting...');
          joinMeeting(containerRef.current);
        }
      } else {
        console.error('ession unauthenticated. Please login before joining.');
        toast.error('Session unauthenticated. Please login before joining.');
      }
    }, [isLoaded, isSignedIn, user, joinMeeting, zp]);
    
    useEffect(() => {  
      return () => {
        if (zp) {
          zp.destroy();
        }
      };
     }, [zp]);
     
  if (!isLoaded) {
    return <div className="flex justify-center items-center h-[50vh]">
      <Loader className="animate-spin" />
    </div>
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className={`flex-grow flex flex-col md:flex-row relative ${
          isInMeeting ? "h-screen" : ""
        }`}
      >
        <div
          ref={containerRef}
          className="video-container flex-grow"
          style={{ height: isInMeeting ? "100%" : "calc(100vh - 4rem)" }}
        ></div>
      </div>
    </div>
  );
};
