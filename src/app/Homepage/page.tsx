import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProductList from '../components/ProductList/ProductList';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 bg-gray-100">
        <div className="flex">
          <aside className="w-1/4 p-4 bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filtros</h2>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Categorías</h3>
              <ul>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Camisas</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Pantalones</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Zapatos</a></li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Precios</h3>
              <ul>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">{"< $50"}</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">$50 - $100</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">$100 - $200</a></li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Colores</h3>
              <ul>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Blanco</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Negro</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900">Azul</a></li>
              </ul>
            </div>
          </aside>
          <section className="w-3/4 p-4">
            <h1 className="text-4xl font-bold text-center text-black mb-10">Bienvenido a nuestra tienda</h1>
            <ProductList />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
