"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function NeedHelpForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    background: "",
    courseType: "",
    domain: "",
  });

  const steps = [
    { number: 1, title: "About You" },
    { number: 2, title: "Preferences" },
    { number: 3, title: "Finalize" },
  ];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((p) => p + 1);
  };

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <section id="need-help" className="bg-white pt-8 md:pt-12 pb-0 overflow-hidden">
      {/* ALIGNMENT: Perfectly synced with 1440px master-grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Adjusted items-end to snap the image to the section floor */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-end">

          {/* LEFT SIDE: Content & Bottom-Aligned Image */}
          <div className="w-full lg:w-2/5 flex flex-col self-stretch">
            <div className="mb-6 lg:mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-purple-50 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-100">
                  • Support
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                Need Help? <br />
                <span className="text-[#8B19E6]">We&apos;re Here.</span>
              </h2>
              
              <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-sm">
                Connect with our experts and discover the perfect career path tailored specifically for you.
              </p>
            </div>

            {/* IMAGE: Tightened padding to reduce unnecessary white space */}
            <div className="relative mt-auto flex justify-center lg:justify-start items-end">
              <div className="relative translate-y-1"> {/* Nudges image to touch the bottom line */}
                <Image
                  src="/man.webp"
                  alt="Support Specialist"
                  width={380}
                  height={380}
                  className="w-full max-w-[260px] md:max-w-[320px] lg:max-w-[360px] h-auto block grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-50 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Floating Form Card with reduced padding */}
          <div className="w-full lg:flex-1 pb-10 md:pb-16">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] p-6 md:p-10 relative">
              
              {/* PROGRESS BAR: Reduced margin */}
              <div className="flex items-center justify-between mb-8 max-w-xs mx-auto md:mx-0">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${
                          currentStep >= step.number
                            ? "bg-[#8B19E6] text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {currentStep > step.number ? <Check className="w-3 h-3" /> : step.number}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-[1.5px] mx-2 md:mx-3 transition-colors duration-500 ${
                        currentStep > step.number ? "bg-[#8B19E6]" : "bg-gray-100"
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* FORM CONTENT: Reduced min-height for tighter vertical flow */}
              <div className="min-h-[240px] md:min-h-[280px] flex flex-col justify-center">
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <Select
                      label="Professional Background"
                      value={formData.background}
                      onChange={(v) => handleSelectChange("background", v)}
                      options={["College Student", "Working Professional", "Freelancer", "Business Owner"]}
                    />
                    <Select
                      label="Program Preference"
                      value={formData.courseType}
                      onChange={(v) => handleSelectChange("courseType", v)}
                      options={["Upskilling Course", "Certification", "Degree Program", "Bootcamp"]}
                    />
                    <ActionButton onClick={handleNext} text="Continue" />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-5">
                    <Select
                      label="Primary Domain of Interest"
                      value={formData.domain}
                      onChange={(v) => handleSelectChange("domain", v)}
                      options={["Web Development", "Data Science", "UI/UX Design", "Digital Marketing"]}
                    />
                    <ActionButton onClick={handleNext} text="Get Recommendations" />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6 text-[#8B19E6]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You</h3>
                    <p className="text-gray-500 text-sm font-medium">
                      Our mentors will reach out with your roadmap.
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

/* ---------------- COMPONENTS ---------------- */

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-gray-900 text-[9px] font-black uppercase tracking-[0.2em] mb-2.5 opacity-40">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#8B19E6]/30 outline-none transition-all duration-300 text-sm text-gray-700 font-bold appearance-none cursor-pointer"
        >
          <option value="">Select Option</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ onClick, text }) {
  return (
    <div className="flex pt-2">
      <button
        onClick={onClick}
        className="w-full md:w-auto px-10 py-4 bg-[#8B19E6] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#7014ba] transition-all duration-500 flex items-center justify-center gap-3 group md:ml-auto"
      >
        {text}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}