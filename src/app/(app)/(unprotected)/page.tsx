'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main className="container mx-auto my-8 md:my-16 px-4">
        {/* Welcome Section */}
        <section className="text-center bg-green-100 p-6 md:p-10 rounded-lg shadow-md mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Welcome To Peckham Soup Kitchen
          </h2>
          <p className="text-green-600 mb-6 max-w-2xl mx-auto">
            At Peckham Soup Kitchen, we work continuously to support members of the
            Southwark community in need and empower them to improve their lives and
            wellbeing.
          </p>
          <button className="hero-button bg-green-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full shadow-md transform transition duration-300 ease-in-out hover:bg-green-700 hover:-translate-y-1">
            Get Started
          </button>
        </section>

        {/* Our Services Section */}
        <section className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div
              className="relative bg-cover bg-center bg-no-repeat p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
              style={{ backgroundImage: "url('/images/friday-food-hub.png')" }}
            >
              <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
              <div className="relative z-10 text-left">
                <div className="flex items-center justify-center h-12 w-12 bg-purple-800 bg-opacity-75 rounded-full mb-4">
                  <Image
                    src="/icons/friday-food-hub-icon.png"
                    alt="Friday Food Hub Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                  Friday Food Hub
                </h3>
                <p className="text-gray-200 mb-4">
                  Open Food Provision for the Southwark Community at Dene Community Centre
                  <br />
                  <strong>Every Friday from 3:30PM till 7:30PM</strong>
                </p>
              </div>
            </div>
            <div
              className="relative bg-cover bg-center bg-no-repeat p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
              style={{ backgroundImage: "url('/images/wednesday-food-outreach.jpeg')" }}
            >
              <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
              <div className="relative z-10 text-left">
                <div className="flex items-center justify-center h-12 w-12 bg-green-800 bg-opacity-75 rounded-full mb-4">
                  <Image
                    src="/icons/wednesday-food-outreach-icon.png"
                    alt="Wednesday Food Outreach Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                  Wednesday Food Outreach
                </h3>
                <p className="text-gray-200 mb-4">
                  Food Deliveries to Vulnerable Members of the Southwark Community
                  <br />
                  <strong>Every Wednesday from 3:30PM till 5:00PM</strong>
                </p>
              </div>
            </div>
            <div
              className="relative bg-cover bg-center bg-no-repeat p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
              style={{ backgroundImage: "url('/images/initiatives.png')" }}
            >
              <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
              <div className="relative z-10 text-left">
                <div className="flex items-center justify-center h-12 w-12 bg-pink-800 bg-opacity-75 rounded-full mb-4">
                  <Image
                    src="/icons/initiatives-icon.png"
                    alt="Initiatives Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                  Initiatives
                </h3>
                <p className="text-gray-200 mb-4">
                  <strong>Be Active Programme:</strong> March - May 2023
                  <br />
                  <br />
                  <strong>Summer Football Camp:</strong> 21st - 25th August 2023
                  <br />
                  <br />
                  <strong>Back to School Drive:</strong> 26th August 2023
                  <br />
                  <br />
                  <strong>Mentoring for Young People:</strong> Ongoing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Volunteer Section */}
        <section className="mb-8 md:mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-8">
            How to Volunteer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Meal Preparation",
                description: "Assist in preparing nutritious meals for our community members. Help us cook and package meals every weekday.",
                icon: "/icons/meal-preparation.png", // Replace with actual icon paths
              },
              {
                title: "Food Distribution",
                description: "Help distribute food packages to those in need. Join us in making a difference every Friday and Saturday.",
                icon: "/icons/food-distribution.png",
              },
              {
                title: "Outreach Programs",
                description: "Participate in outreach programs to connect with and support the community. Engage in activities to promote health and wellness.",
                icon: "/icons/outreach.png",
              },
              {
                title: "Fundraising",
                description: "Contribute to our fundraising efforts. Help us organize events and campaigns to raise funds for our initiatives.",
                icon: "/icons/fundraising.png",
              },
              {
                title: "Mentorship",
                description: "Become a mentor to young people in our community. Share your skills and experiences to guide and inspire.",
                icon: "/icons/mentorship.png",
              },
              {
                title: "Administrative Support",
                description: "Assist with administrative tasks, including scheduling, communications, and organizing events. Help us run smoothly.",
                icon: "/icons/admin-support.png",
              },
            ].map((volunteer, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col items-center"
              >
                <img
                  src={volunteer.icon}
                  alt={`${volunteer.title} Icon`}
                  className="mb-4 h-16 w-16"
                />
                <h4 className="text-xl md:text-2xl font-bold mb-2 text-green-700">
                  {volunteer.title}
                </h4>
                <p className="text-gray-600 text-center">{volunteer.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#" className="inline-block bg-green-600 text-white px-6 py-3 rounded-full shadow-md transform transition duration-300 ease-in-out hover:bg-green-700 hover:-translate-y-1">
              Get Involved
            </a>
          </div>
        </section>


        {/* Some Urgent Donation Programs Section */}
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
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">
                    {program.title}
                  </h4>
                  <p className="text-gray-700 mb-4">
                    {program.description}
                  </p>
                  <button className="inline-block bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Latest Video Section */}
        <section className="mb-8 md:mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-8">
            Our Latest Video
          </h3>
          <div className="mb-4 mx-auto" style={{ maxWidth: '90%', height: 0, paddingBottom: '56.25%', position: 'relative' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            />
          </div>
          <p className="text-gray-600 text-center">
            Check out our latest video about the impact of your donations.
          </p>
        </section>

        {/* Contact Us Section */}
        <section className="bg-gradient-to-r from-green-400 to-green-500 p-6 md:p-10 rounded-lg shadow-md mb-8 md:mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 md:mb-8">
            Get in Touch
          </h3>
          <form className="max-w-xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg">
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
                className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Your Name"
              />
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
                className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Your Email"
              />
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
                className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Your Message"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-full shadow-md transform transition duration-300 ease-in-out hover:bg-green-700 hover:-translate-y-1"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
