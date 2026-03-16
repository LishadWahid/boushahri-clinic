import React from 'react';

const MordernHealthcare = () => {
    return (
        <div className="py-16">
            <div className="max-w-full mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Card */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
                    <div className="flex justify-center mb-6">
                        <img src="/doctor4.png" alt="Doctor" className="w-20 h-20 object-contain" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        Primary Care Focus
                    </h2>
                    <p className="text-gray-500 leading-relaxed">
                        Our team delivers quality healthcare with a personal and compassionate approach.
                    </p>
                </div>

                {/* Repeat same card */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
                    <div className="flex justify-center mb-6">
                        <img src="/doctor4.png" alt="Doctor" className="w-20 h-20 object-contain" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        Expert Doctors
                    </h2>
                    <p className="text-gray-500 leading-relaxed">
                        Highly experienced medical professionals dedicated to patient wellbeing.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
                    <div className="flex justify-center mb-6">
                        <img src="/doctor4.png" alt="Doctor" className="w-20 h-20 object-contain" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        24/7 Support
                    </h2>
                    <p className="text-gray-500 leading-relaxed">
                        Round-the-clock healthcare services to ensure your safety and comfort.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
                    <div className="flex justify-center mb-6">
                        <img src="/doctor4.png" alt="Doctor" className="w-20 h-20 object-contain" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        Modern Equipment
                    </h2>
                    <p className="text-gray-500 leading-relaxed">
                        Advanced medical technology ensuring accurate diagnosis and treatment.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default MordernHealthcare;