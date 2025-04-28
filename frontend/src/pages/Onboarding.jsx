import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { completeOnboarding } from "../lib/api.js";
import { CameraIcon, ShuffleIcon } from "lucide-react";
import {useNavigate} from 'react-router-dom'
import { LANGUAGES, SKILLS } from "../constant/index.js";
const Onboarding = () => {

  const navigate=useNavigate();


  const { authenticatedUser } = useAuthUser();
  const [formData, setFormData] = useState({
    fullName: authenticatedUser?.fullName || "",
    image: authenticatedUser?.image || "",
    skill: authenticatedUser?.skill || "",
    language: authenticatedUser?.language || "",
    location: authenticatedUser?.location || "",
    bio: authenticatedUser?.bio || "",
  });

  const queryClient = new QueryClient();

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Profile Onboarded successfully");
      setTimeout(()=>{
        navigate('/')
      },1000)
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });


  const randomAvtaar = () => {
    const idx = Math.floor(Math.random() * 1000) + 1;
    const avtaar = `https://api.dicebear.com/9.x/avataaars/svg?backgroundColor=ffd5dc&style=default,circle&seed=${idx}`;
    setFormData({ ...formData, image: avtaar });
    toast.success("Avtaar updated successfully");
  };

  const handleOnboarding = (e) => {
    e.preventDefault();
    onboardingMutation(formData);
  };

  return (
    <div className="h-screen w-full flexCenter">
      <div className="card card-side bg-base-100 card-border border-base-300 card-sm max-w-200 gap-6 p-3">
        <div className="card-body w-full">
          <form onSubmit={handleOnboarding}>
            <div className="my-8">
              <div className="flexCenter flex-col gap-3 mb-6">
                <div>
                  <h2 className="card-title">Complete Onboarding</h2>
                  <p className="para">
                    Please complete your profile to get started with Pingpong.
                  </p>
                </div>

                {formData.image ? (
                  <img
                    alt="Profile Preview"
                    className="h-22 object-cover"
                    src={formData.image}
                  />
                ) : (
                  <CameraIcon className="size-12 text-base-content opacity-40" />
                )}
                <button
                  onClick={randomAvtaar}
                  type="button"
                  className="btn btn-info btn-xs"
                >
                  <ShuffleIcon className="size-4" />
                  Generate another
                </button>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Full Name</legend>
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
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </g>
                    </svg>
                    <input
                      required
                      placeholder="John Doe"
                      pattern="^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$"
                      minLength={2}
                      maxLength={50}
                      title="Only letters, spaces, hyphens or apostrophes"
                      type="text"
                      value={formData.fullName}
                      onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
                    />
                  </label>
                  <p className="validator-hint hidden">
                    Must be 3 to 50 characters
                    <br />
                    containing only letters, spaces, hyphens or apostrophes
                  </p>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Location</legend>
                  <label className="input">
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
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </g>
                    </svg>
                    <input
                      placeholder="City, Country"
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </label>
                </fieldset>
              </div>

              {/* Language & Skill */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Language</legend>
                  <select
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                    className="select"
                  >
                    <option value="" disabled>
                      Pick your language
                    </option>
                    {LANGUAGES.map((language) => (
                      <option key={language} value={language.toLowerCase()}>
                        {language}
                      </option>
                    ))}
                  </select>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Skill</legend>
                  <select
                    value={formData.value}
                    onChange={(e) =>
                      setFormData({ ...formData, skill: e.target.value })
                    }
                    className="select"
                    defaultValue="Select skill you're learning"
                  >
                    <option value="" disabled>
                      Pick your language
                    </option>
                    {SKILLS.map((skill) => (
                      <option key={skill} value={skill.toLowerCase()}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>

              {/* Bio */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Bio</legend>
                <label className="input min-h-16 flex w-full items-start py-3">
                  <svg
                    className="h-[1em] opacity-50 mt-0.5"
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
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </g>
                  </svg>
                  <textarea
                    name="bio"
                    className="grow resize-none outline-none border-none"
                    placeholder="Tell others about yourself..."
                    rows={3}
                    value={formData.bio}
                    onChange={(e)=>setFormData({...formData,bio:e.target.value})}
                  />
                </label>
              </fieldset>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              Complete Onboarding
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
