import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';


// import required modules
import { EffectCreative } from 'swiper/modules';
import { Html } from '@react-three/drei';

export default function CarouselMobile({data}) {
	console.log(data);
  return (
    <div className='h-full'>
      <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative]}
        className="mySwiper3 w-2 scale-in-center"
      >
		{data.map((project, index) => {
			return(
				<SwiperSlide key={index}><img className='w-full h-full ' src={project.image}></img></SwiperSlide>
			)
			
		})}
        
      </Swiper>
     
    </div>
  );
}
