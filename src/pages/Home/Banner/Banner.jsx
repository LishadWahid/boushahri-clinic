import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
        >
            <div>
                <img src="https://i.ibb.co/yFN31fth/6-1.webp" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src="https://i.ibb.co/KzQVQ7XW/7-1.webp" />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src="https://i.ibb.co/KzQVQ7XW/7-1.webp" />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    );
};

export default Banner;