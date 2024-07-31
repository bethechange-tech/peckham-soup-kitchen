import React from 'react';
import Image from 'next/image';

const VolunteerSection = () => {
  return (
    <section className="mb-8 md:mb-16">
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-8">
        How to Volunteer
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[
          {
            title: "Meal Preparation",
            description: "Assist in preparing nutritious meals for our community members. Help us cook and package meals every weekday.",
            icon: "/icons/meal-preparation.png",
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
            <div className="mb-4 h-16 w-16 relative">
              <Image
                src={volunteer.icon}
                alt={`${volunteer.title} Icon`}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h4 className="text-xl md:text-2xl font-bold mb-2 text-teal-700">
              {volunteer.title}
            </h4>
            <p className="text-gray-600 text-center">{volunteer.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="#" className="inline-block bg-teal-600 text-white px-6 py-3 rounded-full shadow-md transform transition duration-300 ease-in-out hover:bg-teal-700 hover:-translate-y-1">
          Get Involved
        </a>
      </div>
    </section>
  )
}

export default VolunteerSection