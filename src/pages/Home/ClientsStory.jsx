import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import axios from 'axios';




const ClientsStory = () => {

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/reviews')
            .then(res => {
                setClients(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className='text-center py-10'>Loading...</div>
    }
    return (
        <div className='w-full py-15 bg-gray-50'>
            <h2 className='text-2xl md:text-3xl font-bold text-center mb-10'>
                Our client Stories
            </h2>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                autoplay={
                    {
                        delay: 2500,
                        disableOnInteraction: false,
                    }
                }
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1440: {
                        slidesPerView: 5,
                    }
                }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className='max-w-6xl mx-auto my-7'
            >
                {
                    clients.map((client) =>
                        <SwiperSlide key={client._id} className='!w-[250px] sm:!w-[300px] md:!w-[350px] lg:!w-[400px]'>
                            <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                                <img src={client.image} alt='Client Image' className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover" />
                            </div>
                        </SwiperSlide>
                    )}
            </Swiper>
        </div>
    );
};

export default ClientsStory;