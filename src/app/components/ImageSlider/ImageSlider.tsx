"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import img1 from '@/app/public/img/jacket.png';
import img2 from '@/app/public/img/watch.png';
import img3 from '@/app/public/img/shoes.png';
import img4 from '@/app/public/img/glasses.png';
import img5 from '@/app/public/img/red_glasses.png';
import img6 from '@/app/public/img/black_glasses.png';

const images = [
  { "src": img1 },
  { "src": img4 },
  { "src": img2 },
  { "src": img5 },
  { "src": img3 },
  { "src": img6 },
]

const ImageSlider = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  // Obtén las tres imágenes actuales en el orden correcto
  const visibleImages = [
    images[startIndex],
    images[(startIndex + 1) % images.length],
    images[(startIndex + 2) % images.length]
  ];

  return (
    <div className="my-8 px-4 sm:px-8 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleImages.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-60 sm:h-80 lg:h-96"
          >
            <Image
              src={image.src}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
