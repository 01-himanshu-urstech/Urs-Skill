"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ArrowUpRight } from "lucide-react";
import { useCreateTransactionMutation } from "@/store/api/transactionApi";

const HERO_DATA = {
  fullstack: {
    title: "Upskill & Launch your Career",
    subtitle: "as a Full Stack Developer",
    highlight: "Full Stack Development",
    image: "/courses/full-stack-hero.webp",
    ctaPrimary: "Apply Now",
    ctaSecondary: "Speak to a Counsellor",
    courseId: 1,
  },
  mba: {
    title: "Become a Business Leader",
    subtitle: "with AI-Powered Management Skills",
    highlight: "Business Administration",
    image: "/courses/mba-hero.webp",
    ctaPrimary: "Apply Now",
    ctaSecondary: "Talk to an Advisor",
    courseId: 2,
  },
};

const CourseHero = ({ course = "fullstack" }) => {
  const router = useRouter();
  const data = HERO_DATA[course];

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [createTransaction, { isLoading }] =
    useCreateTransactionMutation();

  if (!data) return null;

  const handleApplyNow = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    try {
      const res = await createTransaction({
        courseId: data.courseId,
        couponCode: null,
      }).unwrap();

      const { paymentSessionId } = res.data;
      const cashfree = new window.Cashfree({ mode: "sandbox" });

      cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (err) {
      alert(err?.data?.message || "Unable to start payment");
    }
  };

  return (
    <section className="relative h-[280px] sm:h-[340px] md:h-[320px] w-full overflow-hidden">
      {/* Background */}
      <img
        src={data.image}
        alt={data.highlight}
        className="absolute inset-0 h-full w-full object-cover scale-105 animate-slow-zoom"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-20">
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold leading-tight animate-fade-up">
          {data.title}
        </h1>

        <p className="mt-2 text-white text-md sm:text-lg md:text-xl animate-fade-up delay-100">
          {data.subtitle}{" "}
          <span className="text-orange-400 italic">
            {data.highlight}
          </span>
        </p>

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 animate-fade-up delay-200">
          {/* Apply Now */}
          <button
            onClick={handleApplyNow}
            disabled={isLoading}
            className="
              group relative inline-flex items-center justify-center
              bg-orange-500 text-white
              px-7 py-3 rounded-full font-medium
              transition-all duration-300
              hover:bg-orange-600 hover:scale-105
              active:scale-95
              disabled:opacity-60
            "
          >
            <span className="mr-2">
              {isLoading ? "Processing..." : data.ctaPrimary}
            </span>

            {/* Animated Arrow */}
            <ArrowUpRight
              size={18}
              className="
                transition-transform duration-300
                group-hover:translate-x-1 group-hover:-translate-y-1
                group-hover:rotate-12
              "
            />

            {/* Glow */}
            <span className="
              absolute inset-0 rounded-full
              bg-orange-400 opacity-0
              group-hover:opacity-20 blur-xl
              transition
            " />
          </button>

          {/* Secondary CTA */}
          <a
            href="#need-help-course"
            className="
              bg-white text-black
              px-7 py-3 rounded-full font-medium
              text-center
              hover:bg-gray-100 hover:scale-105
              transition-all duration-300
            "
          >
            {data.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
