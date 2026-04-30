import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { acceptFriendRequest, getFriendRequests } from '../lib/api';
import { getCountryFlag } from '../components/UserCard';

const Request = () => {
  
const queryClient = useQueryClient();

const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
  const incomingRequest = friendRequests?.incomingRequest || [];
  return (
    <div className="space-y-11 h-[97vh] overflow-y-scroll">
      <div>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : incomingRequest.length===0 ?(
          <div className='card bg-base-100 p-6 text-center'>
    <h4 className='mb-2'>No Request available</h4>
    <p className='para'>
        Check back later for skill sharing opportunities
    </p>
    </div>
        ): (
          <div className="space-y-12">
            {incomingRequest.length > 0 && (
              <section>
                <h3 className="flexStart gap-2 mb-6">
                  <UserCheckIcon className="text-primary" />
                  Connection Requests
                  <span className="badge badge-primary badge-xs relative bottom-2">
                    {incomingRequest.length}
                  </span>
                </h3>
                <div className="space-y-3 max-w-md">
                  {incomingRequest.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-100 card-sm p-2"
                    >
                      <div className="card-body">
                        <div>
                          <div className="flexBetween mb-3">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                              <img
                                src={request.sender.image}
                                alt={request.sender.fullName}
                                width={55}
                              />
                            </div>
                            <h5 className="capitalize">
                              {request.sender.fullName}
                            </h5>
                            {request?.sender?.location && (
                              <p className="para flex items-center gap-2 mt-1">
                                <MapPinIcon className="size-4" />
                                {request.sender.location}
                              </p>
                            )}
                            <button
                              onClick={() => acceptRequestMutation(request._id)}
                              disabled={isPending}
                              className="btn btn-info btn-soft btn-xs rounded-full"
                            >
                              Accept
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="para">{request.sender.bio}</p>
                      <hr className="h-px w-full bg-base-content opacity-10 rounded-full border-none my-2" />
                      <div className="flex gap-1 sm:gap-3">
                        <span className="badge badge-soft badge-secondary text-xs capitalize">
                          {getCountryFlag(request.sender.language)}
                          {request.sender.language}
                        </span>
                        <span className="badge badge-soft badge-success text-xs capitalize">
                          <span className="hidden sm:block">Skill : </span>
                          {request.sender.skill}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Request
