import React, { useEffect } from 'react';

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
      <swiper-container
        pagination="true" 
        breakpoints={JSON.stringify({
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        })}
      >
        {students.map((stu, index) => (
          <swiper-slide key={index}>
            <img src={stu.imgSrc} alt={`student-${index}`} style={{ height: '300px' }} />
          </swiper-slide>
        ))}
      </swiper-container>
    </main>
  );
}
