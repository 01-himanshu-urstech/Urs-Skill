import MetaItem, { MobileItem } from "@/components/course/CourseMetaItem";
import { FiClock, FiMonitor, FiMapPin, FiCalendar } from "react-icons/fi";

/* ================= COURSE META CONFIG ================= */

const COURSE_META_DATA = {
  fullstack: {
    heading: "Full Stack Development",
    subheading: "in eCommerce & Marketing",
    description:
      "Designed for graduates and early career professionals aspiring to get into Analytics, Media and eCommerce",
    meta: [
      {
        title: "Duration",
        main: "9 Months",
        sub: "incl. internship",
        icon: FiClock,
      },
      {
        title: "Mode",
        main: "Weekend On-Campus",
        sub: "Weekdays Hybrid",
        icon: FiMonitor,
      },
      {
        title: "Location",
        main: "Urs skill",
        sub: "15th floor,sec 96 noida",
        icon: FiMapPin,
      },
      {
        title: "Program Commences",
        main: "February",
        sub: "2026",
        icon: FiCalendar,
      },
    ],
  },

  mba: {
    heading: "Business Administration & Management",
    subheading: "AI-Powered MBA-Pro Program",
    description:
      "Built for professionals aiming to move into leadership, strategy and management roles.",
    meta: [
      {
        title: "Duration",
        main: "6–8 Months",
        sub: "flexible schedule",
        icon: FiClock,
      },
      {
        title: "Mode",
        main: "Hybrid Learning",
        sub: "Weekend / Weekdays",
        icon: FiMonitor,
      },
      {
        title: "Location",
        main: "urs skill",
        sub: "15th floor,sec 96 noida",
        icon: FiMapPin,
      },
      {
        title: "Program Commences",
        main: "March",
        sub: "2026",
        icon: FiCalendar,
      },
    ],
  },
};

/* ================= COMPONENT ================= */

const CourseMeta = ({ course = "fullstack" }) => {
  const data = COURSE_META_DATA[course];
  if (!data) return null;

  return (
    <section className="bg-[#FCF9EF] py-[2.5em] sm:py-[3.12em] md:py-[3.12em]">
      <div className="max-w-[1200px] mx-auto px-[5em] sm:px-[1em] md:px-[1em]">

        {/* ===== Heading ===== */}
        <div className="flex flex-row sm:flex-col md:flex-col items-start gap-[1.87em] sm:gap-0 md:gap-0">

          {/* Left */}
          <div className="w-[60%] sm:w-full md:w-full">
            <h1 className="text-[#292F1F] font-playfair text-[2.5em] sm:text-[1.75em] md:text-[1.75em] italic sm:not-italic md:not-italic font-[800] leading-[1.35]">
              {data.heading}
            </h1>

            <p className="text-[#292F1F] font-jakarta font-[400] text-[1.5em] sm:text-[1em] md:text-[1em] mt-[0.3em]">
              {data.subheading}
            </p>
          </div>

          {/* Right */}
          <p className="w-[40%] sm:w-full md:w-full text-[1.125em] sm:text-[0.87em] md:text-[0.87em] text-[rgba(44,44,44,0.60)] font-nunito leading-[160%]">
            {data.description}
          </p>
        </div>

        {/* ===== Divider (Desktop only) ===== */}
        <div className="w-full mt-[2.75em] mb-[1.5em] sm:hidden md:hidden">
          <svg width="100%" height="1">
            <path
              d="M0 0.5H1280"
              stroke="#3B432C"
              strokeOpacity="0.2"
              strokeDasharray="5 5"
            />
          </svg>
        </div>

        {/* ===== Desktop Meta ===== */}
        <div className="hidden sm:grid md:grid grid-cols-4 gap-[2.5em] mt-[2.75em]">
          {data.meta.map((item, idx) => (
            <MetaItem key={idx} {...item} />
          ))}
        </div>

        {/* ===== Mobile Meta ===== */}
        <div className="sm:hidden md:hidden mt-[1.5em] grid grid-cols-2 bg-white border border-black/10 rounded-[0.3em] overflow-hidden">
          {data.meta.map((item, idx) => (
            <MobileItem key={idx} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CourseMeta;
