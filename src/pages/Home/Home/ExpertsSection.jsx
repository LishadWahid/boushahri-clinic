import React from "react";

const ExpertsSection = () => {
    return (
        <section className="bg-white py-20">
            {/* Heading */}
            <div className="text-center mb-14">
                <p className="uppercase tracking-widest text-xs text-gray-500 mb-3">
                    Meet our trusted care experts
                </p>
                <h2 className="text-4xl font-light text-gray-800">
                    Discover expert{" "}
                    <span className="text-teal-500 font-normal">
                        healthcare professionals
                    </span>
                </h2>
            </div>

            {/* Cards */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Card 1 */}
                <div className="text-center">
                    <div className="overflow-hidden rounded-3xl mb-6">
                        <img
                            src="/doctor1.webp"
                            alt="Dr. Michael Evans"
                            className="w-full h-[380px] object-cover"
                        />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">
                        Dr. Michael Evans
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Lead Medical Director
                    </p>
                </div>

                {/* Card 2 */}
                <div className="text-center">
                    <div className="overflow-hidden rounded-3xl mb-6">
                        <img
                            src="/doctor2.webp"
                            alt="Dr. Olivia Bennett"
                            className="w-full h-[380px] object-cover"
                        />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">
                        Dr. Olivia Bennett
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Head of Patient Care
                    </p>
                </div>

                {/* Card 3 */}
                <div className="text-center">
                    <div className="overflow-hidden rounded-3xl mb-6">
                        <img
                            src="/doctor3.webp"
                            alt="Dr. Ethan Brooks"
                            className="w-full h-[380px] object-cover"
                        />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">
                        Dr. Ethan Brooks
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Director of Wellness
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ExpertsSection;
