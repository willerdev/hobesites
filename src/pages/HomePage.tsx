import { useState } from 'react';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import HeroSlider from '../components/HeroSlider';
import TipsSection from '../components/TipsSection';
import { Shield, Users, Clock } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    {
      icon: Shield,
      title: "Secure Trading",
      description: "Our platform ensures safe transactions between buyers and sellers"
    },
    {
      icon: Users,
      title: "Local Community",
      description: "Connect with trusted buyers and sellers in your area"
    },
    {
      icon: Clock,
      title: "Quick & Easy",
      description: "List items in minutes and start selling immediately"
    }
  ];

  return (
    <div className="pb-20">
      <Navbar />
      <HeroSlider />
      
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <Categories />
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Latest Products</h2>
          <ProductGrid searchQuery={searchQuery} />
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-block p-4 bg-emerald-50 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TipsSection />
      
  
    </div>
  );
}
