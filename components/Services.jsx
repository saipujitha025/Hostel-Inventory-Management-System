import React from "react";
import {
  FaBed,
  FaUtensils,
  FaClipboardList,
  FaTools,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";

const services = [
  {
    title: "Hostel Management",
    description:
      "Seamlessly manage room allocation, student check-ins, and facilities.",
    icon: <FaBed className="text-5xl text-blue-600" />,
    bgColor: "bg-blue-50",
  },
  {
    title: "Mess & Dining",
    description:
      "Efficiently track meals, manage dining schedules, and inventory.",
    icon: <FaUtensils className="text-5xl text-green-500" />,
    bgColor: "bg-green-50",
  },
  {
    title: "Inventory Management",
    description:
      "Monitor supplies and automate stock updates for hostel and mess.",
    icon: <FaClipboardList className="text-5xl text-yellow-500" />,
    bgColor: "bg-yellow-50",
  },
  {
    title: "Maintenance & Support",
    description:
      "Request repairs, track maintenance, and ensure smooth hostel operations.",
    icon: <FaTools className="text-5xl text-red-500" />,
    bgColor: "bg-red-50",
  },
  {
    title: "Student Management",
    description:
      "Maintain student records, attendance, and overall hostel engagement.",
    icon: <FaUsers className="text-5xl text-purple-500" />,
    bgColor: "bg-purple-50",
  },
  {
    title: "Fee & Payment System",
    description:
      "Integrated payment solutions for hostel & mess fee collection.",
    icon: <FaMoneyBillWave className="text-5xl text-indigo-500" />,
    bgColor: "bg-indigo-50",
  },
];

export default function Services() {
  return (
    <section className="py-28 bg-gradient-to-br from-blue-50 via-gray-100 to-blue-200">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold text-gray-900 drop-shadow-md">
          🔹 Our Services 🔹
        </h2>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Enhancing hostel and mess operations with smart, efficient, and
          automated solutions.
        </p>
      </div>

      <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-14 px-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 ${service.bgColor}`}
          >
            <div className="flex items-center justify-center bg-white p-5 rounded-full shadow-md">
              {service.icon}
            </div>
            <h3 className="text-2xl font-semibold mt-6 text-gray-900">
              {service.title}
            </h3>
            <p className="text-gray-600 mt-3">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
