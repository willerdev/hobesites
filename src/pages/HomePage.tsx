import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';
import ProductGrid from '../components/ProductGrid';
import ProductTable from '../components/ProductTable';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Ensure this import path is correct

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]); // Add this line

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const adsCollection = collection(db, 'ads');
      const adsSnapshot = await getDocs(adsCollection);
      const adsList = adsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(adsList);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-20">
      <Navbar />
      <Categories />
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : (
        <>
          <ProductGrid />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-semibold mb-4">Latest Products</h2>
            <ProductTable />
          </div>
        </>
      )}
    </div>
  );
}
