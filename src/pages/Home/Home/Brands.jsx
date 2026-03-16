import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import A from '../../../assets/A.webp';
import B from '../../../assets/B.webp';
import C from '../../../assets/C.png';
import D from '../../../assets/D.webp';
import E from '../../../assets/E.jpg';
import F from '../../../assets/F.avif';
import G from '../../../assets/G.png';
import H from '../../../assets/H.avif';
import I from '../../../assets/I.jpg';
import J from '../../../assets/J.png';
import L from '../../../assets/L.jpg';
import N from '../../../assets/N.png';
import O from '../../../assets/O.png';
import { Autoplay } from 'swiper/modules';

const brandLogos = [A, B, C, D, E, F, G, H, I, J, L, N, O];

const Brands = () => {
    return (
        <Swiper
            loop={true}
            slidesPerView={6}
            centeredSlides={true}
            spaceBetween={20}
            grabCursor={true}
            modules={[Autoplay]}
            autoplay={{
                delay:2500,
                disableOnInteraction: false,
            }} 
            className='mb-10 flex justify-center items-center'
            >
            {
                brandLogos.map((logo, index) => <SwiperSlide key={index}><img src={logo} alt="brand logo" className='w-[180px] h-[150px] object-contain mt-10'/></SwiperSlide>)
            }
        </Swiper>
    );
};

export default Brands;