import React, { useEffect, useState } from "react";

const slides = [
    {
        image: "https://i.ibb.co/HfjG9Kn5/Skin-W-3.webp",
    },
    {
        image: "https://i.ibb.co/tTkKtgBH/Skin-M-4.webp",
    },
    {
        image: "https://i.ibb.co/HDYkh6pZ/Laser-4.webp",
    },
];

const ClinicInfo = () => {
    const [active, setActive] = useState(0);

    // Auto-slide every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative bg-[#f7f5f2] py-16 sm:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* LEFT: Image Carousel */}
                    <div
                        className="
                        relative
                        max-w-[580px] 
                        sm:max-w-[560px] 
                        md:max-w-[600px] 
                        lg:max-w-[520px] 
                        xl:max-w-[560px]
                        mx-auto"
                    >
                        <div className="overflow-hidden rounded-2xl shadow-xl">
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${active * 100}%)` }}
                            >
                                {slides.map((slide, i) => (
                                    <img
                                        key={i}
                                        src={slide.image}
                                        alt={`Clinic slide ${i + 1}`}
                                        className="
                                        w-full 
                                        h-[200px] sm:h-[300px] md:h-[420px] lg:h-[560px] xl:h-[620px]
                                        object-cover
                                        flex-shrink-0"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Dots */}
                        <div className="flex justify-center gap-3 mt-6">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={`w-3 h-3 rounded-full transition-transform duration-300 ${active === i ? "bg-black scale-125" : "bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Text Content */}
                    <div className="px-2 sm:px-0 max-w-xl mx-auto lg:mx-0">
                        <p className="uppercase text-xs tracking-widest text-[#9a8365] mb-4">
                            Welcome to our clinic!
                        </p>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-semibold text-gray-900 leading-tight mb-6">
                            Extensive Procedures <br />
                            to Our Patients.
                        </h2>

                        <p className="text-gray-600 leading-relaxed mb-8 text-base sm:text-lg">
                            Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                            Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                            <br />
                            <br />
                            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                            Nullam dictum felis eu pede mollis pretium.
                        </p>

                        <button className="
                                group inline-flex items-center gap-4 border border-[#9a8365]
                                px-6 py-3 text-sm uppercase tracking-widest
                                text-[#9a8365] hover:bg-[#9a8365]
                                hover:text-white transition
                                rounded">
                            More About Us
                            <span className="
                            w-8 h-8 flex items-center justify-center rounded-full
                            border border-[#9a8365]
                            group-hover:bg-white
                            group-hover:text-[#9a8365] transition">
                                →
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ClinicInfo;
