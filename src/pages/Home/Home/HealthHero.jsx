import React from "react";

const HealthHero = () => {
    return (
        <section className="w-full px-4 py-16">
            <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-r from-teal-500 to-cyan-500">

                {/* Background pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(#ffffff 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                    }}
                />

                {/* Content */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 items-center px-8 md:px-16 py-14">

                    {/* Left Image */}
                    <div className="flex justify-center md:justify-start mb-10 md:mb-0">
                        <img
                            src="/doctor3.webp"
                            alt="Doctor"
                            className="max-h-[420px] object-contain"
                        />
                    </div>

                    {/* Text */}
                    <div className="text-center md:text-left text-white">
                        <h1 className="text-3xl md:text-4xl font-light leading-snug mb-6">
                            Begin your path <br />
                            to better health today
                        </h1>

                        <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
                            Get Started Now
                        </button>
                    </div>
                </div>

                {/* Right floating icons - FIXED */}
                <div className="hidden md:flex flex-col gap-4 fixed right-6 top-1/2 -translate-y-1/2 z-50">
                    <div className="w-11 h-11 bg-teal-500/90 rounded-md flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-teal-600 transition">
                        🛒
                    </div>

                    <div className="w-11 h-11 bg-teal-500/90 rounded-md flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-teal-600 transition">
                        💬
                    </div>

                    <div className="w-11 h-11 bg-teal-500/90 rounded-md flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-teal-600 transition">
                        📅
                    </div>
                </div>


            </div>
        </section>
    );
};

export default HealthHero;
