import React from 'react'
import {CheckCheckIcon, LucideMail, MapPinIcon, UserPlusIcon} from 'lucide-react'
import {LANGUAGE_TO_FLAG} from '../constant/index.js'
import {Link} from 'react-router-dom'
const UserCard = ({user,hasRequestBeenSent,sendRequestMutation,isPending}) => {
  return (
    <div className='card bg-base-100 card-sm'>
      <div className='card-body'>
        <div>
          <div className='flexBetween mb-3'>
            <div className='flex items-center gap-3'>
              <img src={user.image} alt={user.fullName} width={55}/>
              <div>
                <h5>{user.fullName}</h5>
                {user.location && (
                  <p className='para flex items-center gap-2 mt-1'>
                    <MapPinIcon className="size-4" />
                    {user.location}
                  </p>
                )}
              </div>
            </div>
            {/* Button - Message /Friend Request */}
            {hasRequestBeenSent !==undefined && sendRequestMutation ? (
              <button className={`btn btn-info btn-xs ${hasRequestBeenSent ? 'btn-disabled':'btn-soft'}`}
              onClick={()=>sendRequestMutation(user._id)}disabled={hasRequestBeenSent || isPending}
              >
              {hasRequestBeenSent ? (
                <>
                <CheckCheckIcon className='size-4'/>
                  Request Sent
                </>
              ):(
                <>
                <UserPlusIcon className='size-4'/>
              Connection request
                </>
              )}
            </button>
            ):(
              <Link to={`/chat/${user._id}`} className='btn btn-info btn-sm btn-soft rounded-full'>
                <LucideMail className='size-3'/>
                Message
              </Link>
            )}
            
          </div>
          <p className='para'>{user.bio}</p>
        </div>
        <hr className='h-px w-full bg-base-content opacity-10 rounded-full border-none mb-2'/>
        <div className='flex flex-wrap gap-3'>
          <span className='badge badge-soft badge-secondary text-xs font-medium capitalize'>
            {
              getCountryFlag(user.language)
            }
            {user.language}
          </span>
          <span className='badge badge-soft badge-success text-xs font-medium capitalize'>
          <span className='hidden sm:block'>Skill :</span>
            {user.skill}
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserCard

// eslint-disable-next-line react-refresh/only-export-components
export function getCountryFlag(language){
  if(!language) return null;

  const langLower=language.toLowerCase();
  const countryCode=LANGUAGE_TO_FLAG[langLower];

  if(countryCode){
    return(
      <img 
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className='h-3 mr-1 inline-block'
      />
    )

  }
  return null;
}
