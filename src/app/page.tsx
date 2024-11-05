import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import Footer from "./components/Footer/Footer";
import { FaTruckFast } from "react-icons/fa6";
import { BiSolidDiscount } from "react-icons/bi";
import { MdSupportAgent } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import Sidebar from "./components/Sidebar/Sidebar";
import ProductCard from "./components/Card/ProductCard";




export default function Home() {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <ProductCard />
      <br />
      <ImageSlider />
      <br />
      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

        <div className="flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-blue-700 transform transition duration-500 hover:scale-105 p-6 rounded-md">
          <div className="text-center">

            <FaTruckFast className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Envíos Gratis</p>
          </div>
        </div>


        <div className="flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-blue-700 transform transition duration-500 hover:scale-105 p-6 rounded-md">
          <div className="text-center">

            <BiSolidDiscount className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Cupones de Descuento</p>
          </div>
        </div>


        <div className="flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-blue-700 transform transition duration-500 hover:scale-105 p-6 rounded-md">
          <div className="text-center">
            <MdSupportAgent className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Soporte 24/7</p>
          </div>
        </div>


        <div className="flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-blue-700 transform transition duration-500 hover:scale-105s p-6 rounded-md">
          <div className="text-center">
            <RiSecurePaymentLine className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Pagos Seguros</p>
          </div>
        </div>
        <div className="flex items-center col-span-4 justify-center py-3 tracking-[5px] font-[275]">
          <FaInstagram className="mx-1" />
          <p>SIGUENOS EN <a href="https://www.instagram.com/calvinklein/" className="font-bold ">@KEVKLEIN</a></p>
        </div>

      </div>

      <br />
      <Footer />
    </>
  );
}
