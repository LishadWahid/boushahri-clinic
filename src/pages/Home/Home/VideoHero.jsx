import React from "react";

const VideoHero = () => {
    return (
        <section className="relative w-full h-[600px] overflow-hidden">

            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-auto object-cover brightness-110 sm:brightness-125 contrast-110 saturate-110"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            >
                <source
                    src="https://md.axiomthemes.com/wp-content/uploads/2025/12/new-custom-video-001.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>
        </section>
    );
};

export default VideoHero;
