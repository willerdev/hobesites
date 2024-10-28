import { Shield, Clock, DollarSign } from 'lucide-react';

export default function TipsSection() {
  const tips = [
    {
      icon: Shield,
      title: "Stay Safe While Trading",
      description: "Meet in public places, verify items before purchase, and use our secure messaging system."
    },
    {
      icon: Clock,
      title: "Best Time to Post",
      description: "Post your items between 6-8 PM on weekdays for maximum visibility and faster sales."
    },
    {
      icon: DollarSign,
      title: "Pricing Strategy",
      description: "Research similar items and price competitively. Be open to reasonable offers."
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Tips for Success</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <Icon className="h-12 w-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

