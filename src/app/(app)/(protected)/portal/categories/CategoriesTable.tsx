'use client';
import React, { useEffect, useState } from 'react';
import { Categories } from '@/payload-types';

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date); // Example output: "29 September 2024"
};

// JSX with formatted date fields
const CategoriesTableBody: React.FC<{ categories: Categories[] }> = ({ categories }) => (
    <tbody className="divide-y divide-gray-200">
        {categories?.map((category) => (
            <tr
                key={category.id}
                className="hover:bg-blue-50 transition duration-150 ease-in-out"
            >
                <td className="py-4 px-3 text-sm sm:px-6">{category.id}</td>
                <td className="py-4 px-3 text-sm sm:px-6">{category.name}</td>
                <td className="py-4 px-3 text-sm sm:px-6">{category.description}</td>
                <td className="py-4 px-3 text-sm sm:px-6">{formatDate(category.updatedAt)}</td>
                <td className="py-4 px-3 text-sm sm:px-6">{formatDate(category.createdAt)}</td>
            </tr>
        ))}
    </tbody>
);

const CategoriesTable: React.FC<{
    catergories: Categories[]
}> = ({ catergories: loadedCatergories }) => {
    // State to store the list of categories.
    const [categories, setCategories] = useState<Categories[]>([]);

    // State to control the modal visibility.
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // State to store the form inputs and error messages.
    const [formData, setFormData] = useState<{ name: string; description: string }>({
        name: '',
        description: '',
    });

    const [formErrors, setFormErrors] = useState<{ name: string; description: string }>({
        name: '',
        description: '',
    });

    // State to control the loading state for the form submission.
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Simulate fetching data using useEffect
    useEffect(() => {
        setCategories(loadedCatergories);
    }, [loadedCatergories]);

    // Handle form input changes.
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Set form data state
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate input
        validateField(name, value);
    };

    // Validate a specific form field
    const validateField = (fieldName: string, value: string) => {
        let errorMessage = '';

        if (value.trim() === '') {
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
        }

        setFormErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
    };

    // Check if the form is valid (no errors)
    const isFormValid = () => {
        return !formErrors.name && !formErrors.description && formData.name && formData.description;
    };

    // Handle form submission.
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Perform final validation check
        if (isFormValid()) {
            setIsSubmitting(true); // Start loading

            const newCategory: Categories = {
                id: categories.length + 1,
                name: formData.name,
                description: formData.description,
                updatedAt: new Date().toISOString(),
                createdAt: new Date().toISOString(),
            };

            try {
                await fetch("/api/categories", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newCategory),
                });

                // Update the categories state with the new category
                setCategories((prev) => [...prev, newCategory]);

                // Close the modal and reset form data
                setIsModalOpen(false);
                setFormData({ name: '', description: '' });
                setFormErrors({ name: '', description: '' });
            } catch (error) {
                console.error('Error adding category:', error);
            } finally {
                setIsSubmitting(false); // Stop loading
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
            {/* Page Heading */}
            <div className="mb-4 text-center sm:mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:text-3xl">
                    Categories Records
                </h1>
                <p className="text-sm text-gray-600 sm:text-base">
                    Manage your category details effectively. Use filters and columns to customize your view.
                </p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:space-x-4 w-full sm:w-auto">
                    <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white transition duration-200 ease-in-out bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto sm:px-6 sm:py-3">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 11l7-7 7 7M5 19l7-7 7 7"
                            ></path>
                        </svg>
                        Filters
                    </button>
                    <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white transition duration-200 ease-in-out bg-gray-500 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 sm:w-auto sm:px-6 sm:py-3">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 3v4h14V3M4 9h16v2H4V9zm0 4h16v2H4v-2zm0 4h16v2H4v-2zm0 4h16v2H4v-2z"
                            ></path>
                        </svg>
                        Columns
                    </button>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white transition duration-200 ease-in-out bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 sm:w-auto sm:px-6 sm:py-3"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        ></path>
                    </svg>
                    Add Record
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr className="bg-blue-200">
                            <th className="py-3 px-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-gray-300 sm:px-6">
                                ID
                            </th>
                            <th className="py-3 px-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-gray-300 sm:px-6">
                                Name
                            </th>
                            <th className="py-3 px-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-gray-300 sm:px-6">
                                Description
                            </th>
                            <th className="py-3 px-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-gray-300 sm:px-6">
                                Updated At
                            </th>
                            <th className="py-3 px-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-gray-300 sm:px-6">
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <CategoriesTableBody categories={categories} />
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full p-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                    required
                                />
                                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full p-2 border ${formErrors.description ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                    required
                                />
                                {formErrors.description && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                                )}
                            </div>
                            <div className="flex justify-end items-center">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mr-4 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isFormValid() || isSubmitting}
                                    className={`px-4 py-2 text-sm font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${isFormValid() && !isSubmitting ? 'bg-green-500 hover:bg-green-600' : 'bg-green-300 cursor-not-allowed'
                                        }`}
                                >
                                    {isSubmitting ? 'Adding...' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesTable;
