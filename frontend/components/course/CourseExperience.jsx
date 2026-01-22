import Image from 'next/image';

const CourseExperience = () => {
    return (
        <section className="bg-white overflow-hidden py-16 md:py-24 border-b border-gray-100">
            {/* ALIGNMENT: Pixel-perfect sync with 1440px Navbar */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER: Defined with Classic Typography */}
                <div className="mb-12 md:mb-16 text-left">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="inline-block px-3 py-1 bg-purple-50 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-100">
                            • Learning Journey
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                        What will you <span className="text-[#8B19E6]">experience</span> <br />
                        with Full Stack Development?
                    </h2>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                    
                    {/* ORIGINAL SVG TIMELINE: RESTORED & ALIGNED */}
                    <div className="flex justify-between items-center mb-6 px-1">
                        {/* Term 1 - Purple Focus */}
                        <div className="relative flex-1">
                            <svg viewBox="0 0 252 70" fill="none" className="w-full h-auto drop-shadow-sm">
                                <path d="M0 12C0 5.37258 5.37258 0 12 0H216.778C220.011 0 223.107 1.3043 225.365 3.61756L247.817 26.6176C252.368 31.2794 252.368 38.7206 247.817 43.3824L225.365 66.3824C223.107 68.6957 220.011 70 216.778 70H12C5.37257 70 0 64.6274 0 58V12Z" fill="#8B19E6" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <div className="text-[11px] font-black tracking-[0.2em]">TERM 1</div>
                                <div className="text-[10px] opacity-70 font-bold uppercase mt-1">Months 1 & 2</div>
                            </div>
                        </div>

                        {/* Term 2 */}
                        <div className="relative flex-1 -ml-4">
                            <svg viewBox="0 0 259 70" fill="none" className="w-full h-auto opacity-90">
                                <path d="M1.0977 6.74406C-1.30828 4.19227 0.50086 0 4.00805 0H224.517C227.75 0 230.846 1.3043 233.104 3.61756L255.556 26.6176C260.107 31.2794 260.107 38.7206 255.556 43.3824L233.104 66.3824C230.846 68.6957 227.75 70 224.517 70H4.00803C0.500842 70 -1.30829 65.8077 1.09769 63.256L19.9773 43.2322C24.3358 38.6094 24.3358 31.3906 19.9773 26.7678L1.0977 6.74406Z" fill="#1F2937" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <div className="text-[11px] font-black tracking-[0.2em]">TERM 2</div>
                                <div className="text-[10px] opacity-60 font-bold uppercase mt-1">Months 3 & 4</div>
                            </div>
                        </div>

                        {/* Term 3 */}
                        <div className="relative flex-1 -ml-4">
                            <svg viewBox="0 0 259 70" fill="none" className="w-full h-auto opacity-80">
                                <path d="M1.09745 6.74406C-1.30852 4.19227 0.500616 0 4.0078 0H224.517C227.749 0 230.845 1.3043 233.104 3.61756L255.556 26.6176C260.107 31.2794 260.107 38.7206 255.556 43.3824L233.104 66.3824C230.845 68.6957 227.749 70 224.517 70H4.00779C0.500597 70 -1.30853 65.8077 1.09745 63.256L19.977 43.2322C24.3356 38.6094 24.3356 31.3906 19.977 26.7678L1.09745 6.74406Z" fill="#374151" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <div className="text-[11px] font-black tracking-[0.2em]">TERM 3</div>
                                <div className="text-[10px] opacity-60 font-bold uppercase mt-1">Months 5 & 6</div>
                            </div>
                        </div>

                        {/* Internship */}
                        <div className="relative flex-1 -ml-4">
                            <svg viewBox="0 0 259 70" fill="none" className="w-full h-auto opacity-70">
                                <path d="M1.09745 6.74406C-1.30852 4.19227 0.500616 0 4.0078 0H224.517C227.749 0 230.845 1.3043 233.104 3.61756L255.556 26.6176C260.107 31.2794 260.107 38.7206 255.556 43.3824L233.104 66.3824C230.845 68.6957 227.749 70 224.517 70H4.00779C0.500597 70 -1.30853 65.8077 1.09745 63.256L19.977 43.2322C24.3356 38.6094 24.3356 31.3906 19.977 26.7678L1.09745 6.74406Z" fill="#4B5563" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <div className="text-[11px] font-black tracking-[0.2em]">INTERNSHIP</div>
                                <div className="text-[10px] opacity-60 font-bold uppercase mt-1">Months 7 - 9</div>
                            </div>
                        </div>

                        {/* Placements */}
                        <div className="relative flex-1 -ml-4">
                            <svg viewBox="0 0 254 70" fill="none" className="w-full h-auto opacity-60">
                                <path d="M1.09745 6.74406C-1.30852 4.19227 0.500616 0 4.0078 0H241.629C248.234 0 253.598 5.33782 253.629 11.9429L253.739 35L253.629 58.0571C253.598 64.6622 248.234 70 241.629 70H4.00779C0.500603 70 -1.30853 65.8077 1.09745 63.256L19.977 43.2322C24.3356 38.6094 24.3356 31.3906 19.977 26.7678L1.09745 6.74406Z" fill="#111827" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <div className="text-[11px] font-black tracking-[0.2em]">PLACEMENT</div>
                                <div className="text-[10px] opacity-60 font-bold uppercase mt-1">Months 10+</div>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT GRID */}
                    <div className="flex gap-4">
                        <ExperienceCard 
                            borderColor="border-orange-500" 
                            bgColor="bg-orange-50/30"
                            title="Build Foundations"
                            items={["Advanced Excel", "Marketing Basics", "Media Basics"]}
                            image="/courses/experience-with-digiaccel-1.webp"
                        />
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="flex gap-4">
                                <ExperienceCard borderColor="border-orange-400" bgColor="bg-gray-50" title="Functional Skills" items={["Media Planning", "Digital Media"]} />
                                <ExperienceCard borderColor="border-orange-400" bgColor="bg-gray-50" title="Advanced Skills" items={["eCommerce Ads", "Visualization"]} />
                                <ExperienceCard borderColor="border-[#8B19E6]" bgColor="bg-purple-50/30" title="Internship" items={["Hands-on Work", "Paid Stipend"]} />
                            </div>
                            <div className="flex gap-4">
                                <ExperienceCard borderColor="border-[#8B19E6]" bgColor="bg-gray-50" title="Placement Prep" items={["CV & Mentorship", "Career Path"]} />
                                <ExperienceCard borderColor="border-[#8B19E6]" bgColor="bg-gray-50" title="Interviews" items={["Mock Drills", "Partner Hiring"]} />
                                <ExperienceCard borderColor="border-[#8B19E6]" bgColor="bg-gray-50" title="Readiness" items={["Industry Mentor", "Final Review"]} />
                            </div>
                        </div>
                        <div className="w-1/5 rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl shadow-purple-100" 
                             style={{ background: 'linear-gradient(144deg, #8B19E6 0%, #6b16b4 100%)' }}>
                            <p className="text-3xl font-black text-white leading-tight italic">
                                <span className="not-italic font-light opacity-80 text-xl">Start</span><br />
                                Your<br />
                                Career
                            </p>
                            <img src="/courses/experience-with-digiaccel-2-mobile.webp" alt="Go" className="w-full rounded-2xl grayscale brightness-110" />
                        </div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden">
                    <div className="rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl">
                        <img src="/courses/curriculum-mobile.webp" alt="Curriculum" className="w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const ExperienceCard = ({ borderColor, bgColor, title, items, image }) => (
    <div className={`flex-1 border-l-4 ${borderColor} ${bgColor} rounded-[2rem] p-6 flex flex-col gap-4 transition-all duration-500 hover:bg-white hover:shadow-xl hover:-translate-y-1 group`}>
        <p className="text-gray-900 text-xs font-black uppercase tracking-widest">{title}</p>
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="text-[11px] font-bold text-gray-500 leading-tight flex items-start gap-2">
                    <span className="text-[#8B19E6] opacity-50 group-hover:opacity-100 transition-opacity">•</span> {item}
                </li>
            ))}
        </ul>
        {image && <img src={image} alt="Step" className="w-full object-cover rounded-xl mt-auto shadow-sm" />}
    </div>
);

export default CourseExperience;