'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import getStripe from '@/lib/get-stripe';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

const Page: React.FC = () => {
    const [donationAmount, setDonationAmount] = useState<string | number>('');
    const [frequency, setFrequency] = useState<string>('one-time');
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let formErrors: Partial<FormData> = {};
        if (!formData.firstName) formErrors.firstName = 'First name is required';
        if (!formData.lastName) formErrors.lastName = 'Last name is required';
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.phoneNumber) formErrors.phoneNumber = 'Phone number is required';
        return formErrors;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setIsModalOpen(true); // Show modal if there are errors
            return;
        }

        setErrors({}); // Clear errors if validation passes

        try {
            const {
                data: { id: sessionId },
            } = await axios.post(`/api/checkout_sessions`, {
                formData, donationAmount, frequency
            });

            const stripe = await getStripe();
            await stripe.redirectToCheckout({ sessionId });
        } catch (error: any) {
            console.error('Error processing donation', error);
        }
    };

    return (
        <div className="bg-white p-4 md:p-8 lg:p-12 rounded-lg shadow-lg max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-teal-800 mb-4">
                How to Donate
            </h2>
            <p className="text-gray-600 mb-6">
                At Peckham Soup Kitchen, we are committed to supporting members of the Southwark community in need. Our efforts focus on providing essential services and empowering individuals to improve their lives and well-being. Through initiatives such as the Friday Food Hub and Wednesday Food Outreach, we offer food provision and support to vulnerable members of our community. Our diverse programs, including the Be Active Programme, Summer Football Camp, and Back to School Drive, aim to foster community engagement and provide essential resources. By donating, you are helping us continue these vital services and make a meaningful impact in the lives of those we serve.
            </p>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-teal-800 mb-4">
                Give to Peckham Soup Kitchen
            </h2>
            <p className="text-gray-600 mb-6">
                Your contributions are crucial in funding our work. Every donation helps us provide essential services and support to those in need. Thank you for considering supporting our mission to empower and uplift our community.
            </p>
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-teal-800 mb-2">
                    Select an Amount
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                    <button
                        className={`py-2 px-4 rounded w-full md:w-auto ${donationAmount === '200' ? 'bg-teal-600 text-white' : 'bg-teal-500 text-white'}`}
                        onClick={() => setDonationAmount('200')}
                    >
                        200
                    </button>
                    <button
                        className={`py-2 px-4 rounded w-full md:w-auto ${donationAmount === '100' ? 'bg-teal-600 text-white' : 'bg-teal-500 text-white'}`}
                        onClick={() => setDonationAmount('100')}
                    >
                        100
                    </button>
                    <button
                        className={`py-2 px-4 rounded w-full md:w-auto ${donationAmount === '50' ? 'bg-teal-600 text-white' : 'bg-teal-500 text-white'}`}
                        onClick={() => setDonationAmount('50')}
                    >
                        50
                    </button>
                    <button
                        className={`py-2 px-4 rounded w-full md:w-auto ${donationAmount === '30' ? 'bg-teal-600 text-white' : 'bg-teal-500 text-white'}`}
                        onClick={() => setDonationAmount('30')}
                    >
                        30
                    </button>
                    <button
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded w-full md:w-auto"
                        onClick={() => setDonationAmount('')}
                    >
                        Other
                    </button>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Your Donation"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                    />
                    <div className="flex items-center">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="frequency"
                                value="one-time"
                                className="form-radio text-teal-600"
                                checked={frequency === 'one-time'}
                                onChange={(e) => setFrequency(e.target.value)}
                            />
                            <span className="ml-2 whitespace-nowrap">One-time</span>
                        </label>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    Monthly payment option coming soon!
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-teal-800 mb-2">
                        Your Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Your Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-teal-500 to-green-400 text-white py-4 px-10 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-teal-600 hover:to-green-500 focus:outline-none transform hover:scale-105 transition-transform ease-in-out duration-300 animate-pulse font-bold text-lg"
                    >
                        Donate Now
                    </button>
                    <p className="text-gray-600">or</p>
                    <a
                        href="https://www.gofundme.com/f/we-are-helping-to-feed-the-community-in-southwark"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 text-teal-600 py-3 px-6 rounded-full shadow-md hover:bg-gray-200 focus:outline-none transition"
                    >
                        Go to GoFundMe Page
                    </a>
                </div>
            </form>

            {/* Error Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
                        <ul className="list-disc list-inside">
                            {Object.entries(errors).map(([field, error]) => (
                                <li key={field} className="text-red-500">{error}</li>
                            ))}
                        </ul>
                        <button
                            className="bg-teal-600 text-white py-2 px-4 rounded mt-4 hover:bg-teal-700"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
