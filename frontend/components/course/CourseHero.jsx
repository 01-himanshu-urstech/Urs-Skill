"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ArrowUpRight, Headphones, ShieldCheck } from "lucide-react";
import { STATIC_COURSES } from "@/app/(root)/constants/constant";
import gsap from "gsap";

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

  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(imageRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.8, ease: "expo.out" })
      .fromTo(textRef.current?.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=1.2"
      )
      .fromTo(buttonRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4");
  }, []);

  if (!ui || !courseData) return null;

  const handleApplyNow = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    router.push(`/checkout/${ui.courseId}`);
  };

  const handleCounsellorClick = () => {
    const section = document.getElementById("need-help-course");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[400px] md:min-h-[500px] w-full overflow-hidden bg-white border-b border-gray-100">
      {/* BACKGROUND: Soft wash instead of harsh black */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src={ui.image}
          alt={courseData.name}
          className="h-full w-full object-cover grayscale opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>

      {/* ALIGNMENT: Pixel-perfect sync with Navbar grid */}
      <div className="relative z-10 max-w-[1440px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center pt-20 pb-16">
        
        <div className="max-w-3xl">
          <div ref={textRef} className="space-y-6">
            {/* Unified Badge Style */}
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 bg-purple-50 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-100">
                • {courseData.category || "Professional Program"}
              </span>
            </div>

            {/* Universal Title Scaling */}
            <h1 className="text-4xl md:text-4xl font-bold text-gray-900 tracking-tight leading-[1.1]">
              {ui.title} <br />
              <span className="text-[#8B19E6] ">{ui.subtitle}</span>
            </h1>

            <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed max-w-xl border-l border-gray-100 pl-6">
              Master industry-critical skills with our <span className="text-gray-900 font-bold">{courseData.name}</span> track, designed for high-impact professional growth.
            </p>

            {/* Action Buttons: Synced with Need Help form style */}
            <div ref={buttonRef} className="pt-8 flex flex-wrap gap-4">
              <button
                onClick={handleApplyNow}
                className="group flex items-center justify-center bg-[#8B19E6] text-white px-10 py-4 rounded-2xl font-bold transition-all duration-500 hover:bg-[#7014ba] hover:shadow-xl hover:shadow-purple-100 active:scale-95 hover:cursor-pointer"
              >
                Enroll Now
                <ArrowUpRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <button
                onClick={handleCounsellorClick}
                className="flex items-center gap-3 bg-white border border-gray-200 text-gray-600 px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 hover:text-gray-900 transition-all duration-500 hover:cursor-pointer"
              >
                <Headphones size={20} className="text-[#8B19E6]" />
                {ui.ctaSecondary}
              </button>
            </div>
          </div>
        </div>

        {/* Floating Course Stats for Premium Look */}
        <div className="hidden xl:flex absolute right-16 bottom-20 flex-col gap-4">
            <div className="bg-white/80 backdrop-blur-md border border-gray-100 p-6 rounded-[2rem] shadow-xl shadow-gray-100/50">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-[#8B19E6]">
                        <ShieldCheck size={18} />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pricing</span>
                </div>
                <p className="text-3xl font-black text-gray-900 tracking-tighter">₹{courseData.price}</p>
                <p className="text-[9px] font-bold text-[#8B19E6] uppercase tracking-widest mt-1">Inclusive of GST</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;