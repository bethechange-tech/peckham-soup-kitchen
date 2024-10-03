import React from 'react';
import Link from 'next/link'; // Import Link from Next.js
import ClientComp from './clientComp';
import { getCatergories } from '@/app/_utilities/actions';

const page = async () => {
    const catergories = await getCatergories();

    return (
        <>
            {catergories && catergories.length > 0 ? (
                <ClientComp catergories={catergories} />
            ) : (
                <div className="flex flex-col items-center justify-center h-full py-10">
                    <p className="text-lg text-gray-700 mb-4">No categories found.</p>
                    <Link href="/portal/categories">
                        <a className="text-teal-600 hover:text-teal-800 hover:underline">
                            Go to categories page to add or update categories.
                        </a>
                    </Link>
                </div>
            )}
        </>
    );
};

export default page;
