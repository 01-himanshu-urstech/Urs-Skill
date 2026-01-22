import { FiClock, FiMonitor, FiMapPin, FiCalendar } from "react-icons/fi";

/* ================= COURSE META CONFIG ================= */

const COURSE_META_DATA = {
  fullstack: {
    heading: "Full Stack Development",
    subheading: "in eCommerce & Marketing",
    description:
      "Designed for graduates and early career professionals aspiring to get into high-growth roles in Analytics, Media and global eCommerce ecosystems.",
    meta: [
      { title: "Duration", main: "9 Months", sub: "Incl. Internship", icon: FiClock },
      { title: "Mode", main: "Hybrid Learning", sub: "Weekend On-Campus", icon: FiMonitor },
      { title: "Location", main: "Urs Skill", sub: "Noida, Sector 96", icon: FiMapPin },
      { title: "Commences", main: "February", sub: "2026", icon: FiCalendar },
    ],
  },
  mba: {
    heading: "Business Administration",
    subheading: "AI-Powered MBA-Pro Program",
    description:
      "Built for ambitious professionals aiming to move into leadership, strategy and management roles within the modern AI economy.",
    meta: [
      { title: "Duration", main: "6–8 Months", sub: "Flexible Schedule", icon: FiClock },
      { title: "Mode", main: "Hybrid Learning", sub: "Weekend / Weekdays", icon: FiMonitor },
      { title: "Location", main: "Urs Skill", sub: "Noida, Sector 96", icon: FiMapPin },
      { title: "Commences", main: "March", sub: "2026", icon: FiCalendar },
    ],
  },
};

/* ================= COMPONENT ================= */

const CourseMeta = ({ course = "fullstack" }) => {
  const data = COURSE_META_DATA[course];
  if (!data) return null;

  return (
    <section className="bg-white py-12 md:py-20 border-b border-gray-100">
      {/* ALIGNMENT: Synced with Navbar (1440px) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20">
          {/* Header Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-purple-50 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-100">
                • Program Overview
              </span>
            </div>
            {/* Unified Title Scale: 3xl to 5xl */}
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              {data.heading} <br />
              <span className="text-[#8B19E6]">{data.subheading}</span>
            </h2>
          </div>

          {/* Description Content */}
          <div className="lg:w-1/3 pt-2">
            <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed border-l-2 border-purple-100 pl-6">
              {data.description}
            </p>
          </div>
        </div>

        {/* STATS GRID: Premium Info-Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16">
          {data.meta.map((item, idx) => (
            <div 
              key={idx} 
              className="group p-6 rounded-[2rem] bg-[#FAFAFB] border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-purple-100/50 hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-50 flex items-center justify-center text-[#8B19E6] mb-6 group-hover:bg-[#8B19E6] group-hover:text-white transition-all">
                <item.icon size={20} />
              </div>
              
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {item.title}
                </p>
                <h4 className="text-base md:text-lg font-bold text-gray-900">
                  {item.main}
                </h4>
                <p className="text-xs font-medium text-gray-500">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CourseMeta;