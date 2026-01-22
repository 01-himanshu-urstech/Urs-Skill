"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ArrowUpRight, Headphones, CheckCircle } from "lucide-react";
import { STATIC_COURSES } from "@/app/(root)/constants/constant";
import { useGetMyTransactionsQuery } from "@/store/api/transactionApi";
import toast from "react-hot-toast";
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
  const courseData = STATIC_COURSES[ui?.courseId];
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  
  const { data: txnData } = useGetMyTransactionsQuery(undefined, { skip: !isLoggedIn });

  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!ui || !courseData) return;

    const tl = gsap.timeline();
    tl.fromTo(imageRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.8, ease: "expo.out" })
      .fromTo(textRef.current?.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=1.2"
      )
      .fromTo(buttonRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5");
  }, [course, courseData, ui]);

  if (!ui || !courseData) return null;

  const handleApplyNow = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const isAlreadyEnrolled = txnData?.data?.transactions?.some(
      (txn) => String(txn.courseId) === String(ui.courseId) && txn.status === "SUCCESS"
    );

    if (isAlreadyEnrolled) {
      toast.error("You are already enrolled in this course!", {
        duration: 4000,
        position: "top-center",
        style: { background: "#8B19E6", color: "#fff", fontWeight: "bold" }
      });
      router.push("/profile");
      return;
    }

    router.push(`/checkout/${ui.courseId}`);
  };

  return (
    <section className="relative h-[450px] md:h-[550px] w-full overflow-hidden bg-[#0F0F1A]">
      {/* Background Image: Fixed Scaling */}
      <img
        ref={imageRef}
        src={ui.image}
        alt={courseData.name}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />

      {/* Modern Gradient Overlay: Adjusted for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F1A] via-[#0F0F1A]/80 to-transparent" />

      {/* 1440px MASTER ALIGNMENT: Synced with Navbar */}
      <div className="relative z-10 max-w-[1440px] mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        
        <div ref={textRef} className="max-w-3xl">
          {/* Theme-Oriented Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B19E6]"></span>
            </span>
            Professional Certification
          </div>

          {/* Unified Title Scaling */}
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-6">
            {ui.title} <br />
            <span className="text-[#8B19E6]">{ui.subtitle}</span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed max-w-xl border-l-2 border-[#8B19E6]/30 pl-6 mb-10">
            Master industry-critical skills with our <span className="text-white font-bold">{courseData.name}</span> track, designed for high-impact professional growth.
          </p>
        </div>

        {/* Action Buttons: Enhanced Micro-interactions */}
        <div ref={buttonRef} className="flex flex-wrap gap-4">
          <button
            onClick={handleApplyNow}
            className="group relative flex items-center gap-3 bg-[#8B19E6] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 hover:bg-[#7014ba] hover:shadow-[0_20px_40px_-10px_rgba(139,25,230,0.5)] active:scale-95 overflow-hidden"
          >
            Apply Now
            <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
          </button>

          <button
            onClick={() => document.getElementById("need-help-course")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#0F0F1A] transition-all duration-500"
          >
            <Headphones size={18} />
            {ui.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Premium Stats Badge */}
      <div className="hidden xl:flex absolute bottom-12 right-[8%] items-center gap-6 animate-fade-in">
        <div className="h-12 w-[1px] bg-white/10" />
        <div>
          <p className="text-[#8B19E6] text-[10px] font-black uppercase tracking-[0.2em] mb-1">Starting Investment</p>
          <p className="text-white text-3xl font-black tracking-tighter">₹{courseData.price}</p>
        </div>
        <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <CheckCircle size={12} className="text-green-500" /> Lifetime Access
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <CheckCircle size={12} className="text-green-500" /> Certificate
            </span>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;