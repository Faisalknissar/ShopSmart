import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../../supabase/server";
import { Users, Award, Clock, MapPin } from "lucide-react";

export default async function AboutPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Our Company
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We're on a mission to revolutionize e-commerce by providing
                high-quality products at affordable prices with exceptional
                customer service.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600">2018</div>
                  <div className="text-gray-600">Year Founded</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">100K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-gray-600">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-gray-600">Customer Support</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
                alt="Team working together"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white rounded-lg shadow-sm my-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core principles guide everything we do and help us deliver
                exceptional experiences to our customers.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Customer First",
                  description:
                    "We prioritize our customers' needs in every decision we make.",
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Quality Products",
                  description:
                    "We source and sell only the highest quality products.",
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Fast Delivery",
                  description:
                    "We ensure quick and reliable delivery of all orders.",
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: "Global Reach",
                  description:
                    "We serve customers across the country with the same dedication.",
                },
              ].map((value, index) => (
                <div key={index} className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of professionals works tirelessly to bring you
              the best shopping experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                position: "CEO & Founder",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
              },
              {
                name: "Jane Smith",
                position: "CTO",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
              },
              {
                name: "Michael Johnson",
                position: "Head of Operations",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
              },
              {
                name: "Sarah Williams",
                position: "Lead Designer",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
              },
              {
                name: "Robert Brown",
                position: "Marketing Director",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
              },
              {
                name: "Emily Davis",
                position: "Customer Support Manager",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="p-6 bg-blue-50 flex justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
