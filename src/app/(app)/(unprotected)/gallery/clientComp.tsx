'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Images } from '@/payload-types';
import { FaTimes, FaArrowLeft, FaArrowRight, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import debounce from 'lodash/debounce';

// Helper function to format dates
const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

// Image component with enhanced touch interactions, skeleton loading, and zoom feature for mobile
const ImageWithPlaceholder: React.FC<{
    url: string;
    createdAt: string;
    onClick: () => void;
}> = ({ url, createdAt, onClick }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            className="relative w-full h-56 sm:h-72 rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300 ease-in-out"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            tabIndex={0}
            role="button"
            aria-label={`View image created on ${formatDate(createdAt)}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick();
                }
            }}
        >
            {/* Skeleton Loader */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
            )}

            <Image
                src={url}
                alt={`Media created on ${formatDate(createdAt)}`}
                layout="fill"
                objectFit="cover"
                className={`transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
            />
            {/* Image Info */}
            <motion.div
                className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-xs p-2 text-center opacity-0 md:opacity-100 md:transition-opacity md:duration-300 md:ease-in-out"
                whileHover={{ opacity: 1 }}
                whileFocus={{ opacity: 1 }}
            >
                Created: {formatDate(createdAt)}
            </motion.div>
        </motion.div>
    );
};


const ModalCarousel: React.FC<{
    images: Record<string, any>[];
    currentIndex: number;
    onClose: () => void;
}> = ({ images, currentIndex, onClose }) => {
    const [index, setIndex] = useState(currentIndex);

    const handleNext = useCallback(() => {
        setIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrevious = useCallback(() => {
        setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowRight') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrevious();
            }
        },
        [handleNext, handlePrevious, onClose]
    );

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <AnimatePresence>
            <motion.div
                id="modal-carousel"
                className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => e.target === e.currentTarget && onClose()}
                aria-labelledby="carousel-title"
                role="dialog"
                aria-modal="true"
            >
                <motion.div
                    className="relative bg-white rounded-lg overflow-hidden shadow-lg w-full h-full max-w-3xl max-h-[90vh] flex flex-col justify-center"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 z-20"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <FaTimes className="text-lg" />
                    </button>

                    {/* Progress Indicator */}
                    <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-full z-20">
                        {index + 1} / {images.length}
                    </div>

                    {/* Navigation and Image Display */}
                    <div className="flex justify-between items-center p-2 h-full">
                        {/* Previous Button */}
                        <button
                            onClick={handlePrevious}
                            className="text-white text-3xl p-3 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                            aria-label="Previous image"
                        >
                            <FaArrowLeft />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={index}
                            className="relative w-full h-full rounded-md overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(e, info) => {
                                if (info.offset.x > 50) handlePrevious();
                                if (info.offset.x < -50) handleNext();
                            }}
                        >
                            <Image
                                src={images[index].url}
                                alt={`Carousel Image ${index + 1}`}
                                layout="fill"
                                objectFit="contain"
                                priority
                                className="touch-pinch-zoom"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-sm p-4 text-center">
                                Created: {images[index].createdAt ? new Date(images[index].createdAt).toLocaleDateString() : 'Unknown'}
                            </div>
                        </motion.div>

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            className="text-white text-3xl p-3 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                            aria-label="Next image"
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};



// Main component with improved mobile image UI/UX
const MediaPageWithFilters: React.FC<{ imageData: Images[] }> = ({
    imageData,
}) => {
    const [nameFilter, setNameFilter] = useState<string>('');
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [isFilterCollapsed, setIsFilterCollapsed] = useState<boolean>(true);

    // Filter images based on name filter and organize them by section
    const groupedImagesBySection = useMemo(() => {
        return imageData.reduce((acc, item) => {
            item.urls?.forEach((urlItem) => {
                const tagName = (item?.tag as any)?.[0]?.name ?? 'Untitled';

                if (
                    tagName.toLowerCase().includes(nameFilter.toLowerCase()) ||
                    item?.name?.toLowerCase().includes(nameFilter.toLowerCase())
                ) {
                    if (!acc[tagName]) acc[tagName] = [];
                    acc[tagName].push({
                        id: urlItem.id,
                        url: urlItem.url,
                        name: item.name,
                        createdAt: item.createdAt,
                        tag: tagName,
                    });
                }
            });
            return acc;
        }, {} as Record<string, any>);
    }, [imageData, nameFilter]);

    // Handle modal opening
    const handleImageClick = (section: string, index: number) => {
        setSelectedSection(section);
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFilterChange = debounce((value: string) => {
        setNameFilter(value);
    }, 300);

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row md:p-8 text-black">
            {/* Collapsible Sidebar for Filters */}
            {/* <motion.aside
                className="mb-8 md:mb-0 md:mr-8 w-full md:w-1/4 lg:w-1/5 h-fit bg-white p-6 rounded-xl shadow-lg text-gray-800 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <button
                    className="flex items-center justify-between w-full md:hidden p-3 bg-gray-100 rounded-lg mb-4 focus:outline-none"
                    onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}
                    aria-expanded={!isFilterCollapsed}
                >
                    <span className="font-bold text-gray-700">Filters</span>
                    {isFilterCollapsed ? (
                        <FaChevronDown className="text-gray-700" />
                    ) : (
                        <FaChevronUp className="text-gray-700" />
                    )}
                </button>
                <div className={`${isFilterCollapsed ? 'hidden' : 'block'} md:block`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                        Filters
                    </h2>
                    <div className="flex flex-col gap-6">
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">
                                Filter by Name
                            </label>
                            <input
                                type="text"
                                onChange={(e) => handleFilterChange(e.target.value)}
                                className="block w-full border border-gray-300 rounded-lg py-3 px-4 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-200 ease-in-out bg-gray-50 hover:bg-white focus:bg-white"
                                placeholder="Search by name"
                                aria-label="Filter media by name"
                            />
                        </div>
                    </div>
                </div>
            </motion.aside> */}

            {/* Media Grid */}
            <motion.main
                className="w-full md:w-3/4 lg:w-4/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
                {Object.keys(groupedImagesBySection).length > 0 ? (
                    Object.keys(groupedImagesBySection).map((section) => (
                        <div key={section} className="mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                                {section}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                {groupedImagesBySection?.[section]?.map((image: { url: string | null | undefined; createdAt: string; }, index: number) => (
                                    <ImageWithPlaceholder
                                        key={index}
                                        url={image.url || ''}
                                        createdAt={image.createdAt}
                                        onClick={() => handleImageClick(section, index)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <motion.p
                        className="text-center text-lg text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        No media found
                    </motion.p>
                )}
            </motion.main>

            {/* Modal Carousel */}
            {isModalOpen && selectedSection && (
                <ModalCarousel
                    images={groupedImagesBySection[selectedSection] as Record<string, any>[]}
                    currentIndex={currentImageIndex}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default MediaPageWithFilters;
