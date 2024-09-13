"use client";
import React, { useState } from 'react';

interface FileUpload {
    file: File;
    id: string;
    progress: number;
}

const Page: React.FC = () => {
    const [files, setFiles] = useState<FileUpload[]>([]);
    const [tag, setTag] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files);

        const newFiles: FileUpload[] = selectedFiles.map((file) => ({
            file,
            id: `${file.name}-${Date.now()}`,
            progress: 0,
        }));

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        simulateUpload(newFiles);

        // Clear the file input value to allow re-selecting the same files
        e.target.value = '';
    };

    // Handle tag input change
    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    };

    // Simulate file upload with progress
    const simulateUpload = (filesToUpload: FileUpload[]) => {
        filesToUpload.forEach((fileObj) => {
            const intervalId = setInterval(() => {
                setFiles((prevFiles) =>
                    prevFiles.map((file) => {
                        if (file.id === fileObj.id) {
                            const newProgress = Math.min(file.progress + 10, 100);
                            if (newProgress === 100) clearInterval(intervalId);
                            return { ...file, progress: newProgress };
                        }
                        return file;
                    })
                );
            }, 500);
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!tag || files.length === 0) {
            alert('Please provide a tag and select files before submitting.');
            return;
        }

        setIsSubmitting(true);

        // Create FormData object
        const formData = new FormData();
        formData.append('tag', tag);
        files.forEach((fileObj, index) => {
            formData.append(`file_${index}`, fileObj.file);
        });

        try {
            // Make POST request to upload files
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Files uploaded successfully!');
                console.log('Tag:', tag);
                console.log('Files:', files);

                // Reset form after successful submission
                setTag('');
                setFiles([]);
            } else {
                alert('File upload failed.');
            }
        } catch (error) {
            console.error('Error during file upload:', error);
            alert('An error occurred while uploading files.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white p-6 shadow-xl rounded-lg">
                <div className="mb-4 text-lg font-semibold text-gray-800">Upload Files</div>

                <form onSubmit={handleSubmit}>
                    {/* Tag Input */}
                    <div className="mb-4">
                        <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
                            Tag
                        </label>
                        <input
                            id="tag"
                            type="text"
                            value={tag}
                            onChange={handleTagChange}
                            className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-md focus:border-green-600 focus:ring-green-600 sm:text-sm font-bold placeholder-gray-500 placeholder-opacity-70 transition duration-300 ease-in-out hover:shadow-lg focus:shadow-lg py-3 px-4"
                            placeholder="e.g., event, product, etc."
                            disabled={isSubmitting}
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Tag is for the type of images they are, like it could be an event, product, etc.
                        </p>
                    </div>

                    {/* File Drop Zone */}
                    <div className={`mb-6 flex h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-500 transition-colors hover:border-green-600 hover:bg-green-50 ${isSubmitting && 'cursor-not-allowed opacity-50'} relative`}>
                        <input
                            type="file"
                            multiple
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                            disabled={isSubmitting}
                        />
                        <div className="text-center relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-auto mb-2 h-12 w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 15a4 4 0 011-7.874m0 0A5.978 5.978 0 018 7h8a6 6 0 110 12h-4m4-10v6m0 0l3-3m-3 3l-3-3"
                                />
                            </svg>
                            <p className="mt-1 text-gray-700">
                                Drag &amp; Drop or{" "}
                                <span className="font-medium text-green-600">Choose Files</span> here
                            </p>
                            <p className="text-sm text-gray-400">Max size: 25 MB</p>
                        </div>
                    </div>

                    {/* File Upload Progress */}
                    <div className="space-y-4 relative">
                        {files.map((file) => (
                            <div key={file.id} className="rounded-lg border bg-gray-50 p-4 shadow-sm relative">
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-gray-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        <span className="font-medium text-gray-700">{file.file.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{file.progress}% - {Math.round((100 - file.progress) / 10) * 0.5} mins remaining</span>
                                </div>
                                <div className="relative h-2.5 w-full rounded bg-gray-200">
                                    <div
                                        className="absolute left-0 top-0 h-full rounded-l bg-green-600"
                                        style={{ width: `${file.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-between">
                        <button
                            type="button"
                            onClick={() => setFiles([])}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Upload Files'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
