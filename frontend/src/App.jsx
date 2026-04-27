import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import { Toaster } from "react-hot-toast";
import useAuthUser from './hooks/useAuthUser.js'


const Home=lazy(()=>import("./pages/Home") )
const Notification=lazy(()=>import("./pages/Notification") )
const CallPage=lazy(()=>import("./pages/CallPage") )
const ChatPage=lazy(()=>import("./pages/ChatPage") )
const Connection=lazy(()=>import("./pages/Connection") )
const Login=lazy(()=>import("./pages/Login") )
const Onboarding=lazy(()=>import("./pages/Onboarding") )
const Request=lazy(()=>import("./pages/Request") )
const Signup=lazy(()=>import("./pages/Signup") )
const LoadingPage=lazy(()=>import("./components/Layout.jsx") )
const Layout=lazy(()=>import("./components/Layout") )


function App() {

  const {authenticatedUser,isLoading}=useAuthUser();

  const isAuth = !!authenticatedUser;

  const isOnboarded=authenticatedUser?.isOnboarded ??false;


  if(isLoading) return <Suspense><LoadingPage/></Suspense>


  return (
    <main>

    {/* Public route  */}
      <Suspense>
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to={isOnboarded ? '/ ':'/onboarding'}/> : <Login/>}
        />
        <Route
          path="/signup"
          element={isAuth ? <Navigate to={isOnboarded ? '/ ':'/onboarding'}/> : <Signup/>}
        />

    {/* Protected route  for valid users */}

        <Route path="/" element={<Layout/>}  >
          <Route
          index
          element={isAuth && isOnboarded ? <Home /> : <Navigate to={isAuth ? '/onboarding':"/login"} />}
        />
        <Route
          path="/notifications"
          element={isAuth && isOnboarded ? <Notification /> : <Navigate to={isAuth ? '/onboarding':"/login"} />}
        />
        <Route
          path="/connections"
          element={isAuth && isOnboarded ? <Connection /> : <Navigate to={isAuth ? '/onboarding':"/login"} />}
          
        />
        <Route
          path="/chat/:id"
          element={isAuth && isOnboarded ? <ChatPage /> : <Navigate to={isAuth ? '/onboarding':"/login"} />}
        />
        <Route
          path="/requests"
          element={isAuth && isOnboarded ? <Request /> : <Navigate to={isAuth ? '/onboarding':"/login"} />}

        />
        </Route>
        <Route
          path="/call/:id"
          element={isAuth && isOnboarded ? <CallPage /> : <Navigate to={isAuth ? '/onboarding':"/login"} />}

        />
        <Route
          path="/onboarding"
          element={isAuth ? (isOnboarded ? <Navigate to='/'/> :<Onboarding /> ): <Navigate to="/login" />}
          
        />
      </Routes>
        </Suspense>
      <Toaster
        position="top-right"
        toastOptions={{ className: "!bg-base-100 !text-base-content" }}
      />
    </main>
  );
}

export default App;
