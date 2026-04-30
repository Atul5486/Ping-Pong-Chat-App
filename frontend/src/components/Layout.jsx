import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import ThemeSelector from './ThemeSelector'
import Sidebar from './Sidebar'
import { useQuery } from '@tanstack/react-query'
import { getFriendRequests } from '../lib/api'


const Layout = () => {
const { data: friendRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
const incomingRequest = friendRequests?.incomingRequest || [];
  return (
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full bg-base-300 flexBetween">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4">
        <div>
            <div className="flexEnd gap-3 ml-auto" >
            <Link to='/requests' className='btn rounded-full'>Requests
                <div className='badge badge-sm badge-info'>{incomingRequest ? Number(incomingRequest.length) : "00"}</div>
            </Link>
            <ThemeSelector/>
          </div>
        </div>
      </div>
    </nav>
    {/* Page content here */}
    <div className="p-4"><Outlet/></div>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <Sidebar/>
  </div>
</div>
  )
}

export default Layout
