import React from 'react'

const LatestVideoSection = () => {
    return (
        <section className="mb-8 md:mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-8">
                Our Latest Video
            </h3>
            <div className="mb-4 mx-auto" style={{ maxWidth: '90%', height: 0, paddingBottom: '56.25%', position: 'relative' }}>
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/1kcLo91Qkcc"
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

    )
}

export default LatestVideoSection