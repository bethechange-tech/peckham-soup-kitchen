'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { FiMail, FiLock } from 'react-icons/fi';

const loginFormSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

function LoadingSpinner() {
    return (
        <svg
            className="animate-spin h-8 w-8 text-purple-600"
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
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
        </svg>
    );
}

export default function ProfileForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const loginHandler: SubmitHandler<LoginFormData> = async (data) => {
        setError('');
        setLoading(true);

        try {
            // const response = await axios.post(
            //     `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
            //     data,
            //     {
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         withCredentials: true,
            //     }
            // );

            await axios.post('/api/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            // Redirect to home page
            window.location.href = '/';
        } catch (err: any) {
            setError('There was a problem logging into your account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 sm:p-10">
                <Link href="/">
                    <Image src="/logo-no-background.png" alt="logo" className="mx-auto mb-8" height={100} width={100} />
                </Link>
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Log in to your account
                </h2>
                <form onSubmit={handleSubmit(loginHandler)} className="space-y-6">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1 relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                placeholder="Email address"
                                {...register('email')}
                                className={`block w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none text-sm transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                {...register('password')}
                                className={`block w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none text-sm transition ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-600 text-sm mt-2">{errors.password.message}</p>
                        )}
                    </div>

                    {loading && (
                        <div className="flex justify-center py-3">
                            <LoadingSpinner />
                        </div>
                    )}

                    {error && (
                        <p className="text-center text-red-600 text-sm mt-4">
                            {error}
                        </p>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <div>
                            <Link href="/forgot-password">
                                <span className="text-sm text-purple-600 hover:text-purple-500 cursor-pointer">
                                    Forgot Password?
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Don’t have an account?{' '}
                            <Link href="/signup">
                                <span className="text-purple-600 hover:text-purple-500 cursor-pointer">
                                    Sign up
                                </span>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
