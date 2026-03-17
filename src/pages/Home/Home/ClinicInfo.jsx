import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const ClinicInfo = () => {
    const [newsData, setNewsData] = useState([]);
    const [active, setActive] = useState(0);

    const cardsPerSlide = 3;
    const totalSlides = Math.ceil(newsData.length / cardsPerSlide);

    // Fetch from MongoDB
    useEffect(() => {
        axios
            .get("https://boushahri-clinic.vercel.app/blogs")
            .then((res) => {
                setNewsData(res.data);
            })
            .catch((err) => {
                console.error("Error fetching blogs:", err);
            });
    }, []);

    // Auto slide
    useEffect(() => {
        if (totalSlides === 0) return;

        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [totalSlides]);

    const nextSlide = () => {
        setActive((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setActive((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    return (
        <section className="bg-gray-100 py-16 w-full">

            <div className="w-full px-4 md:px-10 lg:px-16">

                <div className="grid lg:grid-cols-4 gap-8 w-full">

                    {/* LEFT CAROUSEL */}
                    <div className="lg:col-span-3 overflow-hidden relative w-full">

                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-teal-600 text-sm">Latest News</p>
                                <h2 className="text-3xl font-semibold">
                                    Be the first to read
                                </h2>
                            </div>

                            {/* Arrows */}
                            <div className="flex gap-3">
                                <button
                                    onClick={prevSlide}
                                    className="bg-white shadow p-2 rounded-full border hover:bg-gray-200 transition"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <button
                                    onClick={nextSlide}
                                    className="bg-white shadow p-2 rounded-full border hover:bg-gray-200 transition"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Carousel */}
                        <div
                            className="flex transition-transform duration-500 ease-in-out mt-10"
                            style={{
                                transform: `translateX(-${active * 100}%)`
                            }}
                        >
                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {newsData
                                        .slice(
                                            slideIndex * cardsPerSlide,
                                            slideIndex * cardsPerSlide + cardsPerSlide
                                        )
                                        .map((item) => (
                                            <div
                                                key={item._id}
                                                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group"
                                            >
                                                <div className="overflow-hidden">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                                                    />
                                                </div>

                                                <div className="p-4">
                                                    <p className="text-sm text-gray-500">
                                                        {item.date}
                                                    </p>

                                                    <h3 className="text-lg font-semibold mt-2 group-hover:text-teal-600 transition cursor-pointer">
                                                        {item.title}
                                                    </h3>

                                                    <p className="text-gray-600 text-sm mt-2">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT STATIC IMAGE */}
                    <div className="relative h-[450px] w-full rounded-lg overflow-hidden shadow-lg">
                        <img
                            src="https://i.ibb.co/HDYkh6pZ/Laser-4.webp"
                            alt="Health Insurance"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute bottom-6 left-6 text-white z-10">
                            <h3 className="text-2xl font-semibold">
                                Health Insurance
                            </h3>
                            <p className="text-sm mt-2">
                                Medcenter with individual approach
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ClinicInfo;
