"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Image from "next/image";

export default function NeedhelpCourses() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    background: "",
    courseType: "",
    domain: "",
  });

  const steps = [
    { number: 1, title: "About You" },
    { number: 2, title: "Preferences" },
    { number: 3, title: "Details" },
  ];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((p) => p + 1);
  };

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <section
      id="need-help"
      className="bg-gradient-to-br from-purple-200 via-purple-50 to-purple-100 relative overflow-hidden px-4 sm:px-6 py-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="backdrop-blur-sm rounded-3xl p-6">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Need Help?
              </h1>
              <p className="text-gray-600 text-sm mb-6">
                Connect with us & know what&apos;s best for you.
              </p>

              {/* IMAGE */}
              <div className="relative mt-6 flex justify-center">
                <Image
                  src="/man.webp"
                  alt="Need Help"
                  width={260}
                  height={260}
                  className="w-full max-w-[220px] sm:max-w-[260px]"
                />
                <div className="absolute -top-3 right-6 rotate-12">
                  <span className="text-5xl animate-bounce text-[#D4A574]">
                    ?
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="w-full lg:flex-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 max-w-2xl mx-auto">

              {/* PROGRESS */}
              <div className="mb-8">
                <div className="flex justify-center gap-4 flex-wrap">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${currentStep > step.number
                            ? "bg-green-500 text-white"
                            : currentStep === step.number
                              ? "bg-[#5b1e8b] text-white"
                              : "bg-gray-300 text-gray-500"
                            }`}
                        >
                          {currentStep > step.number ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            step.number
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {step.title}
                        </span>
                      </div>

                      {index < steps.length - 1 && (
                        <div className="hidden sm:block w-12 h-[2px] mx-3 bg-gray-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* FORM STEPS */}
              <div className="space-y-6">

                {/* STEP 1 */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <Select
                      label="Tell us about your background?"
                      value={formData.background}
                      onChange={(v) => handleSelectChange("background", v)}
                      options={[
                        "College Student",
                        "Working Professional",
                        "Freelancer",
                        "Business Owner",
                      ]}
                    />

                    <Select
                      label="What type of course are you interested in?"
                      value={formData.courseType}
                      onChange={(v) => handleSelectChange("courseType", v)}
                      options={[
                        "Upskilling Course",
                        "Certification Program",
                        "Degree Program",
                        "Bootcamp",
                      ]}
                    />

                    <ActionButton onClick={handleNext} />
                  </div>
                )}

                {/* STEP 2 */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <Select
                      label="Which domain interests you the most?"
                      value={formData.domain}
                      onChange={(v) => handleSelectChange("domain", v)}
                      options={[
                        "Web Development",
                        "Data Science",
                        "UI/UX Design",
                        "Digital Marketing",
                        "Business Analytics",
                      ]}
                    />

                    <ActionButton onClick={handleNext} />
                  </div>
                )}

                {/* STEP 3 */}
                {currentStep === 3 && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600">
                      We&apos;ll get back to you soon with personalized
                      recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* REUSABLE COMPONENTS */

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-gray-700 text-base font-medium mb-3">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-[#E57373]
                   bg-white text-gray-700 cursor-pointer"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function ActionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full sm:w-auto px-12 py-3 bg-purple-700
                 hover:bg-[#5b1e8b] text-white font-semibold
                 rounded-xl transition-all hover:shadow-lg ml-auto block hover:cursor-pointer"
    >
      Next
    </button>
  );
}
