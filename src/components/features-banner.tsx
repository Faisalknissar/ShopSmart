import { Truck, BadgePercent, ShieldCheck, HeadphonesIcon } from "lucide-react";

export default function FeaturesBanner() {
  const features = [
    {
      icon: <Truck className="h-10 w-10" />,
      title: "FAST DELIVERY",
      description: "Free shipping on all orders over $50",
    },
    {
      icon: <BadgePercent className="h-10 w-10" />,
      title: "FREE SHIPPING",
      description: "Free shipping on all orders over $50",
    },
    {
      icon: <ShieldCheck className="h-10 w-10" />,
      title: "BEST QUALITY",
      description: "Premium quality products guaranteed",
    },
    {
      icon: <HeadphonesIcon className="h-10 w-10" />,
      title: "24X7 CUSTOMER SUPPORT",
      description: "Dedicated support whenever you need it",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
