import React from 'react';

const PatientsCare = () => {
    return (
        <section className="px-4 md:px-12 lg:px-20 py-10">

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

// import React from "react";
// import { motion } from "framer-motion";

// const containerVariants = {
//     hidden: {},
//     visible: {
//         transition: {
//             staggerChildren: 0.6, // একটার পর একটা আসবে (সময় বাড়ানো হয়েছে)
//             delayChildren: 0.4,
//         },
//     },
// };

// const fadeUp = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//         opacity: 1,
//         y: 0,
//         transition: {
//             duration: 1.2, // animation slow করা হয়েছে
//             ease: "easeOut",
//         },
//     },
// };

// const PatientsCare = () => {
//     return (
//         <section className="px-4 md:px-12 lg:px-20 py-10 bg-white">
//             <div className="flex flex-col lg:flex-row items-center gap-12">

//                 {/* Text Section */}
//                 <motion.div
//                     className="flex-1"
//                     variants={containerVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true }}
//                 >
//                     <motion.h6
//                         variants={fadeUp}
//                         className="text-xs tracking-widest text-gray-500 mb-4"
//                     >
//                         OUR BEGINNINGS
//                     </motion.h6>

//                     <motion.h2
//                         variants={fadeUp}
//                         className="text-3xl md:text-4xl font-semibold leading-snug"
//                     >
//                         <span className="text-blue-600">
//                             Our vision and values:
//                         </span>{" "}
//                         dedicated to caring for our patients with compassion and skill
//                     </motion.h2>

//                     <motion.p
//                         variants={fadeUp}
//                         className="text-gray-600 text-sm md:text-base leading-relaxed max-w-lg mt-2"
//                     >
//                         We deliver trusted healthcare by combining advanced medicine,
//                         patient focus, and a passion for wellness. Our team brings care,
//                         skill, and kindness to every person we help.
//                     </motion.p>
//                 </motion.div>

//                 {/* Image Section */}
//                 <div className="flex-1 w-full">
//                     <img
//                         src="doctor1.webp"
//                         alt="Doctor caring for patient"
//                         className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-md"
//                     />
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default PatientsCare;

