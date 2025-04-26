import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is the Hostel & Mess Inventory System?",
    answer:
      "Our system helps hostel administrators efficiently manage food inventory, track student meal plans, and monitor supplies in real-time.",
  },
  {
    question: "How do I register for the system?",
    answer:
      "Students and staff can register by clicking the Signup button, providing necessary details, and verifying their credentials through the admin.",
  },
  {
    question: "Can students track their meal usage?",
    answer:
      "Yes! Students can log in to check their meal consumption, upcoming menus, and remaining balance for extra purchases.",
  },
  {
    question: "How does the inventory tracking work?",
    answer:
      "The system allows mess staff to update stock levels, track usage trends, and receive alerts when supplies run low.",
  },
  {
    question: "Is the system accessible on mobile?",
    answer:
      "Yes! Our platform is mobile-friendly, allowing students and staff to access their dashboards on any device.",
  },
  {
    question: "How do I report issues with the mess services?",
    answer:
      "You can report issues directly through the feedback section in your dashboard or contact the mess manager via the support page.",
  },
];

const QA = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-28 px-5 md:px-20 bg-gradient-to-r  text-black min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 tracking-wide">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-20 p-5 rounded-xl shadow-lg backdrop-blur-lg transition-all duration-300"
            >
              <button
                className="w-full flex justify-between items-center text-lg font-semibold focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  🔽
                </motion.span>
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-3 text-gray-600 text-sm leading-relaxed"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QA;
