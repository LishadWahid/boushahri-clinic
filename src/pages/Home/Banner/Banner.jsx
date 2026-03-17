import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { motion, AnimatePresence } from 'framer-motion';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from 'react-router';

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://boushahri-clinic.vercel.app/banners')
            .then(res => {
                setBanners(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching banners:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className='text-center py-10'>Loading...</div>
    }

    return (
        <div className='w-full'>
            <Carousel
                autoPlay
                infiniteLoop
                showIndicators
                showThumbs={false}
                showStatus={false}
                interval={5000}
                swipeable
                emulateTouch
                onChange={(index) => setCurrentSlide(index)}
            >
                {banners.map((banner, index) => (
                    <div
                        key={banner._id}
                        className='
                            h-[180px] 
                            sm:h-[350px] 
                            md:h-[450px] 
                            lg:h-[550px] 
                            xl:h-[550px]
                            2xl:h-[710px]
                            relative
                        '
                    >
                        {/* Image */}
                        <img
                            src={banner.image}
                            alt="banner"
                            className='w-full h-full object-cover'
                        />

                        {/* Dark overlay */}
                        <div className='absolute inset-0 bg-black/10'></div>

                        {/* Animated Text */}
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full px-1 sm:px-6 md:px-20'>
                                <div className='max-w-sm sm:max-w-lg text-left text-white'>

                                    <AnimatePresence mode="wait">
                                        {currentSlide === index && (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: 200 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -200 }}
                                                transition={{
                                                    duration: 1.2,
                                                    ease: "easeOut"
                                                }}
                                            >

                                                <div className='flex flex-col gap-1 sm:gap-6 ml-5 sm:ml-30'>

                                                    <div>
                                                        {/* Small Top Text */}
                                                        <motion.p
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.3, duration: 1 }}
                                                            className='text-[10px] sm:text-[12px] md:text-[12px] text-blue/50 tracking-wide font-light mb-2.5'
                                                        >
                                                            {banner.title}
                                                        </motion.p>

                                                        {/* Main Heading */}
                                                        <motion.h1
                                                            initial={{ opacity: 0, y: 40 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.6, duration: 1 }}
                                                            className='text-sm sm:text-md md:text-xl font-semibold leading-tight md:leading-snug mb-2'
                                                        >
                                                            {banner.description}
                                                        </motion.h1>
                                                    </div>

                                                    {/* Buttons */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.9, duration: 1 }}
                                                        className='flex flex-wrap gap-5 pt-2'
                                                    >
                                                        <button onClick={() => navigate('/consultation')} className='bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-3 text-[10px] sm:text-sm md:text-[12px] rounded-md font-medium transition-all duration-300 shadow-lg'>
                                                            {banner.buttonText}
                                                        </button>

                                                        <button className='border border-white px-4 sm:px-6 py-3 text-[10px] sm:text-sm md:text-[12px] rounded-md hover:bg-white hover:text-black transition-all duration-300'>
                                                            Learn More
                                                        </button>
                                                    </motion.div>

                                                </div>

                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
