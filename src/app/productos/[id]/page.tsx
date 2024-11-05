"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import hombre1 from '../hombre1.png';
import hombre2 from '../hombre2.png';
import hombre3 from '../hombre3.png';
import hombre4 from '../hombre4.png';
import Slider from '@/app/components/Slider/Slider';

interface FAQItem {
    question: string;
    answer: JSX.Element;
  }

const page = () => {
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

    const toggleContent = (index: number) => {
      setExpandedIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    
    };
    const maria = hombre1;
    const [mainImage, setMainImage] = useState<typeof hombre1>(maria);
    const [visibleThumbnails, setVisibleThumbnails] = useState<number>(5);
    useEffect(() => {
      const updateVisibleThumbnails = () => {
          if (window.innerWidth >= 1516) {
              setVisibleThumbnails(5); 
          } else if (window.innerWidth > 768) {
              setVisibleThumbnails(4); 
          } else{
              setVisibleThumbnails(4); 
          }
      };

      updateVisibleThumbnails();
      window.addEventListener('resize', updateVisibleThumbnails);

      return () => {
          window.removeEventListener('resize', updateVisibleThumbnails);
      };
  }, []);

    
    const thumbnails: string[] = [
        "/img/hombre1.png", 
        "/img/hombre2.png", 
        "/img/hombre3.png", 
        "/img/hombre4.png", 
        "/img/hombre1.png"  
    ];
    const Miniatura =[
      {id:1, img:hombre1},
      {id:2, img:hombre2},
      {id:3, img:hombre3},
      {id:4, img:hombre4},
      {id:5, img:hombre1}
    ]
    const faqData: FAQItem[] = [
        {
          question: "Descripción",
          answer: (
            <>
              <p>
                Aqui ira de nuevo la descripción del producto??. no lo se, se repite con lo de arriba, preguntar a mike
              </p>
             
            </>
          ),
        },
        {
          question: "Información",
          answer: (
            <>
              <p>Aqui ira informacion de algo, de que no se, del producto?, del material?. Que podra venir aqui que sea diferente a la descripción. Preguntar a mike</p>
              
            </>
          ),
        },
        {
          question: "Reviews",
          answer: (
            <>
              <p>Mmmm no se como hariamos este dropdown. Poner todas las reviews???, no creo que quepan todas, este sera el mas dificil sin duda... Que miedo</p>
            </>
          ),
        },
    ];
  return (
    <>
            <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-4 max-w-full">
                <div className="aspect-w-1 aspect-h-1">
                    <Image src={mainImage} alt="Product Image" className="w-full h-1/4 object-cover rounded-lg" />
                </div>
                
                <div className="flex sm:space-x-10 md:space-x-7 xl:space-x-10 2xl:space-x-6 w-full">
                {Miniatura.slice(0, visibleThumbnails).map((thumbnail, index) => (
                        <Image
                            key={index}
                            src={thumbnail.img}
                            alt={`Thumbnail ${index + 1}`}
                            width={200}
                            height={200}
                            onClick={() => setMainImage(thumbnail.img)}
                            className={`sm:w-1/5 md:w-1/5 lg:w-25 lg:h-32 object-cover rounded-lg cursor-pointer ${mainImage === thumbnail ? 'border-2 border-blue-600' : ''}`}
                        />
                    ))} 
                </div>
            </div>

           
            <div>
                <p className='text-base font-normal pb-3'>Inicio / Hombre</p>
                <h2 className="text-3xl font-black mb-2">PLAYERA DEPORTIVA</h2>
                <div className="flex items-center pb-4">
                <p className="text-xl text-gray-600 pr-4">$1200.00</p>
                    <svg className="w-4 h-4 text-black ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg className="w-4 h-4 text-black ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg className="w-4 h-4 text-black ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg className="w-4 h-4 text-black ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                </div>

                <p className="mb-6 text-gray-500">Our Shop is a very slick and clean e-Our Theme is a very slick and clean e-commerce template with endless possibilities. Creating an awesome website with this Theme is easy than you can imagine. Our Theme is a very slick and clean e-commerce template with endless possibilities.</p>

                
                <div className="mb-4">
                    <div className="flex space-x-2">
                        <h4 className="font-semibold text-gray-700 mt-2">Color:</h4>
                        <div className="w-8 h-8  bg-blue-600 cursor-pointer border-2 border-gray-300"></div>
                        <div className="w-8 h-8  bg-black cursor-pointer border-2 border-gray-300"></div>
                        <div className="w-8 h-8  bg-gray-400 cursor-pointer border-2 border-gray-300"></div>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex space-x-2">
                        <h4 className="font-semibold text-gray-700 mt-4">Talla:</h4>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 ">XS</button>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 ">S</button>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 ">M</button>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 ">L</button>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-200 bg-gray-200 text-gray-400">XL</button>
                    </div>
                </div>

              
                <div className="flex items-center space-x-4 mb-6">
                    <label id="quantity" className="font-semibold text-gray-700 mt-3">Cantidad:</label>
                    <input type="number" id="quantity" name="quantity" min="1" value="1" className="w-16 border border-gray-300 rounded-md p-2 text-center"/>
                    <button className="bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-900">AGREGAR AL CARRITO</button>
                    <button className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-200 bg-white rounded-md">
                        <FaHeart className='h-6 w-6 text-gray-400'/>
                    </button>
                </div>

               
                <div className="text-sm text-black mb-6">
                    <p className='py-1'><strong className='text-[#A5A5A5] font-normal '>SKU:</strong> 111763</p>
                    <p className='py-1'><strong className='text-[#A5A5A5] font-normal'>Category:</strong> Men T-shirt</p>
                    <p className='py-1'><strong className='text-[#A5A5A5] font-normal'>Tags:</strong> Sport, T-shirt, Blue</p>
                </div>

                
                <div className="space-y-4">
                <ul>
            {faqData.map((faq, index) => (
              <li
                key={index}
                className="py-4 px-2 border-2 border-gray-200 transition-colors duration-100 mb-4"
              >
                
                <a
                  className={`cursor-pointer uppercase font-bold size-5 hover:underline tracking-[3px] font-montserrat ${
                    expandedIndices.includes(index) ? 'text-[#173C86]' : 'text-black'
                  }`}
                  onClick={() => toggleContent(index)}
                >
                  {faq.question}
                </a>
                <div
                  className={`text-xs transition-all duration-500 ease-in-out overflow-hidden ${
                    expandedIndices.includes(index) ? 'max-h-[500px] opacity-100 pt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  {faq.answer}
                </div>
              </li>
              
            ))}
          </ul>
                </div>
            </div>
        </div>
        <Slider />
    </>
  )
}

export default page