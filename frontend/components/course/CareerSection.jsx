"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const roles = [
    { title: "Business Analyst" },
    { title: "Media & Performance Analyst" },
    {
        title: "Growth Analyst",
        description:
            "In the current scenario, Marketers devise their strategies based on consumer data. This makes the role of a growth analyst at the center stage, with their core responsibilities being data-centric.",
        points: [
            "Analyse complex data to devise marketing strategies",
            "Conduct experiments to test hypotheses to evaluate growth strategies",
            "Create dashboards to draw insights and present it to stakeholders",
        ],
        image:
            "https://assets.digiaccel.in/website/images/bootcamp/graphs/growth-analyst-2.webp",
    },
    { title: "eCommerce Analyst" },
    { title: "Operations Analyst" },
];

export default function CareerSection() {
    const [active, setActive] = useState(2);

    return (
        <section className="bg-[#2D1B47] py-16 px-[5%] 
                    pl-6 sm:pl-10 md:pl-16 lg:pl-24 
                    text-white">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-[1.75em] md:text-[2em] font-medium leading-[130%]">
                Open Doors to a Range of Careers
            </h2>

            <p className="mt-3 text-sm md:text-[0.95rem] text-white/70">
                Target Analyst (or Equivalent) Roles in Different Sectors
            </p>

            <p className="mt-2 text-xs md:text-sm text-white/50">
                The program is aimed at early career Analyst roles. Expected average CTC is
                in the 6 LPA to 7 LPA range
            </p>
            </div>


            {/* Slider */}
            <div className="flex gap-2 overflow-hidden">
                {roles.map((role, index) => (
                    <div
                        key={index}
                        onClick={() => setActive(index)}
                        className={`
              h-[18.75em]
              flex-none
              cursor-pointer
              border border-white/20
              transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${index === active
                                ? "w-[60%] bg-[#4C2A85]"
                                : "w-[5.5em] bg-[#231432] hover:bg-[#362050]"
                            }
            `}
                    >
                        {index === active ? (
                            <div className="flex h-full">
                                {/* Content */}
                                <div className="flex-1 p-8 flex flex-col justify-center">
                                    <h3 className="text-xl font-bold mb-3">{role.title}</h3>

                                    {role.description && (
                                        <p className="text-sm text-white/80 mb-6">
                                            {role.description}
                                        </p>
                                    )}

                                    <ul className="space-y-3">
                                        {role.points?.map((point, i) => (
                                            <li
                                                key={i}
                                                className="flex gap-3 text-sm text-white/70"
                                            >
                                                <span className="w-3 h-3 bg-purple-500 rounded-full mt-1" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Image */}
                                {role.image && (
                                    <div className="w-[40%] bg-[#F3E8FF] flex items-center justify-center p-4">
                                        <img
                                            src={role.image}
                                            alt={role.title}
                                            className="max-h-full object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div
                                className="h-full flex items-center justify-center font-semibold tracking-wide text-white/80"
                                style={{
                                    writingMode: "vertical-rl",
                                    transform: "rotate(180deg)",
                                }}
                            >
                                {role.title}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-5 mt-10">
                <button
                    onClick={() =>
                        setActive(active === 0 ? roles.length - 1 : active - 1)
                    }
                    className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center transition"
                >
                    <ArrowLeft size={18} />
                </button>

                <div className="flex gap-2">
                    {roles.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`h-2 rounded-full transition-all ${i === active
                                    ? "bg-purple-400 w-6"
                                    : "bg-white/20 w-2"
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() =>
                        setActive(active === roles.length - 1 ? 0 : active + 1)
                    }
                    className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center transition"
                >
                    <ArrowRight size={18} />
                </button>
            </div>
        </section>
    );
}
