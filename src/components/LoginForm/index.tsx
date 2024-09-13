"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface LoginFormData {
    email: string;
    password: string;
}

function LoadingSpinner() {
    return (
        <svg
            className="animate-spin h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
}

export default function ProfileForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email) || "Invalid email address.";
    };

    const loginHandler: SubmitHandler<LoginFormData> = async (data) => {
        setError("");
        setLoading(true);
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (response.ok) {
                router.push("/");
            } else {
                setError(responseData.message || "Failed to log in");
            }
        } catch (err) {
            setError(
                "There was a problem logging into your account. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-500 font-[sans-serif] text-[#333]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
                    <a>
                        <img src="/logo-removebg-preview.png" alt="logo" className="w-40 mb-10" />
                    </a>
                    <h2 className="text-center text-3xl font-extrabold">
                        Log in to your account
                    </h2>
                    <form onSubmit={handleSubmit(loginHandler)} className="mt-10 space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-purple-500"
                                {...register("email", {
                                    required: "Email is required",
                                    validate: validateEmail,
                                })}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">{errors.email.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-purple-500"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            {errors.password && (
                                <span className="text-sm text-red-500">{errors.password.message}</span>
                            )}
                        </div>
                        {loading && (
                            <div className="item-center justify-center py-3">
                                <LoadingSpinner />
                            </div>
                        )}
                        {error && (
                            <span className="text-sm text-red-500 text-center py-3">
                                {error}
                            </span>
                        )}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 shrink-0 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm">
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <a
                                    href="javascript:void(0);"
                                    className="text-sm text-purple-600 hover:text-purple-500"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        <div className="!mt-10">
                            <button
                                type="submit"
                                className="w-full py-2.5 px-4 text-sm rounded text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}