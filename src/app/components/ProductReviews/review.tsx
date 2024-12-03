import React from "react";
import Image from "next/image";
import default_img from '@/app/public/img/AdminProfile.jpg';

interface Review {
  user_id: string;
  user_name: string;
  user_photo: string | null;
  rating: number;
  comment: string;
  review_date: string;
}

const ProductReviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  if (reviews.length === 0) {
    return <p className="text-gray-500">No hay reseñas disponibles para este producto.</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Las mejores reseñas de México</h2>
      {reviews.map((review, index) => (
        <div key={index} className="border-b border-gray-300 pb-6">
          <div className="flex items-center space-x-4">
            {/* Foto del usuario */}
            {
              <Image
                src={review.user_photo ? review.user_photo : default_img}
                alt={review.user_id}
                width={48}
                height={48}
                className="rounded-full"
              />

            }

            {/* Nombre del usuario */}
            <p className="text-gray-700 capitalize">{review.user_name}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mt-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>

          {/* Fecha */}
          <p className="text-gray-500 text-sm mt-1">
            {new Date(review.review_date).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Comentario */}
          <p className="text-gray-700 mt-4">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
