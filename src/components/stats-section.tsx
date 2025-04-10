export default function StatsSection() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">1000+</div>
            <div className="text-blue-100">Products</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">25+</div>
            <div className="text-blue-100">Categories</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Customer Support</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">10K+</div>
            <div className="text-blue-100">Happy Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
