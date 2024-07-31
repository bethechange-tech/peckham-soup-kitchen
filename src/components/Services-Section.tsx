import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { services } from '@/lib/data';

const ServicesSection = () => {
    return (
        <section className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8">
                Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className="relative bg-cover bg-center bg-no-repeat p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300"
                        style={{ backgroundImage: `url('${service.image}')` }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
                        <div className="relative z-10 text-left">
                            <div className="flex items-center justify-center h-12 w-12 bg-teal-800 bg-opacity-75 rounded-full mb-4">
                                <Image
                                    src={service.icon}
                                    alt={`${service.title} Icon`}
                                    width={24}
                                    height={24}
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                                {service.title}
                            </h3>
                            <p className="text-gray-200 mb-4">{service.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default ServicesSection