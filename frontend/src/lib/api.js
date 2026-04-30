import { axiosInstance } from "./axios";
export const registeruser = async (formData) => {
  const response = await axiosInstance.post("/auth/signup", formData);
  return response.data;
};
export const loginUser = async (formData) => {
  const response = await axiosInstance.post("/auth/login", formData);
  console.log(response)
  return response.data;
};

export const fetchAuthUser=async()=>{
      const response = await axiosInstance.get("/auth/me");
      return response.data;
} 

export const completeOnboarding=async(formData)=>{
      const response = await axiosInstance.put("/auth/onboarding",formData);
      return response.data;
} 
export const logoutUser=async()=>{
      const response = await axiosInstance.get("/auth/logout");
      return response.data;
} 
export const getUseFriends=async()=>{
      const response = await axiosInstance.get("/user/friends");
      return response.data;
} 
export const getRecommandedUsers=async()=>{
      const response = await axiosInstance.get("/user");
      return response.data;
} 
export const getoutgoingFriendReqs=async()=>{
      const response = await axiosInstance.get("/user/friend-request/outgoing");
      return response.data.ongoingRequest;
} 
export const sendFriendRequest=async(userId)=>{
            const response = await axiosInstance.post(`/user/friend-request/${userId}`);
            return response.data;
} 
export const getFriendRequests=async()=>{
            const response = await axiosInstance.get('/user/friend-request');
            return response.data;
} 
export const acceptFriendRequest=async(requestId)=>{
            const response = await axiosInstance.put(`/user/friend-request/${requestId}/accept`);
            return response.data;
} 

export  async function getStreamToken(){
    try {
      const res=await axiosInstance.get('/chat/token')
      return res.data
    } catch (error) {
      throw new Error(error.message)
 }
}