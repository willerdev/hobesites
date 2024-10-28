import { useState, useEffect } from 'react';
import { ChevronLeft, Image, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductData } from '../types';

import { auth, storage, addProduct } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';

export default function PostPage() {
  const navigate = useNavigate();

  // Add authentication check when component mounts
  useEffect(() => {
    if (!auth?.currentUser) {
      navigate('/login');
    }
  }, [navigate]);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 4) {
      setError('Maximum 4 images allowed');
      return;
    }
    setImages(files);
  };

  const handleSubmit = async () => {
    if (!auth?.currentUser) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (!storage) {
        throw new Error('Storage is not initialized');
      }

      // Upload images (storage is now type-narrowed within this scope)
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(storage as FirebaseStorage, `products/${Date.now()}-${image.name}`);
          const snapshot = await uploadBytes(storageRef, image);
          return getDownloadURL(snapshot.ref);
        })
      );

      // Add product to Firestore
      await addProduct({
        title,
        price: parseFloat(price),
        category,
        description,
        images: imageUrls,
        location,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'Anonymous User',
      });

      navigate('/');
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => navigate(-1)}>
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <h1 className="ml-4 text-xl font-semibold">Create Post</h1>
            </div>
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="What are you selling?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="vehicles">Vehicles</option>
              <option value="property">Property</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Describe what you're selling"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos (Max 4)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="images"
            />
            <label
              htmlFor="images"
              className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 transition-colors cursor-pointer"
            >
              <Image className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-gray-600">
                {images.length > 0 ? `${images.length} images selected` : 'Add Photos'}
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter location"
              />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50 font-semibold"
            >
              {loading ? 'Posting...' : 'Create Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
