"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation"; // To fetch params dynamically in a client component
import { FaHeart } from "react-icons/fa";
import Slider from "@/app/components/Slider/Slider";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import Chatbot from "@/app/components/Chatbot/Chatbot";
import PocketBase from "pocketbase";
import { useRouter } from 'next/navigation';
import ProductReviews from "@/app/components/ProductReviews/review";

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  descuento: number;
  fotos: string[];
  tallas: string[];
  cantidad: number;
  id_categoria: string;
  expand: {
    id_categoria: {
      nombre: string;
      gender: string;
    };
  };
}

interface Review {
  user_id: string;
  user_name: string;
  user_photo: string | null;
  rating: number;
  comment: string;
  review_date: string;
}

const ProductPage = () => {
  const params = useParams(); // Dynamically fetch route params
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]); // Estado para almacenar las reseñas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0); // Track selected thumbnail
  const [selectedTalla, setSelectedTalla] = useState<string | null>(null);

  const conDescuento = product ? product.precio * (1 - product.descuento) : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      const pb = new PocketBase("https://kevinklein.pockethost.io");
      try {
        setLoading(true);
        const record = await pb.collection("productos").getOne<Product>(
          params.id,
          {
            expand: "id_categoria",
          }
        );
        setProduct(record);
        console.log(record);

        // Obtener las reseñas del producto
        const reviewsData = await pb.collection("product_reviews").getFullList(200, {
          filter: `product_id = "${params.id}"`, // Filtrar reseñas por el ID del producto
        });

        // Obtener información de usuario para cada reseña
        const reviewsWithUserDetails = await Promise.all(
          reviewsData.map(async (review: any) => {
            let userDetails = { username: "Usuario Anónimo", profile_picture: null };

            try {
              // Consulta adicional para obtener información del usuario
              const user = await pb.collection("users").getOne(review.user_id);
              userDetails = {
                username: user.name,
                profile_picture: user.avatar ? pb.files.getURL(user, user.avatar) : null,
              };
            } catch (err) {
              console.warn(`Error fetching user details for user_id ${review.user_id}:`, err);
            }

            return {
              user_id: review.user_id,
              user_name: userDetails.username,
              user_photo: userDetails.profile_picture,
              rating: review.rating,
              comment: review.comment,
              review_date: review.created, // Usa la fecha de creación como review_date
            };
          })
        );

        setReviews(reviewsWithUserDetails);

      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {

    return <><div className="bg-black"><Navbar /></div><div className="min-h-screen flex items-center justify-center">Loading...</div></>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <div className="bg-black">
          <Navbar />
        </div>
        <div className="min-h-screen flex items-center justify-center">
          Product not found.
        </div>
        <Footer />
      </>
    );
  }

  const handlePhoto = (index: number) => {
    setSelectedPhotoIndex(index); // Update selected photo index
  };

  const router = useRouter();
  const handleAddToCart = () => {
    const existingCart = localStorage.getItem('cart');
    const cartItems = existingCart ? JSON.parse(existingCart) : [];
    const productIndex = cartItems.findIndex((item: any) => item.product === product.nombre);

    if (productIndex >= 0) {
      // Incrementar cantidad y recalcular total
      cartItems[productIndex].quantity += 1;
    } else {
      // Agregar nuevo producto
      const newItem = {
        product: product.nombre,
        img: `https://kevinklein.pockethost.io/api/files/productos/${product.id}/${product.fotos[0]}`,
        shipping: 'a calcular',
        originalPrice: product.precio,
        discountedPrice: product.precio * (1 - product.descuento),
        quantity: document.querySelector('#quantity') ? document.querySelector('#quantity').value : 1,
      };
      cartItems.push(newItem);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    router.push('/ShoppingCart');
  };

  return (
    <>
      <div className="bg-black">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4 max-w-full">
          <div className="aspect-w-1 aspect-h-1">
            <Image
              src={`https://kevinklein.pockethost.io/api/files/productos/${product.id}/${product.fotos[selectedPhotoIndex]}`}
              alt={product.nombre}
              className="w-full h-1/4 object-cover rounded-lg"
              width={500}
              height={500}
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex sm:space-x-10 md:space-x-7 xl:space-x-10 2xl:space-x-6 w-full">
            {product.fotos.map((foto, index) => (
              <Image
                key={index}
                src={`https://kevinklein.pockethost.io/api/files/productos/${product.id}/${foto}`}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={100}
                onClick={() => handlePhoto(index)} // Pass the index of the clicked thumbnail
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${selectedPhotoIndex === index ? "border-2 border-blue-600" : ""
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <p className="text-base font-normal pb-3">Inicio / Categoría</p>
          <h2 className="text-3xl font-black mb-2">{product.nombre}</h2>
          <div className="flex items-center pb-4">
            <p className="text-xl text-gray-600 pr-4">${conDescuento}</p>
            <p className="text-sm text-gray-400 line-through">${product.precio}</p>
          </div>
          <p className="mb-6 text-gray-500">{product.descripcion}</p>

          <div className="mb-4">
            <div className="flex space-x-2">
              <h4 className="font-semibold text-gray-700 mt-4">Tallas:</h4>
              {product.tallas.map((talla, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTalla(talla)}
                  className={`w-10 h-10 flex items-center justify-center border border-gray-300 ${selectedTalla === talla ? "bg-blue-500 text-white" : ""
                    }`}
                >
                  {talla}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="quantity" className="font-semibold text-gray-700 mt-3">
              Cantidad:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              defaultValue="1"
              className="w-16 border border-gray-300 rounded-md p-2 text-center"
            />
            <button className="bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-900"
              onClick={handleAddToCart}
            >
              AGREGAR AL CARRITO
            </button>
            {/* <button className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-200 bg-white rounded-md">
              <FaHeart className="h-6 w-6 text-gray-400" />
            </button> */}
          </div>

          <div className="text-sm text-black mb-6">
            <p className="py-1">
              <strong className="text-[#A5A5A5] font-normal">SKU:</strong> {product.id}
            </p>
            <p className="py-1">
              <strong className="text-[#A5A5A5] font-normal">Categoría:</strong> {product.expand.id_categoria.nombre}
            </p>
            <p className="py-1">
              <strong className="text-[#A5A5A5] font-normal">Tags:</strong> {product.expand.id_categoria.gender}
            </p>
          </div>
        </div>
      </div>
      {/* Mostrar las reviews */}
      <div className="mt-10">
        <ProductReviews reviews={reviews} />
      </div>
      <Slider />
      <Chatbot />
      <Footer />
    </>
  );
};

export default ProductPage;
