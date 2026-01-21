"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ArrowUpRight, Headphones } from "lucide-react";
import { STATIC_COURSES } from "@/app/(root)/constants/constant";
import gsap from "gsap";

// We map our Hero UI data to the IDs in your STATIC_COURSES
const HERO_UI_CONFIG = {
  fullstack: {
    courseId: 1,
    title: "Upskill & Launch your Career",
    subtitle: "as a Full Stack Developer",
    image: "/courses/full-stack-hero.webp",
    ctaSecondary: "Speak to a Counsellor",
  },
  mba: {
    courseId: 2,
    title: "Become a Business Leader",
    subtitle: "with AI-Powered Management Skills",
    image: "/courses/mba-hero.webp",
    ctaSecondary: "Talk to an Advisor",
  },
};

const CourseHero = ({ course = "fullstack" }) => {
  const router = useRouter();
  const ui = HERO_UI_CONFIG[course];
  const courseData = STATIC_COURSES[ui.courseId];

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  // Refs for GSAP animations
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(imageRef.current, { scale: 1.2, opacity: 0 }, { scale: 1.05, opacity: 1, duration: 1.5, ease: "power2.out" })
      .fromTo(textRef.current?.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(buttonRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }, "-=0.2");
  }, []);

  if (!ui || !courseData) return null;

  const handleApplyNow = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    // Redirect to the professional checkout page we created earlier
    router.push(`/checkout/${ui.courseId}`);
  };

  const handleCounsellorClick = () => {
    const section = document.getElementById("need-help-course");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  return (
    <section className="relative h-[300px] sm:h-[380px] md:h-[400px] w-full overflow-hidden bg-gray-900">
      {/* Background Image with GSAP Ref */}
      <img
        ref={imageRef}
        src={ui.image}
        alt={courseData.name}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20">
        <div ref={textRef}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Professional Certification
          </div>

          <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-black leading-tight max-w-2xl">
            {ui.title}
          </h1>

          <p className="mt-3 text-gray-300 text-lg sm:text-xl max-w-xl">
            {ui.subtitle}{" "}
            <span className="text-purple-400 font-bold">
              {courseData.name}
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div ref={buttonRef} className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={handleApplyNow}
            className="group relative flex items-center justify-center bg-purple-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 overflow-hidden hover:cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Apply Now
              <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            {/* Glossy Button Shine Effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
          </button>

          <button
            onClick={handleCounsellorClick}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md
                      border border-white/20 text-white px-8 py-4 rounded-2xl
                      font-bold hover:bg-white hover:text-purple-900
                      transition-all duration-300 hover:cursor-pointer"
          >
            <Headphones size={20} />
            {ui.ctaSecondary}
          </button>

        </div>
      </div>

      {/* Course Badge for desktop */}
      <div className="hidden lg:block absolute bottom-10 right-20 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl animate-bounce-slow">
        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Starting from</p>
        <p className="text-white text-2xl font-black">₹{courseData.price}</p>
      </div>
    </section>
  );
};

export default CourseHero;