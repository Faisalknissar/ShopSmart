import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../../supabase/server";
import { Star } from "lucide-react";

export default async function TestimonialsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Mock testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 5,
      text: "I've been shopping here for over a year now and I'm always impressed with the quality of products and the fast shipping. Customer service is also top-notch!",
      date: "August 15, 2023",
      product: "Wireless Headphones",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 4,
      text: "Great selection of products at competitive prices. The website is easy to navigate and checkout process is smooth. Would definitely recommend!",
      date: "September 3, 2023",
      product: "Smart Watch",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      rating: 5,
      text: "The customer support team went above and beyond to help me with my order. They were responsive and resolved my issue quickly. Very satisfied!",
      date: "October 12, 2023",
      product: "Coffee Maker",
    },
    {
      id: 4,
      name: "David Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      rating: 5,
      text: "I've ordered multiple items and they always arrive well-packaged and on time. The quality is consistently excellent. This is now my go-to online store.",
      date: "November 5, 2023",
      product: "Men's T-Shirt",
    },
    {
      id: 5,
      name: "Jessica Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      rating: 4,
      text: "The return process was hassle-free when I needed to exchange a product. The team was understanding and processed my request quickly. Great experience overall!",
      date: "December 18, 2023",
      product: "Women's Dress",
    },
    {
      id: 6,
      name: "Robert Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      rating: 5,
      text: "Exceptional service from start to finish. The product descriptions are accurate, and the items I received were exactly as described. Will definitely shop here again!",
      date: "January 22, 2024",
      product: "Blender",
    },
  ];

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Customer Testimonials</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to
            say about their shopping experience with us.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full -mr-20 -mt-20 z-0"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=featured"
                alt="Featured Customer"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">John Doe</h3>
                <div className="flex mt-1">{renderStars(5)}</div>
              </div>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              "I've been shopping at various online stores for years, but this
              one stands out for its exceptional customer service, quality
              products, and seamless shopping experience. The website is
              intuitive, the checkout process is smooth, and the delivery is
              always on time. I'm a customer for life!"
            </p>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Product purchased:</span> Premium
              Wireless Earbuds
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Date:</span> February 10, 2024
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <div className="flex mt-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Product:</span>{" "}
                {testimonial.product}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Date:</span> {testimonial.date}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We value your feedback! If you've purchased from us, we'd love to
            hear about your experience.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Write a Review
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
