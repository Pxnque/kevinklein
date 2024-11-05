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
    <div className="flex justify-center my-8">
      <div className="flex space-x-4 overflow-hidden" style={{ width: '80%' }}>
        {visibleImages.map((image, index) => (
          <div
            key={index}
            className="w-1/3 flex-shrink-0 h-80 relative"
          >
            <Image
              src={image.src}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md border-2 border-cyan-900"
            />
          </div>
        ))}
      </div>
      {/* Opcional: Indicadores */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${index === startIndex ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ImageSlider;
