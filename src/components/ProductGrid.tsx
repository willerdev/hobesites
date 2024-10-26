import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    title: "iPhone 13 Pro Max - 256GB Space Gray",
    price: "$899",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400",
    location: "New York",
    date: "Today"
  },
  {
    id: 2,
    title: "Modern 3-Seater Sofa - Gray",
    price: "$599",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400",
    location: "Los Angeles",
    date: "Yesterday"
  },
  {
    id: 3,
    title: "2019 Tesla Model 3 - Long Range",
    price: "$35,900",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=400",
    location: "Miami",
    date: "2 days ago"
  },
  {
    id: 4,
    title: "MacBook Pro 16\" M1 Max",
    price: "$2,499",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400",
    location: "Chicago",
    date: "3 days ago"
  },
  {
    id: 5,
    title: "Luxury Apartment - 2 Bed, 2 Bath",
    price: "$2,800/mo",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400",
    location: "San Francisco",
    date: "1 week ago"
  },
  {
    id: 6,
    title: "Professional DSLR Camera Kit",
    price: "$1,299",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400",
    location: "Boston",
    date: "1 week ago"
  }
];

export default function ProductGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}