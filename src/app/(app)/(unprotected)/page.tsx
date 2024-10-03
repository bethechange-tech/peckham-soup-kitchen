'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
  </div>
);

const WelcomeSection = dynamic(() => import('@/components/Welcome-Section'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const ServicesSection = dynamic(() => import('@/components/Services-Section'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const VolunteerSection = dynamic(() => import('@/components/Volunteer-Section'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const UrgentDonationProgramsSection = dynamic(() => import('@/components/Urgent-Donation-Programs-Section'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const LatestVideoSection = dynamic(() => import('@/components/Latest-Video-Section'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const ContactUsSection = dynamic(() => import('@/components/Contact-Us-Section'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});


export default function Home() {
  return (
    <main className="container mx-auto my-8 md:my-16 px-4">
      {/* Welcome Section */}
      <WelcomeSection />

      {/* Our Services Section */}
      <ServicesSection />

      {/* How to Volunteer Section */}
      <VolunteerSection />

      {/* Some Urgent Donation Programs Section */}
      <UrgentDonationProgramsSection />

      {/* Our Latest Video Section */}
      <LatestVideoSection />

      {/* Contact Us Section */}
      <ContactUsSection />
    </main>
  );
}
