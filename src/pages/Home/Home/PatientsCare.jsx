import React from 'react';

const PatientsCare = () => {
    return (
        // <div>
        //     <h6 className="text-xs tracking-widest text-gray-500 mb-4">OUR BEGINNINGS</h6>
        //     <div className='flex '>
        //         <p className='text-4xl'><span className='text-blue-500'>Our vision and values:</span> dedicated to caring for our patients with compassion and skill</p>
        //         <p className='mt-40 my-10 text-sm'>We deliver trusted healthcare by combining advanced medicine, patient focus, and a passion for wellness. Our team brings care, skill, and kindness to every person we help.</p>
        //     </div>
        //     <div>
        //         <img src="doctor1.webp" alt="" />
        //     </div>
        // </div>
        <section className="px-4 md:px-12 lg:px-20 py-16 bg-white">

            {/* Content */}
            <div className="flex flex-col lg:flex-row items-center gap-12">

                {/* Text Section */}
                <div className="flex-1">
                    <h6 className="text-xs tracking-widest text-gray-500 mb-4">
                        OUR BEGINNINGS
                    </h6>
                    <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
                        <span className="text-blue-600">
                            Our vision and values:
                        </span>{" "}
                        dedicated to caring for our patients with compassion and skill
                    </h2>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-lg mt-2">
                        We deliver trusted healthcare by combining advanced medicine,
                        patient focus, and a passion for wellness. Our team brings care,
                        skill, and kindness to every person we help.
                    </p>
                </div>

                {/* Image Section */}
                <div className="flex-1 w-full">
                    <img
                        src="doctor1.webp"
                        alt="Doctor caring for patient"
                        className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-md"
                    />
                </div>

            </div>
        </section>
    );
};

export default PatientsCare;