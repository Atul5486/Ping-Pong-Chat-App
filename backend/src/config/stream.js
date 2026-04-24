import { StreamChat } from "stream-chat";
import "dotenv/config";
const apikey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

const streamClient = StreamChat.getInstance(apikey, apiSecret);

export const upsertStream = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (err) {
    console.error("Error upserting stream user", err.message);
  }
};
export const generateStreamToken = (userId) => {
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.log('error in generateStreamToken',error.message)
  }
};
