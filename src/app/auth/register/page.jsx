"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Card, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";
import { imageUpload } from "@/app/lib/imgUpload";

const RegisterPage = () => {
    const [role, setRole] = useState("collaborator");

    const onSubmit = async (e) => {
        e.preventDefault();
        const formElement = e.currentTarget;
        const formData = new FormData(e.currentTarget);
        const user= Object.fromEntries(formData.entries());
        // console.log(user, 'user');
        const image = await imageUpload(user.image)

        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: image.url,
            role: role,
            callbackURL: "/",
        });
        console.log('data', data, 'error', error);

        if (data) {
            toast.success("Registration Successful");
            formElement.reset();
        }
        if (error) {
            toast.error(`${error.message}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto my-16 px-4">
            {/* Header */}
            <div className="my-6 text-center">
                <h1 className="text-2xl font-bold">Create an Account</h1>
                <p className="text-[#6C696D]">Join StartupForge to unlock opportunities</p>
            </div>

            {/* Container Card */}
            <Card className="max-w-md mx-auto p-6 sm:p-8 border border-base-200 bg-emerald-50 flex justify-center items-center">
                <Form onSubmit={onSubmit} className="flex w-full flex-col gap-4 justify-center mx-auto">

                    {/* Full Name Field */}
                    <TextField isRequired name="name" type="text" >
                        <Label>Full Name</Label>
                        <Input placeholder="John Doe" className={'w-full'} />
                        <FieldError />
                    </TextField>

                    {/* Email Field */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" className={'w-full'} />
                        <FieldError />
                    </TextField>

                    {/* Image upload */}
                    <TextField
                        className="w-full"
                        type="file"
                        variant="secondary"
                    >
                        <Label>Image</Label>
                        <input name="image" type="file" placeholder="Quantity" className={'w-full bg-white p-2 border border-gray-300 rounded-sm'}/>
                    </TextField>

                    {/* Password Field */}
                    <TextField
                        isRequired
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 6) {
                                return "Password must be at least 6 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" className={'w-full'} />
                        <FieldError />
                    </TextField>

                    {/* Confirm Password Field */}
                    <TextField isRequired name="confirmPassword" type="password">
                        <Label>Confirm Password</Label>
                        <Input placeholder="Re-enter your password" className={'w-full'} />
                        <FieldError />
                    </TextField>

                    {/* Select Role */}
                    <div className="flex flex-col gap-1 w-full">
                        <Label className="text-sm font-medium mb-1">Select Your Role</Label>
                        <div className="relative w-full bg-white ">
                            <select
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full h-10 px-3 py-2 bg-transparent border border-slate-200  text-sm focus:outline-none focus:border-emerald-600 appearance-none cursor-pointer transition-colors text-slate-700"
                            >
                                <option value="founder" className="bg-white text-slate-900">Founder</option>
                                <option value="collaborator" className="bg-white text-slate-900">Collaborator</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Submit Register Button */}
                    <Button className="w-full bg-emerald-600 text-white mt-2" type="submit">
                        Sign Up
                    </Button>
                </Form>

                {/* Login Link Footer */}
                <p className="text-center text-sm mt-6">
                    Already have an account?{" "}
                    <span className="text-emerald-600 font-semibold">
                        <Link href="/login">Log In</Link>
                    </span>
                </p>
            </Card>
        </div>
    );
};

export default RegisterPage;