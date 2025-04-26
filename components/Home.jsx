import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white py-5 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">🏛️ SVU Hostel & Mess Inventory</h1>
          <button
            onClick={() => navigate("/login")}
            className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-28 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <h2 className="text-5xl font-extrabold">
          Sri Venkateswara University Hostel Inventory Management System
        </h2>
        <p className="mt-4 text-lg text-gray-200">
          Manage Mess Stock, Furniture, and Electronics with ease.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate("/about")}
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition mx-2"
          >
            Learn More
          </button>
          <button
            onClick={() => navigate("/features")}
            className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition mx-2"
          >
            Features
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-center text-gray-800">
          Why Choose Our System?
        </h3>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-xl font-semibold text-blue-900">
              📦 Mess Stock Management
            </h4>
            <p className="mt-3 text-gray-600">
              Track rice, vegetables, milk, and all mess-related items in real
              time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-xl font-semibold text-blue-900">
              🛏️ Furniture Inventory
            </h4>
            <p className="mt-3 text-gray-600">
              Manage beds, tables, and chairs with automated tracking and
              requests.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-xl font-semibold text-blue-900">
              💡 Electronics Control
            </h4>
            <p className="mt-3 text-gray-600">
              Monitor hostel fans, lights, and heaters efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 text-center mt-12">
        <p>
          &copy; {new Date().getFullYear()} Sri Venkateswara University. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}
