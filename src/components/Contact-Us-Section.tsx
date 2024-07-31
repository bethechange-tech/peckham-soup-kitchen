import React, { useState } from 'react';

const ContactUsSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        let tempErrors = { name: '', email: '', message: '' };
        let isValid = true;

        if (!formData.name.trim()) {
            tempErrors.name = 'Name is required';
            isValid = false;
        }
        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email address is invalid';
            isValid = false;
        }
        if (!formData.message.trim()) {
            tempErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            // Simulate an async operation like sending data to a server
            setTimeout(() => {
                alert('Message sent successfully!');
                setIsSubmitting(false);
                setFormData({ name: '', email: '', message: '' });
                setErrors({ name: '', email: '', message: '' });
            }, 2000);
        }
    };

    return (
        <section className="bg-gradient-to-r from-teal-400 to-teal-500 p-6 md:p-10 rounded-lg shadow-md mb-8 md:mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 md:mb-8">
                Get in Touch
            </h3>
            <form className="max-w-xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
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
                        className={`mt-2 p-3 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500`}
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                        className={`mt-2 p-3 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500`}
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                        className={`mt-2 p-3 block w-full border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500`}
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-teal-600 text-white px-6 py-3 rounded-full shadow-md transform transition duration-300 ease-in-out hover:bg-teal-700 hover:-translate-y-1"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </section>
    );
}

export default ContactUsSection;
