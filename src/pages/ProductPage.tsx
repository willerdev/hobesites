import { ChevronLeft, Heart, Share2, Flag, MessageSquare } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProducts } from '../lib/firebase';
import { Product } from '../types';
import { auth, createChat } from '../lib/firebase';
import OfferModal from '../components/OfferModal';

function isValidProduct(product: any): product is Product {
  // Log the received product data
  console.log('Validating product data:', product);

  const validationChecks = {
    isObject: typeof product === 'object' && product !== null,
    hasName: typeof product?.title === 'string' || product?.title === null,  // Changed from name to title
    hasPrice: typeof product?.price === 'number',
    hasImages: Array.isArray(product?.images),
    hasDescription: typeof product?.description === 'string',
    hasLocation: typeof product?.location === 'string',
    hasUserId: typeof product?.userId === 'string',  // Add this line
    hasUserName: typeof product?.userName === 'string',
    // More permissive date validation
    hasValidCreatedAt: !product?.createdAt || 
                      typeof product.createdAt === 'string' || 
                      product.createdAt instanceof Date ||
                      // Add Firestore Timestamp check
                      (typeof product.createdAt === 'object' && 
                       'seconds' in product.createdAt && 
                       'nanoseconds' in product.createdAt),
    // More permissive avatar validation
    hasValidUserAvatar: !product?.userAvatar || 
                       typeof product.userAvatar === 'string'
  };

  // Log failed validations specifically
  const failedChecks = Object.entries(validationChecks)
    .filter(([_, value]) => !value)
    .map(([key]) => key);
  
  if (failedChecks.length > 0) {
    console.log('Failed validations:', failedChecks);
  }

  return Object.values(validationChecks).every(Boolean);
}

export default function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Invalid product ID');
        return;
      }
      try {
        setLoading(true);
        // Pass an empty string or null as search query if getProducts requires a parameter
        const products = await getProducts({ 
          searchQuery: '', 
          page: 1, 
          limit: 1,
          category: '',    // Add missing required parameter
          subcategory: ''  // Add missing required parameter
        });
        const productData = products.find(p => p.id === id);
        if (productData) {
          if (isValidProduct(productData)) {
            setProduct(productData);
          } else {
            setError('Invalid product data');
          }
        } else {
          setError(`Product with ID ${id} not found`);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !product) {
    return <div className="min-h-screen flex items-center justify-center">{error || 'Product not found'}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 lg:pb-0">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button onClick={() => navigate(-1)}>
              <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="ml-auto flex space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Flag className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="relative">
            <img
              src={product.images[0] || "https://via.placeholder.com/800x600"}
              alt={product.title}  // Changed from name to title
              className="w-full h-96 object-cover"
            />
            <button className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
              <Heart className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{product.title}</h1> 
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-500">${product.price}</p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {product.description}
            </p>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span>Posted {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Unknown date'}</span>
              <span className="mx-2">•</span>
              <span>{product.location}</span>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  if (!auth?.currentUser) {
                    navigate('/login');
                    return;
                  }
                  setIsOfferModalOpen(true);
                }}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Make an Offer
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <img
                src={product.userAvatar || "https://via.placeholder.com/100"}
                alt={product.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4">
                <h3 className="font-medium text-gray-900 dark:text-white">{product.userName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Member since {product.createdAt ? new Date(product.createdAt).getFullYear() : 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        productPrice={product.price}
        onSubmit={async (amount) => {
          try {
            if (!auth) return;
            if (!auth.currentUser) {
              navigate('/login');
              return;
            }

            const chatData = {
              productId: product.id,
              productTitle: product.title,
              productImage: product.images[0],
              participants: [auth.currentUser.uid, product.userId],
              lastMessage: `Offer: $${amount}`,
              lastMessageTime: new Date(),
              createdAt: new Date(),
            };

            await createChat(
              auth.currentUser.uid,
              product.userId,
              JSON.stringify(chatData)
            );
            navigate('/chat');
          } catch (err) {
            console.error('Error creating chat:', err);
            setError('Failed to send offer. Please try again.');
          }
        }}
      />
    </div>
  );
}
