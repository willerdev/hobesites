import { Heart } from 'lucide-react';

interface ProductCardProps {
  title: string;
  price: number;
  images: string[];  // Changed from image to images array
  location: string;
  createdAt: string | number;
}

export default function ProductCard({ title, price, images, location, createdAt }: ProductCardProps) {
  // Use the first image from the array or a fallback
  const imageUrl = images?.[0] || "https://via.placeholder.com/400x300";
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
        <p className="text-xl font-bold text-emerald-600 mb-2">${price}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{location}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
