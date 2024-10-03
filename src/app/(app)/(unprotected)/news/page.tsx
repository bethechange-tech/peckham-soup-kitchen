import React from 'react';
import ClientComp from './clientComp';
import { getArticles, getCatergories } from '../../../_utilities/actions';
import { FaExclamationTriangle } from 'react-icons/fa'; // Import an icon for a better user experience

const Page = async () => {
    const [catergories, articles] = await Promise.all([getCatergories(), getArticles()]);

    // Check if either categories or articles are empty
    const isEmpty = !catergories?.length || !articles?.length;

    return (
        <>
            {!isEmpty ? (
                <ClientComp catergories={catergories.map(({ name }) => name)} articles={articles} />
            ) : (
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md">
                        <FaExclamationTriangle size={50} className="text-yellow-500 mx-auto mb-4" />
                        <p className="text-xl text-gray-700 font-semibold mb-2">No articles available</p>
                        <p className="text-gray-500">It seems there are no articles to display right now. Please check back later for updates!</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
