import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Product {
  id: string;
  category: string;
  condition: string;
  createdAt: Date;
  description: string;
  images: string[];
  is_promoted: boolean;
  location: string;
  negotiable: boolean;
  price: number;
  savedBy: string[];
  soldAt: Date | null;
  status: string;
  subCategory: string | null;
  title: string;
  updatedAt: Date;
  userId: string;
  views: number;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(
          productsRef,
          where('status', '==', 'active'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedProducts: Product[] = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Condition</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">{product.title}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">{product.price}</td>
              <td className="px-4 py-2">{product.condition}</td>
              <td className="px-4 py-2">{product.location}</td>
              <td className="px-4 py-2">{product.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
