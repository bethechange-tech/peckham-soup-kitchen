'use client';
import dynamic from 'next/dynamic';

const WelcomeSection = dynamic(() => import('@/components/Welcome-Section'));
const ServicesSection = dynamic(() => import('@/components/Services-Section'));
const VolunteerSection = dynamic(() => import('@/components/Volunteer-Section'));
const UrgentDonationProgramsSection = dynamic(() => import('@/components/Urgent-Donation-Programs-Section'));
const LatestVideoSection = dynamic(() => import('@/components/Latest-Video-Section'));
const ContactUsSection = dynamic(() => import('@/components/Contact-Us-Section'));

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
