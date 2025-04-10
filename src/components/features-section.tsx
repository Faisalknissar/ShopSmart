import {
  ShoppingBag,
  CreditCard,
  Search,
  LayoutGrid,
  ShoppingCart,
  Truck,
  Shield,
  BarChart,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Comprehensive E-commerce Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform offers everything you need to create a successful
            online store with powerful management tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <LayoutGrid className="w-6 h-6" />,
              title: "Clean Product Listings",
              description:
                "Category filters, search functionality, and grid/list view options",
            },
            {
              icon: <Search className="w-6 h-6" />,
              title: "Advanced Search",
              description: "Powerful search with filters and sorting options",
            },
            {
              icon: <ShoppingCart className="w-6 h-6" />,
              title: "Real-time Shopping Cart",
              description:
                "Quantity adjustments and persistent storage for all users",
            },
            {
              icon: <CreditCard className="w-6 h-6" />,
              title: "Multiple Payment Options",
              description: "UPI, net banking, and card payment methods",
            },
            {
              icon: <BarChart className="w-6 h-6" />,
              title: "Admin Dashboard",
              description: "Intuitive product management and sales analytics",
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Secure Checkout",
              description:
                "Mobile/email authentication and secure payment processing",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
