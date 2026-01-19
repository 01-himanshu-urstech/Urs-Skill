"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useCreateTransactionMutation } from "@/store/api/transactionApi";

const HERO_DATA = {
  fullstack: {
    title: "Upskill & Launch your Career",
    subtitle: "as a Full Stack Developer",
    highlight: "Full Stack Development",
    image: "/courses/full-stack-hero.webp",
    ctaPrimary: "Apply Now",
    ctaSecondary: "Speak to a Counsellor",
    courseId: 1, // ✅ static course id
  },
  mba: {
    title: "Become a Business Leader",
    subtitle: "with AI-Powered Management Skills",
    highlight: "Business Administration",
    image: "/courses/mba-hero.webp",
    ctaPrimary: "Apply Now",
    ctaSecondary: "Talk to an Advisor",
    courseId: 2, // ✅ static course id
  },
};

const CourseHero = ({ course = "fullstack" }) => {
  const router = useRouter();
  const data = HERO_DATA[course];

 const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const [createTransaction, { isLoading }] =
    useCreateTransactionMutation();

  if (!data) return null;

  /* ================= APPLY NOW HANDLER ================= */
  const handleApplyNow = async () => {
    // 🔒 AUTH GUARD
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    try {
      const res = await createTransaction({
        courseId: data.courseId,
        couponCode: null, // later you can pass applied coupon
      }).unwrap();

      const { paymentSessionId } = res.data;

      // 🔥 Open Cashfree Checkout
      const cashfree = new window.Cashfree({ mode: "sandbox" });

      cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (err) {
      console.error("Payment error:", err);
      alert(err?.data?.message || "Unable to start payment");
    }
  };

  return (
    <section className="relative h-[300px] sm:h-[350px] md:h-[300px] w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={data.image}
        alt={`${data.highlight} Banner`}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto h-full flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-24">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
          {data.title}
        </h1>

        <p className="mt-2 text-white text-lg sm:text-xl md:text-2xl">
          {data.subtitle}{" "}
          <span className="text-orange-400 italic">{data.highlight}</span>
        </p>

        {/* CTA */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleApplyNow}
            disabled={isLoading}
            className="bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors disabled:opacity-60"
          >
            {isLoading ? "Processing..." : data.ctaPrimary}
          </button>

          <a
            href="#need-help-course"
            className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors text-center"
          >
            {data.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
