import React, { useEffect, useState } from 'react'
import { StreamCall, StreamVideo, StreamVideoClient, CallControls,SpeakerLayout,StreamTheme, CallingState,useCallStateHooks, CallState } from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser';
import { getStreamToken } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import LoadingPage from '../components/LoadingPage'

  const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

  const CallPage = () => {

  const {id:callId}=useParams();

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  // const [isConnecting, setIsConnecting] = useState(true);

  const {authenticatedUser,isLoading}=useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authenticatedUser,
  });
useEffect(()=>{
  const initCall=async()=>{
    if(!tokenData || !authenticatedUser || !callId) return;

    try{
      console.log('Initializing Stream video call');

      const user={
        id:authenticatedUser._id,
        name:authenticatedUser.fullName,
        image:authenticatedUser.image
      }

      const videoClient=new StreamVideoClient({apiKey:STREAM_API_KEY,
        user,
        token:tokenData.token
      })

      const callInstance=videoClient.call("default",callId);
      await callInstance.join({create:true});

      const devices = callInstance.camera.listDevices()

if (devices.length > 1) {
  await call.camera.flip()
}

      console.log("Joined call successfully");

      setClient(videoClient)
      setCall(callInstance)

    }catch(err){
      console.error("Error initializing call:",err);
      toast.error("Error Joining call. Please try again")
    }

  }
  initCall();

},[tokenData, authenticatedUser, callId, call?.camera])

if(isLoading ) return <LoadingPage/>

  return (
    <div className='h-screen flexCenter flex-col'>
        <div className='relative'>
          {client && call ? (
            <StreamVideo client={client}>
              <StreamCall call={call}>
                <CallContent/>
              </StreamCall>
            </StreamVideo>
          ):(
            <div className="flex items-center justify-center h-full">
              <p>Could not initialize call. Please refresh to try again later.</p>
            </div>
          )}
        </div>
    </div>
  )
}

const CallContent=()=>{
  const {useCallCallingState}=useCallStateHooks();
  const callingState=useCallCallingState();
  const navigate=useNavigate();

  if(callingState === CallState.LEFT) return navigate("/")

    return(
      <StreamTheme>
        <SpeakerLayout/>
          <CallControls/>
      </StreamTheme>
    )
}

export default CallPage
