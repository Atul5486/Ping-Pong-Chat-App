import React, { useState } from "react";
import { UserSignup } from "../hooks/userSignup.js";
import { Uselogin } from "../hooks/useLogin.js";
import {Link} from 'react-router-dom';

const Login = () => {

  const [formData,setFormData]=useState({
    fullName:'',
    email:'',
    password:''
  })

  const {loginMutation,isPending,error}=Uselogin(formData);

const handleSubmit=(e)=>{
  e.preventDefault()
  loginMutation(formData)
}

console.log(error)


  return (
    <div className="h-screen w-full flexCenter">
      <div className="card card-side bg-base-100 card-border border-base-300 card-sm max-w-200 gap-6 p-3">
        
        <div className="card-body w-full">
          
          <div className="flexCenter gap-1">
            <img alt="logo" height={33} width={33} src="/logo.png" />
            <h3 className="hidden sm:block">ingpong</h3>
          </div>
          {
            error && 
            <div className="alert alert-error mb-4">
              <span>{error?.response?.data?.message}</span>
            </div>
          }
          <form onSubmit={handleSubmit} className="mt-6">
            <h2 className="card-title">Welcome Back</h2>
            <p className="para">
              Welcome to Pingpong. Please fill in the form below to create an account.
            </p>

            <div className="my-8">
              {/* Email */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    required
                    value={formData.email}
                    onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </fieldset>

              {/* Password */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                    </g>
                  </svg>
                  <input
                    value={formData.password}
                    onChange={(e)=>setFormData({...formData,password:e.target.value})}
                    type="password"
                    placeholder="Password"
                    required
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  />
                </label>
                <p className="validator-hint hidden">
                  Must be more than 8 characters, including<br />
                  At least one number<br />
                  At least one lowercase letter<br />
                  At least one uppercase letter
                </p>
              </fieldset>
            </div>

            <button className="btn btn-primary w-full" type="submit"
            disabled={isPending}
            >
            {isPending && <span className="loading loading-spinner">
            </span>
            }
              Login
            </button>

            <p className="text-sm mt-4">
              Already have an account?{" "}
              <Link
                className="text-primary hover:underline"
                to="/signup"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        <figure className="max-w-sm hidden sm:block">
          <img
            alt="img"
            className="object-cover rounded-xl"
            src="/loginImg.jpg"
          />
        </figure>
      </div>
    </div>
  );
};

export default Login;

