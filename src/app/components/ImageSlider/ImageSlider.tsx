import React from 'react';
import Image from 'next/image';
// import images from './images.json'; // Importa el JSON con las rutas de las imágenes

const images = [
  { "src": "/img/model.png" },
  { "src": "/images/image1.png" },
  { "src": "/images/image1.png" },
  { "src": "/images/image1.png" },
  { "src": "/images/image1.png" },
]

const ImageSlider = () => {
  return (
    <div className="flex overflow-x-scroll space-x-4 p-4 bg-gray-100 rounded-lg">
      {images.map((image, index) => (
        <div key={index} className="flex-shrink-0 w-64 h-64 relative">
          <Image 
            src={image.src} 
            alt={`Slide ${index + 1}`} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
