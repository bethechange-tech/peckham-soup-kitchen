import React from 'react';

const page = () => {
    return (
        <div className="bg-white p-4 md:p-8 lg:p-12 rounded-lg shadow-lg max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-800 mb-4">
                How to Donate
            </h2>
            <p className="text-gray-600 mb-6">
                At Peckham Soup Kitchen, we are committed to supporting members of the Southwark community in need. Our efforts focus on providing essential services and empowering individuals to improve their lives and well-being. Through initiatives such as the Friday Food Hub and Wednesday Food Outreach, we offer food provision and support to vulnerable members of our community. Our diverse programs, including the Be Active Programme, Summer Football Camp, and Back to School Drive, aim to foster community engagement and provide essential resources. By donating, you are helping us continue these vital services and make a meaningful impact in the lives of those we serve.
            </p>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-800 mb-4">
                Give to Peckham Soup Kitchen
            </h2>
            <p className="text-gray-600 mb-6">
                Your contributions are crucial in funding our work. Every donation helps us provide essential services and support to those in need. Thank you for considering supporting our mission to empower and uplift our community.
            </p>
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Select an Amount
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                    <button className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-auto">
                        200
                    </button>
                    <button className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-auto">
                        100
                    </button>
                    <button className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-auto">
                        50
                    </button>
                    <button className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-auto">
                        30
                    </button>
                    <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded w-full md:w-auto">
                        Other
                    </button>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Your Donation"
                    />
                    <div className="flex items-center">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="frequency"
                                value="one-time"
                                className="form-radio text-green-600"
                                defaultChecked
                            />
                            <span className="ml-2 whitespace-nowrap">One-time</span>
                        </label>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    Monthly payment option coming soon!
                </p>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Your Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Last Name"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Your Email"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Your Phone Number"
                    />
                </div>
                <div className="mt-4">
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox text-green-600" />
                        <span className="ml-2">{`It's OK to contact me in the future`}</span>
                    </label>
                </div>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Payment Details
                </h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name on the card
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Name on the card"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Card Number"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration Date
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="MM/YY"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="CVC"
                        />
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button className="bg-green-600 text-white py-3 px-6 rounded-full shadow-md hover:bg-green-700 focus:outline-none">
                    Donate Now
                </button>
            </div>
        </div>
    );
}

export default page;
