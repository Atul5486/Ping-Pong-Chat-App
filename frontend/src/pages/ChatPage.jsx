import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  Thread,
  ChannelHeader,
} from "stream-chat-react";
import { toast } from "react-hot-toast";
import CallButton from "../components/CallButton";

const ChatPage = () => {
  const { id: targetedUserId } = useParams();
  const { authenticatedUser } = useAuthUser();

  const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authenticatedUser,
  });

  useEffect(() => {
    if (!tokenData || !authenticatedUser || !targetedUserId) return;

    let client;

    const initChat = async () => {
      try {
        client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authenticatedUser._id,
            name: authenticatedUser.fullName,
            image: authenticatedUser.image,
          },
          tokenData.token
        );

        const channelId = [authenticatedUser._id, targetedUserId]
          .sort()
          .join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authenticatedUser._id, targetedUserId],
        });

        await currChannel.watch();

        setChannel(currChannel);
        setChatClient(client);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      }
    };

    initChat();

    // Cleanup on unmount
    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [tokenData, authenticatedUser, targetedUserId, STREAM_API_KEY]);

  if (!chatClient || !channel) {
    return <div className="h-[87vh] flex items-center justify-center">Loading chat...</div>;
  }

  const handleVideoCall=()=>{
    if(channel){
      const callUrl=`${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`
      });
      toast.success("Video call link sent in chat!");
    }
  }

  return (
    <div className="h-[87vh] overflow-hidden ">
      <div className="card bg-base-100 card-sm h-full">
        <div className="card-body p-0 h-full">
          <Chat client={chatClient}>
            <Channel channel={channel}>
              <div className="w-full relative">
                <CallButton handleVideoCall={handleVideoCall} />
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput focus/>
              </Window>
              </div>
              <Thread />
            </Channel>
          </Chat>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
