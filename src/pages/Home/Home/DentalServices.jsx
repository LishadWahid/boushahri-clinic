import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const DentalServices = () => {

    const [service, setService] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://boushahri-clinic.vercel.app/services')
            .then(res => {
                setService(res.data);
                console.log('Api Response:', res.data);
            })
            .catch(error => {
                console.error('Error fetching services:', error);
            });
    }, []);

    // Card change
    useEffect(() => {
        if (service.length === 0) return;

        const interval = setInterval(() => {
            setStartIndex(prev => prev + 2 < service.length ? prev + 1 : 0);
        }, 4000);
        return () => clearInterval(interval);
    }, [service]);

    // Only show 2 cards
    const visibleServices = service.slice(startIndex, startIndex + 2);

    return (
        <section className="relative bg-gray-100 py-20 px-6 lg:px-25 mt-10 overflow-hidden">

            {/* Left Side Dot Grid */}
            <div className="hidden lg:grid grid-cols-6 gap-4 absolute left-10 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none">
                {[...Array(36)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 h-2 bg-gray-300 rounded-full"
                    ></div>
                ))}
            </div>

            <div className="max-w-full mx-auto grid lg:grid-cols-3 gap-10 items-start">

                {/* Left Content */}
                <div className="space-y-6">
                    <h2 className="text-4xl lg:text-5xl font-semibold text-gray-800 leading-tight">
                        Dental Services <br />
                        That You Can <br />
                        Rely On
                    </h2>

                    <p className="text-gray-500 max-w-sm">
                        General dentistry incorporates a broad range of diseases and disorders
                    </p>

                    <button className="bg-indigo-700 text-white px-6 py-3 rounded-md hover:bg-indigo-800 transition">
                        More Services
                    </button>
                </div>

                {/* Card 2 */}

                {
                    visibleServices.map(service => (
                        <div key={service._id}
                            onClick={() => navigate(`/services/${service._id}`)}
                            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition h-[420px] flex flex-col relative z-10">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-60 object-cover"
                            />
                            <div className="p-6 space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {service.details}
                                </p>
                                <button className="text-indigo-700 font-medium hover:underline">
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            {/* Right Side Dot Grid */}
            <div className="hidden lg:grid grid-cols-6 gap-4 absolute right-9 top-2/3 -translate-y-1/2 opacity-20 pointer-events-none z-0">
                {[...Array(36)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                    ></div>
                ))}
            </div>

        </section>
    );
};

export default DentalServices;
