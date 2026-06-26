"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { imageUpload } from "@/app/lib/imgUpload"; 
import { updateProfile } from '@/app/lib/actions/profile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CollaboratorProfile = ({ initialData, mongoUser }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    
    const [formDataState, setFormDataState] = useState({
        name: "",
        bio: "",
        skills: ""
    });

    useEffect(() => {
        if (mongoUser) {
            setFormDataState({
                name: mongoUser.name || "",
                bio: mongoUser.bio || "",
                skills: Array.isArray(mongoUser.skills) ? mongoUser.skills.join(', ') : (mongoUser.skills || "")
            });
        }
    }, [mongoUser]); 

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());

        const userId = mongoUser?._id || initialData?.id;

        if (!userId) {
            toast.error("User ID missing! Cannot update profile.");
            setLoading(false);
            return;
        }

        try {
            let uploadedImageUrl = mongoUser?.image || "";

            if (formValues.image && formValues.image.size > 0) {
                const imgData = await imageUpload(formValues.image);
                if (imgData?.url) {
                    uploadedImageUrl = imgData.url;
                }
            }

            const profileData = {
                name: formValues.name,
                image: uploadedImageUrl,
                skills: formValues.skills ? formValues.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
                bio: formValues.bio
            };

            const data = await updateProfile(userId, profileData);
            console.log("Server Response:", data);

            if (data?.acknowledged || data?.success || data?.modifiedCount > 0) {
                toast.success("Profile updated successfully! 🎉");
                router.push('/dashboard/collaborator/profile')
            } else {
                toast.error("No changes made or update failed.");
            }
        } catch (error) {
            console.error("Profile Update Error:", error);
            toast.error("Something went wrong on the server!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-12 px-4">
            {/* Header */}
            <div className="mb-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-slate-950">Edit Profile</h1>
                <p className="text-sm text-slate-500 mt-1">Update your professional information, avatar, and technical skills.</p>
            </div>

            {/* Container Card */}
            <div className="card w-full bg-base-100 border border-base-200 shadow-sm p-6 sm:p-8">
                <form onSubmit={handleUpdateProfile} className="space-y-5">
                    
                    {/* Full Name Field */}
                    <div className="form-control w-full">
                        <label className="label font-semibold text-sm text-slate-700">
                            <span className="label-text font-semibold">Full Name</span>
                        </label>
                        <input 
                            type="text" 
                            name="name"
                            value={formDataState.name} 
                            onChange={(e) => setFormDataState({...formDataState, name: e.target.value})}
                            placeholder="John Doe" 
                            className="input input-bordered w-full bg-white text-slate-800" 
                            required 
                        />
                    </div>

                    {/* Profile Picture Upload */}
                    <div className="form-control w-full">
                        <label className="label font-semibold text-sm text-slate-700">
                            <span className="label-text font-semibold">Profile Picture</span>
                        </label>
                        {mongoUser?.image && (
                            <div className="mb-3 avatar">
                                <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden position-relative">
                                    <Image height={100} width={100} src={mongoUser.image} alt="Avatar Preview" className="object-cover" />
                                </div>
                            </div>
                        )}
                        <input 
                            type="file" 
                            name="image"
                            accept="image/*"
                            className="file-input file-input-bordered w-full bg-white text-slate-800" 
                        />
                        <label className="label">
                            <span className="label-text-alt text-slate-400">Leave empty to keep current profile picture.</span>
                        </label>
                    </div>

                    {/* Skills Field */}
                    <div className="form-control w-full">
                        <label className="label font-semibold text-sm text-slate-700">
                            <span className="label-text font-semibold">Skills (Comma Separated)</span>
                        </label>
                        <input 
                            type="text" 
                            name="skills"
                            value={formDataState.skills} 
                            onChange={(e) => setFormDataState({...formDataState, skills: e.target.value})}
                            placeholder="React, Next.js, Tailwind, Node.js" 
                            className="input input-bordered w-full bg-white text-slate-800" 
                        />
                        <label className="label">
                            <span className="label-text-alt text-slate-400">Separate your skills with a comma ( , )</span>
                        </label>
                    </div>

                    {/* Bio Field */}
                    <div className="form-control w-full">
                        <label className="label font-semibold text-sm text-slate-700">
                            <span className="label-text font-semibold">Short Bio</span>
                        </label>
                        <textarea 
                            name="bio"
                            value={formDataState.bio} 
                            onChange={(e) => setFormDataState({...formDataState, bio: e.target.value})}
                            placeholder="Tell us about your background, experiences, and interests..." 
                            className="textarea textarea-bordered h-32 w-full bg-white text-slate-800 text-base"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`btn btn-primary w-full text-white font-bold tracking-wide ${loading ? 'loading' : ''}`}
                        >
                            {loading ? "Saving Changes..." : "Save Changes"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CollaboratorProfile;