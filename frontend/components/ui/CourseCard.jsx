import Image from "next/image";
import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <Link href={course.link} className="block">
      {/* OUTER CARD */}
      <div className=" group
  bg-[#12064C] rounded-[18px] p-[10px] h-[480px]
  transition-all duration-500 ease-out
  hover:-translate-y-2 hover:scale-[1.03]
  hover:shadow-[0_30px_80px_rgba(109,74,255,0.35)]">

        {/* INNER CARD */}
        <div className="flex flex-col h-full rounded-[18px] overflow-hidden">

          {/* TOP IMAGE */}
          <div className="relative w-full h-[180px] flex-shrink-0">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12064C]/70 via-transparent to-transparent" />
          </div>

          {/* CONTENT AREA */}
          <div className="flex flex-col px-[10px] h-[260px]">

            {/* CATEGORY */}
            <div className="mt-[12px] text-[#D6C9FF] font-semibold text-[13px] tracking-wide line-clamp-1">
              {course.category}
            </div>

            {/* ELIGIBILITY */}
            <div className="text-[#FE9900] font-bold text-[13px] mt-[6px]">
              UG / PG | 0–5 YRS WORK EX
            </div>

            {/* INFO GRID */}
            <div className="mt-[14px] grid grid-cols-2 gap-y-[16px] text-white">
              <InfoItem
                title={course.duration}
                subtitle="incl. internship"
                icon="/icons/clock.svg"
              />
              <InfoItem
                title="Hybrid"
                subtitle="Weekend / Weekdays"
                icon="/icons/immersion.svg"
              />
              <InfoItem
                title="Campus"
                subtitle="Gurugram"
                icon="/icons/location.webp"
              />
              <InfoItem
                title="Starts"
                subtitle="Feb ’26"
                icon="/icons/calender.svg"
              />
            </div>

            {/* CTA */}
            <div className="mt-auto pt-[6px]">
              <div className="h-[46px] rounded-[999px] bg-[#FE9900] hover:bg-[#FFAA2B] flex items-center justify-center gap-[10px] transition-all duration-300">
                <span className="text-white font-semibold text-[15px]">
                  Learn More
                </span>

                <div className=" w-[28px] h-[28px]
  bg-white rounded-full
  flex items-center justify-center
  transition-transform duration-300
  group-hover:translate-x-1">
                  <svg
                    className="w-[14px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2C2C2C"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Link>
  );
}

/* INFO ITEM */
function InfoItem({ title, subtitle, icon }) {
  return (
    <div className="flex gap-[10px] items-start">
      <div className="w-[28px] h-[28px] relative flex-shrink-0">
        <Image src={icon} alt="" fill />
      </div>
      <div className="text-[12px] leading-[14px] h-[28px]">
        <div className="font-semibold whitespace-nowrap">{title}</div>
        <div className="opacity-70 whitespace-nowrap">{subtitle}</div>
      </div>
    </div>
  );
}
