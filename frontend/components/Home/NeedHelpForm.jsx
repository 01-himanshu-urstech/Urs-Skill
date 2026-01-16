'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';

export default function NeedHelpForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    background: '',
    courseType: '',
    domain: ''
  });

  const steps = [
    { number: 1, title: 'About You' },
    { number: 2, title: 'Preferences' },
    { number: 3, title: 'Details' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <section id="need-help" className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-50 to-purple-100 relative overflow-hidden  px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center min-h-[80vh]">

          {/* Left Side - Info & Image */}
          <div className="w-full lg:w-1/3 relative flex-shrink-0">
            <div className="backdrop-blur-sm rounded-3xl p-6">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Need Help?
              </h1>
              <p className="text-gray-600 text-sm mb-6">
                Connect with us & know what&apos;s best for you.
              </p>

              {/* Person Image with Question Mark */}
              <div className="relative mt-8 top-6">
                <Image
                  src="/man.webp"
                  alt="Need Help"
                  width={300}
                  height={300}
                  className="w-full max-w-[280px] mx-auto"
                />
                {/* Question Mark Icon */}
                <div className="absolute -top-4 right-8 transform rotate-10">
                  <div className="text-6xl animate-bounce " style={{ color: '#D4A574' }}>
                    ?
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:flex-1">
            {/* Form Card with Progress Steps inside */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">

              {/* Progress Steps - Inside card at top */}
              <div className="mb-8">
                <div className="flex justify-center items-center gap-3 flex-wrap">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${currentStep > step.number
                            ? 'bg-green-500 text-white'
                            : currentStep === step.number
                              ? 'bg-coral-500 text-white'
                              : 'bg-gray-300 text-gray-500'
                            }`}
                        >
                          {currentStep > step.number ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            step.number
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium ${currentStep >= step.number
                            ? 'text-gray-700'
                            : 'text-gray-400'
                            }`}
                        >
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-16 h-[2px] mx-3 ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {/* Step 1: About You */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-gray-700 text-base font-medium mb-3">
                        Tell us about your background?
                      </label>
                      <select
                        value={formData.background}
                        onChange={(e) => handleSelectChange('background', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white text-gray-700 appearance-none cursor-pointer"
                      >
                        <option value="">Select Background</option>
                        <option value="college">College Student</option>
                        <option value="working">Working Professional</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="business">Business Owner</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-base font-medium mb-3">
                        What type of course are you interested in?
                      </label>
                      <select
                        value={formData.courseType}
                        onChange={(e) => handleSelectChange('courseType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white text-gray-700 appearance-none cursor-pointer"
                      >
                        <option value="">Select Course Type</option>
                        <option value="upskilling">Upskilling Course</option>
                        <option value="certification">Certification Program</option>
                        <option value="degree">Degree Program</option>
                        <option value="bootcamp">Bootcamp</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleNext}
                        className="w-full md:w-auto px-12 py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg ml-auto block"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Preferences */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-gray-700 text-base font-medium mb-3">
                        Which domain interests you the most?
                      </label>
                      <select
                        value={formData.domain}
                        onChange={(e) => handleSelectChange('domain', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white text-gray-700 appearance-none cursor-pointer"
                      >
                        <option value="">Select Domain</option>
                        <option value="web">Web Development</option>
                        <option value="data">Data Science</option>
                        <option value="design">UI/UX Design</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="business">Business Analytics</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleNext}
                        className="w-full md:w-auto px-12 py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg ml-auto block"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Details */}
                {currentStep === 3 && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600">
                      We&apos;ll get back to you soon with personalized recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-coral-500 hover:bg-coral-600 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 z-50">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
        </svg>
      </button> */}

      <style jsx>{`
        .bg-coral-500 {
          background-color: #E57373;
        }
        .hover\\:bg-coral-600:hover {
          background-color: #EF5350;
        }
        .focus\\:ring-coral-500:focus {
          --tw-ring-color: #E57373;
        }
      `}</style>
    </section>
  );
}
