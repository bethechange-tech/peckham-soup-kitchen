'use client';

import React from 'react';
import Image from 'next/image';

const Page = () => {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <section className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-600">
                    We Are Peckham Soup Kitchen
                </h2>
                <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                    Peckham Soup Kitchen is a community non-profit organisation formed in
                    2022 to give back to those in need in the Southwark community.
                </p>
            </section>

            <section className="mb-12">
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-teal-600">
                    What is Peckham Soup Kitchen?
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    We provide food provision each week to support those in need. We also
                    mentor young people and facilitate programmes to support their physical
                    and mental well-being.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-6">
                    <li>Providing meals for people in need</li>
                    <li>Promoting health and wellbeing</li>
                    <li>Building community and social connections</li>
                    <li>Offering valuable resources and support</li>
                    <li>Encouraging volunteering and service in the community</li>
                    <li>Raising awareness and advocacy</li>
                </ul>
            </section>

            <section className="mb-12">
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-teal-600">
                    Our Mission & Core Values
                </h3>
                <div className="mb-6">
                    <h4 className="text-xl md:text-2xl font-semibold text-teal-500 mb-3">
                        Our Mission
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                        To provide nutritious meals to individuals and families experiencing
                        food insecurity. To create a sense of community and foster a supportive
                        environment through shared meals and social interactions. To collaborate
                        with other organisations and community stakeholders to address the root
                        causes of food insecurity.
                    </p>
                </div>
                <div>
                    <h4 className="text-xl md:text-2xl font-semibold text-teal-500 mb-3">
                        Our Core Values
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-6">
                        <li><strong>Compassion:</strong> Demonstrating understanding, empathy, and care.</li>
                        <li><strong>Respect:</strong> Treating everyone with dignity.</li>
                        <li><strong>Collaboration:</strong> Working in partnership with others.</li>
                        <li><strong>Integrity:</strong> Upholding honesty and transparency.</li>
                        <li><strong>Empowerment:</strong> Providing resources and support.</li>
                        <li><strong>Advocacy:</strong> Promoting policies for a more equal society.</li>
                        <li><strong>Sustainability:</strong> Minimising waste and promoting environmental responsibility.</li>
                    </ul>
                </div>
            </section>

            <section className="mb-12">
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-teal-600">
                    How Do We Measure Our Impact?
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    We measure our impact through various metrics such as:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-6">
                    <li><strong>Meal Count:</strong> Tracking the number of meals served each week.</li>
                    <li><strong>Volunteer Engagement:</strong> Measuring the participation and feedback of our volunteers.</li>
                    <li><strong>Community Partnerships and Advocacy:</strong> Evaluating collaborations with local government and organisations.</li>
                    <li><strong>Long-term Outcomes:</strong> Monitoring the progress of our service users.</li>
                </ul>
            </section>

            <section className="mb-12">
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-teal-600">
                    Our Team
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            name: 'Dean Foster',
                            role: 'Co-Founder',
                            description: 'Dean Foster, AKA Fos, has left an indelible mark on his local community. His leadership and commitment have made a significant positive impact through Peckham Soup Kitchen.',
                            image: '/images/fos.webp',
                        },
                        {
                            name: 'Junior Mohammed',
                            role: 'Co-Founder',
                            description: 'Junior, known as Jud, has over 15 years of experience as a community support worker. He is dedicated to empowering young minds and creating positive change in the community.',
                            image: '/images/jun.webp',
                        },
                        {
                            name: 'Martine Wright',
                            role: 'General Support',
                            description: 'Martine Wright provides essential support, ensuring the smooth operation of Peckham Soup Kitchen\'s programs and services.',
                            image: '/images/psk.webp',
                        },
                    ].map((member, index) => (
                        <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105 h-full">
                            <div className="mb-4 flex-shrink-0">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={128}
                                    height={128}
                                    className="rounded-full"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <h4 className="text-lg md:text-xl font-bold text-teal-700">{member.name}</h4>
                                <p className="text-teal-500 mb-2">{member.role}</p>
                                <p className="text-gray-600 leading-relaxed text-center">
                                    {member.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Page;
