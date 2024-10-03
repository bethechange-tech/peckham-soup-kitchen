'use client';
import Image from 'next/image';
import { Categories } from '@/payload-types';
import React, { useState } from 'react';

// Main functional component
const ClientComp: React.FC<{
    catergories: Categories[];
}> = ({ catergories }) => {
    // State to manage form data
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        image: null as File | null,
        link: '',
        description: '',
        extendedDescription: '',
        category: '',
        date: '',
        published: false,
    });

    // State to track form submission status
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State to manage form validation errors
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    // Validation function for the form fields
    const validateFields = () => {
        const errors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        }

        if (!formData.author.trim()) {
            errors.author = 'Author is required';
        }
        if (!formData.image) {
            errors.image = 'Image is required';
        }
        if (!formData.link.trim() || !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.link)) {
            errors.link = 'A valid URL is required';
        }
        if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }
        if (!formData.category) {
            errors.category = 'Category is required';
        }
        if (!formData.date) {
            errors.date = 'Date is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Event handler for changing form input values
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;

        // Update `formData` state with the new value for the changed field
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        });
    };


    // Event handler for file input changes
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({
            ...formData,
            image: file,
        });
    };

    // Event handler for form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const form = new FormData();
            form.append('title', formData.title);
            form.append('author', formData.author);
            if (formData.image) {
                form.append('image', formData.image);
            }
            form.append('link', formData.link);
            form.append('description', formData.description);
            form.append('extendedDescription', formData.extendedDescription);
            form.append('category', formData.category);
            form.append('date', formData.date);
            form.append('published', formData.published.toString());

            const response = await fetch('/api/articles', {
                method: 'POST',
                body: form,
            });

            if (response.ok) {
                alert('Article created successfully!');
                setFormData({
                    title: '',
                    author: '',
                    image: null,
                    link: '',
                    description: '',
                    extendedDescription: '',
                    category: '',
                    date: '',
                    published: false,
                });
                setFormErrors({});
            } else {
                alert('Failed to create article.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render the form UI
    return (
        <div className="flex items-center justify-center bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl transition-transform duration-300 ease-in-out transform hover:scale-105">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Create New Article</h2>

                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">
                            Enter the title of the article. This is the main heading that will be displayed.
                        </p>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className={`block w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:shadow-lg transition-all ${formErrors.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
                    </div>

                    {/* Author */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">
                            Specify the author of the article. This helps give credit to the person who created the content.
                        </p>
                        <label htmlFor="author" className="block text-sm font-semibold text-gray-700">
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            className={`block w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:shadow-lg transition-all ${formErrors.author ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter author"
                            value={formData.author}
                            onChange={handleChange}
                        />
                        {formErrors.author && <p className="text-red-500 text-sm mt-1">{formErrors.author}</p>}
                    </div>

                    {/* Image Upload */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">
                            Upload an image to represent the article. You can click the button below or drag and drop an image.
                        </p>
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                            Upload Image
                        </label>
                        <div
                            className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center flex-col hover:bg-gray-100 transition-all cursor-pointer"
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file && file.type.startsWith('image/')) {
                                    handleFileChange({ target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>);
                                }
                            }}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <label
                                htmlFor="image"
                                className="flex items-center px-5 py-3 bg-blue-500 text-white text-sm font-semibold rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all mb-3"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 mr-2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75v14.5m7.25-7.25H4.75" />
                                </svg>
                                Choose Image
                            </label>
                            <p className="text-sm text-gray-500">or drag and drop here</p>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Image preview section */}
                        {formData.image && (
                            <div className="mt-4 flex flex-col items-start space-y-2 relative">
                                <p className="text-sm text-gray-600">Selected Image Preview:</p>
                                <div className="relative w-48 h-48 border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                                    <Image
                                        src={URL.createObjectURL(formData.image)}
                                        alt="Selected preview"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 focus:outline-none"
                                    onClick={() => setFormData({ ...formData, image: null })}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* Error message */}
                        {formErrors.image && (
                            <p className="text-red-600 text-sm mt-2 font-semibold">
                                {formErrors.image}
                            </p>
                        )}
                    </div>

                    {/* Link */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">
                            Provide a link to additional resources or to the original content if applicable.
                        </p>
                        <label htmlFor="link" className="block text-sm font-semibold text-gray-700">
                            Link
                        </label>
                        <input
                            type="text"
                            id="link"
                            className={`block w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:shadow-lg transition-all ${formErrors.link ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter link"
                            value={formData.link}
                            onChange={handleChange}
                        />
                        {formErrors.link && <p className="text-red-500 text-sm mt-1">{formErrors.link}</p>}
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">
                            Provide a brief description of the article. This is usually a summary that highlights the key points.
                        </p>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className={`block w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:shadow-lg transition-all ${formErrors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
                    </div>

                    {/* Extended Description */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">
                            Add an extended description if more details are needed for the article. This could be an in-depth overview or additional context.
                        </p>
                        <label htmlFor="extendedDescription" className="block text-sm font-semibold text-gray-700">
                            Extended Description
                        </label>
                        <textarea
                            id="extendedDescription"
                            className="block w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:shadow-lg transition-all"
                            placeholder="Enter extended description"
                            value={formData.extendedDescription}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">
                            Select the appropriate category for the article. This helps in organizing articles for better navigation.
                        </p>
                        <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                            Category
                        </label>
                        <select
                            id="category"
                            className={`block w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:shadow-lg transition-all ${formErrors.category ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {catergories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {formErrors.category && <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>}
                    </div>

                    {/* Date */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">
                            Specify the date when the article was created or is relevant. This helps users know the timeline of the content.
                        </p>
                        <label htmlFor="date" className="block text-sm font-semibold text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            className={`block w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:shadow-lg transition-all ${formErrors.date ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.date && <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>}
                    </div>

                    {/* Published */}
                    <div className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            id="published"
                            className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            checked={formData.published}
                            onChange={handleChange}
                        />
                        <label htmlFor="published" className="text-sm font-semibold text-gray-700">
                            Published
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                                        <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                'Create Article'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientComp;
