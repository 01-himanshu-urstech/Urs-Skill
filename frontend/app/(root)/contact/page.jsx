"use client";
import { useState } from "react";
import { Facebook, X, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const phoneNumber = formData.phone.replace(/^\d{1,3}/, '').slice(-10);
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: Number(phoneNumber),
        description: formData.message
      };

      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/contact-create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: "Thank you! Your message has been sent successfully. We'll get back to you soon."
        });
        setShowModal(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Invalid credentials. Please try again."
      });
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitMessage(null);
  };

  return (
    <>
      <section className="min-h-screen bg-white">
        {/* Success/Error Modal */}
        {showModal && submitMessage && (
          <div
            onClick={closeModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 transform transition-all animate-scaleIn ${
                submitMessage.type === "success"
                  ? "border-t-4 border-green-500"
                  : "border-t-4 border-red-500"
              }`}
            >
              <div className="flex justify-center mb-4">
                {submitMessage.type === "success" ? (
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
              </div>

              <h3 className={`text-2xl font-bold text-center mb-3 ${
                submitMessage.type === "success" ? "text-green-600" : "text-red-600"
              }`}>
                {submitMessage.type === "success" ? "Success!" : "Error!"}
              </h3>

              <p className="text-base text-gray-600 text-center mb-6 leading-relaxed">
                {submitMessage.text}
              </p>

              <button
                onClick={closeModal}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  submitMessage.type === "success"
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Hero Banner */}
        <div className="w-full min-h-[40vh] relative flex items-center overflow-hidden">
          <Image
            src="/contact-header.webp"
            alt="Contact Us"
            fill
            priority
            className="object-cover"
            quality={90}
            sizes="100vw"
          />
        </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information - Left Side */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-sm font-bold rounded-full mb-4 border border-blue-200">
                  CONTACT INFO
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                  Let&apos;s Connect & <span className="text-blue-600">Collaborate</span>
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Have questions? We&apos;re here to help! Reach out to us through any of the following channels.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Email */}
                <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 p-6 border border-blue-100 transform hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">Email Address</h3>
                      <a href="mailto:connect@urstechsolution.com" className="text-sm text-gray-600 hover:text-blue-600 transition-colors break-words font-medium">
                        connect@urstechsolution.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 p-6 border border-blue-100 transform hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">Phone Number</h3>
                      <a href="tel:+919811255599" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
                        +91 98112 55599
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 p-6 border border-blue-100 transform hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">Office Address</h3>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        Urs Skill, Urs Group of Companies <br />
                        15th Floor, E SQUARE, C2, Sector 96,<br />
                        Noida, Uttar Pradesh 201304
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 p-6 border border-blue-100 transform hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-3">Follow Us</h3>
                      <div className="flex gap-3">
                        <a href="#" className="w-10 h-10 bg-white hover:bg-[#1877f2] rounded-xl flex items-center justify-center text-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-md border border-blue-200">
                          <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-white hover:bg-black rounded-xl flex items-center justify-center text-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-md border border-blue-200">
                          <X className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-xl flex items-center justify-center text-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-md border border-blue-200">
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-white hover:bg-[#0077b5] rounded-xl flex items-center justify-center text-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-md border border-blue-200">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-200">
                <div className="mb-8">
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-sm font-bold rounded-full mb-4 border border-blue-200">
                    SEND MESSAGE
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
                    Drop Us a <span className="text-blue-600">Line</span>
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-white text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-white text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                      country={"in"}
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="Enter Mobile Number"
                      inputStyle={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "0.75rem",
                        border: "2px solid #d1d5db",
                        backgroundColor: "#ffffff",
                        color: "#1f2937",
                        fontSize: "0.95rem",
                        paddingLeft: "52px",
                        fontWeight: "500",
                      }}
                      buttonStyle={{
                        borderRadius: "0.75rem 0 0 0.75rem",
                        border: "2px solid #d1d5db",
                        backgroundColor: "#f9fafb",
                        borderRight: "none",
                      }}
                      dropdownStyle={{
                        borderRadius: "0.75rem",
                        backgroundColor: "#ffffff",
                        color: "#1f2937",
                      }}
                      enableSearch={true}
                      searchPlaceholder="Search country"
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoComplete: "tel",
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3.5 bg-white text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none placeholder:text-gray-400"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">
          <div className="rounded-2xl overflow-hidden border-2 border-gray-200 shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.9468077834335!2d77.3468156!3d28.5413185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce78562399a11%3A0xa7d3ecda2c6869f!2sUrsTech%20Solution!5e0!3m2!1sen!2sin!4v1767611401481!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .react-tel-input .flag-dropdown {
          border-right: none !important;
        }

        .react-tel-input input:focus,
        .react-tel-input .flag-dropdown:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
        }

        .react-tel-input .selected-flag {
          background-color: #f9fafb !important;
        }

        .react-tel-input .country-list {
          background-color: #ffffff !important;
          color: #1f2937 !important;
          border: 1px solid #e5e7eb !important;
        }

        .react-tel-input .country-list .country:hover {
          background-color: #f3f4f6 !important;
        }

        .react-tel-input .country-list .country.highlight {
          background-color: #dbeafe !important;
        }
      `}</style>
    </>
  );
}
