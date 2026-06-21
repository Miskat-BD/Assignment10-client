"use client";
import React from "react";
import Link from "next/link";
import { Button, Card, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

const LoginFormPage = ({ redirectTo = "/" }) => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formElement = e.currentTarget;
        const formData = new FormData(formElement);
        const { email, password } = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: redirectTo,
        });

        console.log('Login Data:', data, 'Error:', error);

        if (data) {
            toast.success("Logged In Successfully!");
            formElement.reset();
            router.push(redirectTo);
            router.refresh();
        }

        if (error) {
            toast.error(`${error.message}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto my-16 px-4">
            {/* Header */}
            <div className="my-6 text-center">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-[#6C696D]">Log in to your StartupForge account</p>
            </div>

            {/* Container Card */}
            <Card className="max-w-md mx-auto p-6 sm:p-8 border border-base-200 bg-emerald-50 flex justify-center items-center">
                <Form onSubmit={onSubmit} className="flex w-full flex-col gap-4 justify-center mx-auto">

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

                    {/* Password Field */}
                    <TextField
                        isRequired
                        name="password"
                        type="password"
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" className={'w-full'} />
                        <FieldError />
                    </TextField>

                    {/* Submit Login Button */}
                    <Button className="w-full bg-emerald-600 text-white mt-2" type="submit">
                        Sign In
                    </Button>
                </Form>

                {/* Register Link Footer */}
                <p className="text-center text-sm mt-6">
                    Don't have an account?{" "}
                    <span className="text-emerald-600 font-semibold">
                        <Link href="/auth/register">Sign Up</Link>
                    </span>
                </p>
            </Card>
        </div>
    );
};

export default LoginFormPage;