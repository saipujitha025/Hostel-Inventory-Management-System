import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-blue-900 text-white py-28 text-center">
        <h1 className="text-4xl font-extrabold">About Us</h1>
        <p className="text-lg mt-2 text-gray-200">
          Sri Venkateswara University Hostel & Mess Inventory System
        </p>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-5xl font-bold text-blue-900">
          Empowering Hostel Management
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          A digital solution to manage hostel inventory efficiently, ensuring a
          seamless experience for students and wardens.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* Mission */}
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-8 border-blue-500">
          <h3 className="text-2xl font-bold text-blue-900">🎯 Our Mission</h3>
          <p className="mt-3 text-gray-600">
            To streamline hostel and mess inventory management, reducing waste
            and improving efficiency.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white p-8 rounded-lg shadow-lg border-l-8 border-yellow-500">
          <h3 className="text-2xl font-bold text-blue-900">🚀 Our Vision</h3>
          <p className="mt-3 text-gray-600">
            To create a smart, transparent, and accountable inventory system for
            universities and institutions.
          </p>
        </div>
      </section>

      {/* Why Choose Us? Section */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-center text-blue-900">
          Why Choose Our System?
        </h3>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-xl font-semibold text-blue-900">
              📦 Mess Stock Management
            </h4>
            <p className="mt-3 text-gray-600">
              Track rice, vegetables, milk, and all mess-related items in real
              time.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h4 className="text-xl font-semibold text-blue-900">
              🛏️ Furniture Inventory
            </h4>
            <p className="mt-3 text-gray-600">
              Manage beds, tables, and chairs with automated tracking and
              requests.
            </p>
          </div>

          {/* Feature 3 */}
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
