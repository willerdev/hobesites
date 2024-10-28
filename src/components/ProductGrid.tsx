import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getProducts } from '../lib/firebase';
import { Product } from '../types'; // Assuming you have a Product type defined

interface ProductGridProps {
  searchQuery?: string;
  category?: string;
  subcategory?: string;
}

export default function ProductGrid({ searchQuery = '', category = '', subcategory = '' }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12; // Increased from 8 to 12 for better grid layout
  const navigate = useNavigate();

  useEffect(() => {
    // Reset when search query or category changes
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [searchQuery, category, subcategory]);

  const fetchProducts = async (pageNum: number, isNewSearch: boolean = false) => {
    try {
      setLoading(true);
      const productsData = await getProducts({
        searchQuery,
        category,
        subcategory,
        page: pageNum,
        limit: PRODUCTS_PER_PAGE
      });
      
      if (productsData.length < PRODUCTS_PER_PAGE) {
        setHasMore(false);
      }

      setProducts(prev => isNewSearch ? productsData : [...prev, ...productsData]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="animate-pulse grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 text-lg">
          No products found{searchQuery ? ` for "${searchQuery}"` : ''}.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            onClick={() => navigate(`/product/${product.id}`)}
            className="transform transition duration-200 hover:scale-105"
          >
            <ProductCard
              title={product.title || product.name || ''}
              price={product.price}
              images={product.images}
              location={product.location}
              createdAt={product.createdAt}
            />
          </div>
        ))}
      </div>
      
      {hasMore && !loading && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
