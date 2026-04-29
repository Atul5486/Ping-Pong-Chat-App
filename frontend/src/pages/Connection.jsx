import React from 'react'
import { getUseFriends } from '../lib/api'
import { useQuery } from '@tanstack/react-query'
import NoFriendFound from '../components/NoFriendFound'
import UserCard from '../components/UserCard'

const Connection = () => {

  const {data:friends=[],isLoading:loadingFriends}=useQuery({
    queryKey:['friends'],
    queryFn:getUseFriends
  })
  return (
    <div className='space-y-11 h-[97vh] overflow-y-scroll'>
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
    </div>
)}

export default Connection
