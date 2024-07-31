import React from 'react'

const ContactUsSection = () => {
    return (
        <section className="bg-gradient-to-r from-teal-400 to-teal-500 p-6 md:p-10 rounded-lg shadow-md mb-8 md:mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 md:mb-8">
                Get in Touch
            </h3>
            <form className="max-w-xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="relative">
                    <label
                        htmlFor="name"
                        className="block text-lg font-medium text-gray-800"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Your Name"
                    />
                </div>
                <div className="relative">
                    <label
                        htmlFor="email"
                        className="block text-lg font-medium text-gray-800"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Your Email"
                    />
                </div>
                <div className="relative">
                    <label
                        htmlFor="message"
                        className="block text-lg font-medium text-gray-800"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Your Message"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-teal-600 text-white px-6 py-3 rounded-full shadow-md transform transition duration-300 ease-in-out hover:bg-teal-700 hover:-translate-y-1"
                >
                    Send Message
                </button>
            </form>
        </section>
    )
}

export default ContactUsSection