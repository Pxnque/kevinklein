"use client";

import React, { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/Chatbot/Chatbot";

interface Sale {
  product_id: string;
  product_name: string;
  product_image: string;
}

const WriteReviewPage = () => {
  const pb = new PocketBase("https://kevinklein.pockethost.io");
  const router = useRouter();
  const [purchasedProducts, setPurchasedProducts] = useState<Sale[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products the user has purchased
  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const user = pb.authStore.model; // Obtener usuario autenticado
        if (!user) {
          router.push("/login"); // Redirige si no está autenticado
          return;
        }

        const salesData = await pb.collection("sales").getFullList(200, {
          filter: `user_id = "${user.id}"`,
          expand: "product_id",
          requestKey: null,
        });
        console.log(salesData);

        // Mapeamos las ventas y extraemos los productos
        const products = salesData.flatMap((sale: any) => {
          // Verificar si el campo expand.product_id contiene un array
          if (sale.expand?.product_id && Array.isArray(sale.expand.product_id)) {
            return sale.expand.product_id.map((product: any) => ({
              product_id: product.id || "Desconocido",
              product_name: product.nombre || "Producto sin nombre",
              product_image:
                product.fotos && product.fotos.length > 0 ? pb.files.getURL(product, product.fotos[0]) : null,
            }));
          }
          return [];
        });

        console.log(products);
        setPurchasedProducts(products);
      } catch (err) {
        console.error("Error fetching purchased products:", err);
        setError("Failed to fetch purchased products.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedProducts();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct || rating === 0 || reviewText.trim() === "") {
      setError("Por favor selecciona un producto, una calificación y escribe un comentario.");
      return;
    }

    try {
      const user = pb.authStore.model;
      if (!user) {
        router.push("/login");
        return;
      }

      await pb.collection("product_reviews").create({
        product_id: selectedProduct,
        user_id: user.id,
        rating,
        comment: reviewText,
      });

      setSelectedProduct(null);
      setRating(0);
      setReviewText("");
      alert("¡Reseña enviada con éxito!");
    } catch (err) {
      console.error("Error creating review:", err);
      setError("Failed to submit review. Please try again.");
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="bg-black">
        <Navbar />
      </div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Escribe una reseña</h1>

        {purchasedProducts.length === 0 ? (
          <p className="text-gray-500">No tienes productos comprados para reseñar.</p>
        ) : (
          <form onSubmit={handleSubmitReview} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Selecciona un producto</label>
              <select
                value={selectedProduct || ""}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="" disabled>
                  Selecciona un producto
                </option>
                {purchasedProducts.map((product) => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.product_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Calificación</label>
              <div className="flex items-center space-x-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`w-8 h-8 rounded-full ${rating > i ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                    onClick={() => setRating(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Comentario</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Escribe tu comentario aquí..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Enviar Reseña
            </button>
          </form>
        )}
        <Chatbot />
        <Footer />
      </div>
    </>
  );
};

export default WriteReviewPage;
