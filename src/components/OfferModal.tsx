import { useState } from 'react';
import { X } from 'lucide-react';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  productPrice: number;
  onSubmit: (amount: number) => void;
}

export default function OfferModal({ isOpen, onClose, productPrice, onSubmit }: OfferModalProps) {
  const [offerAmount, setOfferAmount] = useState<string>('');
  
  // Calculate suggested discounts
  const suggestions = [
    { label: '5% off', amount: productPrice * 0.95 },
    { label: '10% off', amount: productPrice * 0.9 },
    { label: '15% off', amount: productPrice * 0.85 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(offerAmount);
    if (!isNaN(amount)) {
      onSubmit(amount);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Make an Offer</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">Original price: ${productPrice}</p>
        </div>

        <div className="flex gap-2 mb-4">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.label}
              onClick={() => setOfferAmount(suggestion.amount.toFixed(2))}
              className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {suggestion.label}
              <div className="font-semibold">${suggestion.amount.toFixed(2)}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your offer
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                step="0.01"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
                placeholder="Enter amount"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
          >
            Send Offer
          </button>
        </form>
      </div>
    </div>
  );
}
