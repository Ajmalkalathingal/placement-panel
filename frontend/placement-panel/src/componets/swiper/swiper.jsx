import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';
export default function SwiperComponent() {
  const students = [
    { imgSrc: "src/assets/2024 placements/1.png" },
    { imgSrc: "src/assets/2024 placements/2.png" },
    { imgSrc: "src/assets/2024 placements/3.png" },
    { imgSrc: "src/assets/2024 placements/4.png" },
    { imgSrc: "src/assets/2024 placements/5.png" },
    { imgSrc: "src/assets/2024 placements/1.png" },
    { imgSrc: "src/assets/2024 placements/2.png" },
    { imgSrc: "src/assets/2024 placements/3.png" },
    { imgSrc: "src/assets/2024 placements/4.png" },
    { imgSrc: "src/assets/2024 placements/5.png" },
    { imgSrc: "src/assets/2024 placements/1.png" },
    { imgSrc: "src/assets/2024 placements/2.png" },
    { imgSrc: "src/assets/2024 placements/3.png" },
    { imgSrc: "src/assets/2024 placements/4.png" },
    { imgSrc: "src/assets/2024 placements/5.png" },
  ];

  useEffect(() => {
    // Ensure Swiper is initialized properly when the component mounts
    const swiper = document.querySelector('swiper-container');
    if (swiper) {
      swiper.initialize();
    }
  }, []);

  return (

        <main>
          <Swiper
            // pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {students.map((stu, index) => (
              <SwiperSlide key={index}>
                <img
                  src={stu.imgSrc}
                  alt={`student-${index}`}
                  style={{
                    height: 'auto',
                    maxWidth: '100%',
                    objectFit: 'cover',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </main>
      );
    };
    
