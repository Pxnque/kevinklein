"use client"; 
import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProductList from '../components/ProductList/ProductList';
import Image from 'next/image';
import gridIcon from '../Img/Grid.png';
import listIcon from '../Img/list.png';
import Sidebar from '../components/Sidebar/Sidebar';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 bg-gray-100">
        <div className="flex">
          <aside className="w-1/4 p-4">
            
            {/* Contenido de los filtros */}
            <Sidebar />
          </aside>
          <section className="w-3/4 p-4">
            
            {/* Barra de cantidad, orden y vista */}
            <div className="flex justify-between items-center p-4 bg-white shadow-md mb-6">
              <div className="flex items-center">
                <label htmlFor="cantidad" className="mr-2 text-gray-500">Cantidad:</label>
                <select id="cantidad" className="border border-gray-300 p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md bg-gray-100">
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              <div className="flex items-center">
                <label htmlFor="ordenar" className="mr-2 text-gray-500">Ordenar por:</label>
                <select id="ordenar" className="border border-gray-300 p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md bg-gray-100">
                  <option value="default">Default</option>
                  <option value="price-asc">Precio (ascendente)</option>
                  <option value="price-desc">Precio (descendente)</option>
                  <option value="rating">Mejor calificado</option>
                </select>
              </div>

              {/* Botones de vista */}
              <div className="flex items-center">
                <button className="mr-2 p-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-300">
                  <Image
                    src={gridIcon}
                    alt="Grid View"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </button>
                <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-300">
                  <Image
                    src={listIcon}
                    alt="List View"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </button>
              </div>

              <p className="text-gray-500">Mostrando 1 - 12 de 36</p>
            </div>

            <ProductList />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
