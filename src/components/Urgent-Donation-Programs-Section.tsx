import React from 'react'
import Image from 'next/image';

const UrgentDonationProgramsSection = () => {
    return (
        <section className="mb-8 md:mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-8 text-gray-800">
                Some Urgent Donation Programs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                    {
                        title: "Food Drive",
                        description: "Help us collect non-perishable food items for families in need. Your contributions make a significant impact.",
                        image: "/images/food-drive.jpeg",
                    },
                    {
                        title: "Winter Clothing",
                        description: "Donate warm clothing to help the homeless stay warm during the winter months. Coats, blankets, and socks are needed.",
                        image: "/images/winter-clothing.jpeg",
                    },
                    {
                        title: "School Supplies",
                        description: "Provide essential school supplies to children from low-income families. Pencils, notebooks, and backpacks are needed.",
                        image: "/images/school-supplies.jpeg",
                    },
                ].map((program, index) => (
                    <div
                        key={index}
                        className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
                    >
                        <div className="relative w-full h-56">
                            <Image
                                src={program.image}
                                alt={program.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-lg"
                            />
                        </div>
                        <div className="p-6">
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">
                                {program.title}
                            </h4>
                            <p className="text-gray-700 mb-4">
                                {program.description}
                            </p>
                            <button className="inline-block bg-teal-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>

    )
}

export default UrgentDonationProgramsSection