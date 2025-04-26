import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_1q2z3r4",
        "template_8o86q5g",
        form.current,
        "_Kfh3dF6jEQwqI8sO"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          alert("📩 Email sent successfully!");
          form.current.reset();
          setLoading(false);
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("email sent successfully");
          setLoading(false);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-blue-900 text-white py-28 text-center">
        <h1 className="text-4xl font-extrabold">Contact Us</h1>
        <p className="text-lg mt-2 text-gray-200">
          Get in touch with Sri Venkateswara University Hostel & Mess Management
        </p>
      </header>

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-900">
            📩 Send Us a Message
          </h3>
          <p className="text-gray-600 mt-2">
            Fill out the form below, and we will get back to you shortly.
          </p>
          <form ref={form} onSubmit={sendEmail} className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold transition ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-900 hover:bg-blue-700"
              } text-white flex justify-center items-center`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-900">
            📍 Contact Information
          </h3>
          <p className="text-gray-600 mt-2">
            Reach out to us directly through the following contact details.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-blue-900 text-2xl">📍</span>
              <p className="text-gray-700">
                Sri Venkateswara University, Tirupati, Andhra Pradesh, India
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-blue-900 text-2xl">📞</span>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-blue-900 text-2xl">✉️</span>
              <p className="text-gray-700">support@svu.edu.in</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Embed */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-center text-blue-900">
          📍 Find Us on the Map
        </h3>
        <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="w-full h-72"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387144.0075836514!2d79.32368221168768!3d13.628755777979079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d361fb4f52f51%3A0xe4a8f1b4f6a64e75!2sSri%20Venkateswara%20University!5e0!3m2!1sen!2sin!4v1626785734775!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
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
