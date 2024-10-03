import React from 'react';
import ClientComp from './clientComp';
import { getImages } from '@/app/_utilities/actions';
import { FaImages } from 'react-icons/fa';

const Page = async () => {
    const images = await getImages();

    return (
        <>
            {images && images.length > 0 ? (
                <ClientComp imageData={images} />
            ) : (
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-sm">
                        <FaImages size={60} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-700 font-semibold mb-2">No images available</p>
                        <p className="text-gray-500">It looks like there are no images to show at the moment. Please check back later!</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
