import React, { useEffect, useState } from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { getoutgoingFriendReqs, getRecommandedUsers, getUseFriends, sendFriendRequest } from '../lib/api';
import NoFriendFound from '../components/NoFriendFound';
import NoRecommandedFound from '../components/NoRecommandedFound';
import {toast } from 'react-hot-toast'
import UserCard from '../components/UserCard'

const Home = () => {

  const queryClient=useQueryClient();

  const[outgoingRequestIds,setOutgoingRequestsIds]=useState(new Set());
 
  const {data:friends=[],isLoading:loadingFriends}=useQuery({
    queryKey:['friends'],
    queryFn:getUseFriends
  })
  const {data:recommandedUsers=[],isLoading:loadingUsers}=useQuery({
    queryKey:['users'],
    queryFn:getRecommandedUsers
  })
  const {data:outgoingFriendReqs}=useQuery({
    queryKey:['outgoingFriendReqs'],
    queryFn:getoutgoingFriendReqs
  })
 const {mutate:sendRequestMutation,isPending}=useMutation({
        mutationFn:sendFriendRequest,
        onSuccess:()=>queryClient.invalidateQueries({queryKey:['outgoingFriendReqs']}),
        onError:(error)=>toast.error(error.response.data.message)
    })

    useEffect(()=>{
      const outgoingIds=new Set();
      if(outgoingFriendReqs && outgoingFriendReqs.length >0){
        outgoingFriendReqs.forEach(req =>(
          outgoingIds.add(req.recipient._id)
        ));
        console.log(outgoingIds)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOutgoingRequestsIds(outgoingIds);
      }
    },[outgoingFriendReqs])

  return (
    <div className='space-y-11 h-[97] overflow-y-scroll'>
        {/* Friends Section */}
        <section>
          <div className='mb-6'>
            <h3>Learning Partners</h3>
            <p className='para'>Connect and practice skills with your learning partners</p>
          </div>
          {
            loadingFriends ? (
              <div className='flexCenter py-12'>
                <span className='loading loading-spinner loading-lg'/>
              </div>
            ):friends.length===0 ? (
                <NoFriendFound/>
              ):(
               <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                {
                  friends.map((user)=>(
                    <UserCard key={user._id} user={user}/>
                  ))
                }
               </div>
              )
          }
        </section>   
           {/* Recommandation section */}
        <section>
          <div className='mb-6'>
            <h3>Expand Your Network</h3>
            <p className='para'>Meet new learners ready to exchange skills and practice together</p>
          </div>
          {
            loadingUsers ? (
              <div className='flexCenter py-12'>
                <span className='loading loading-spinner loading-lg'/>
              </div>
            ):recommandedUsers.length === 0 || recommandedUsers.message ? (
                <NoRecommandedFound/>
              ):(
               <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                {
                  recommandedUsers.length > 0 && recommandedUsers.map((user)=>{
                    const hasRequestBeenSent=outgoingRequestIds.has(user._id);
                    return(
                    <UserCard key={user._id} user={user} hasRequestBeenSent={hasRequestBeenSent} 
                    sendRequestMutation={sendRequestMutation}
                    isPending={isPending}
                    />
                    )
                  })
                }
               </div>
              )
          }
        </section>      
    </div>
  )
}

export default Home
