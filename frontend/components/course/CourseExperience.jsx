import Image from 'next/image';

const CourseExperience = () => {
    return (
        <section className="bg-[#FCF9EF] overflow-hidden py-12 sm:py-16">
            <div className="max-w-[1200px] mx-auto px-6 sm:px-4">

                {/* Header */}
                <div className="text-center sm:text-start mb-8 sm:mb-12">
                    <h2 className="text-[#000] text-3xl sm:text-2xl font-jakarta font-light sm:font-light leading-[135%]">
                        <span className="font-semibold sm:font-bold">What will you experience</span>
                        <br />
                        with Full Stack Development?
                    </h2>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                    {/* Timeline Header */}
                    <div className="bg-white rounded-lg border border-[#EBE3D5] p-8 mb-4">
                        <div className="flex justify-between items-center">
                            {/* Term 1 */}
                            <div className="relative flex-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 252 70" fill="none" className="w-full h-auto">
                                    <path d="M0 12C0 5.37258 5.37258 0 12 0H216.778C220.011 0 223.107 1.3043 225.365 3.61756L247.817 26.6176C252.368 31.2794 252.368 38.7206 247.817 43.3824L225.365 66.3824C223.107 68.6957 220.011 70 216.778 70H12C5.37257 70 0 64.6274 0 58V12Z" fill="#7C3AED" />
                                    <path d="M0 12C0 5.37258 5.37258 0 12 0H216.778C220.011 0 223.107 1.3043 225.365 3.61756L247.817 26.6176C252.368 31.2794 252.368 38.7206 247.817 43.3824L225.365 66.3824C223.107 68.6957 220.011 70 216.778 70H12C5.37257 70 0 64.6274 0 58V12Z" fill="white" fillOpacity="0.36" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                    <div className="text-base font-medium font-jakarta tracking-wide">TERM 1</div>
                                    <div className="text-sm text-white/60 font-medium opacity-90 mt-1">Months 1 & 2</div>
                                </div>
                            </div>

                            {/* Term 2 */}
                            <div className="relative flex-1 -ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259 70" fill="none" className="w-full h-auto">
                                    <path d="M1.0977 6.74406C-1.30828 4.19227 0.50086 0 4.00805 0H224.517C227.75 0 230.846 1.3043 233.104 3.61756L255.556 26.6176C260.107 31.2794 260.107 38.7206 255.556 43.3824L233.104 66.3824C230.846 68.6957 227.75 70 224.517 70H4.00803C0.500842 70 -1.30829 65.8077 1.09769 63.256L19.9773 43.2322C24.3358 38.6094 24.3358 31.3906 19.9773 26.7678L1.0977 6.74406Z" fill="#3B432C" />
                                    <path d="M1.0977 6.74406C-1.30828 4.19227 0.50086 0 4.00805 0H224.517C227.75 0 230.846 1.3043 233.104 3.61756L255.556 26.6176C260.107 31.2794 260.107 38.7206 255.556 43.3824L233.104 66.3824C230.846 68.6957 227.75 70 224.517 70H4.00803C0.500842 70 -1.30829 65.8077 1.09769 63.256L19.9773 43.2322C24.3358 38.6094 24.3358 31.3906 19.9773 26.7678L1.0977 6.74406Z" fill="white" fillOpacity="0.27" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                    <div className="text-base font-medium font-jakarta tracking-wide">TERM 2</div>
                                    <div className="text-sm text-white/60 font-medium opacity-90 mt-1">Months 3 & 4</div>
                                </div>
                            </div>

                            {/* Term 3 */}
                            <div className="relative flex-1 -ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259 70" fill="none" className="w-full h-auto">
                                    <path d="M1.09745 6.74406C-1.30852 4.19227 0.500616 0 4.0078 0H224.517C227.749 0 230.845 1.3043 233.104 3.61756L255.556 26.6176C260.107 31.2794 260.107 38.7206 255.556 43.3824L233.104 66.3824C230.845 68.6957 227.749 70 224.517 70H4.00779C0.500597 70 -1.30853 65.8077 1.09745 63.256L19.977 43.2322C24.3356 38.6094 24.3356 31.3906 19.977 26.7678L1.09745 6.74406Z" fill="#3B432C" />
                                    <path d="M1.09745 6.74406C-1.30852 4.19227 0.500616 0 4.0078 0H224.517C227.749 0 230.845 1.3043 233.104 3.61756L255.556 26.6176C260.107 31.2794 260.107 38.7206 255.556 43.3824L233.104 66.3824C230.845 68.6957 227.749 70 224.517 70H4.00779C0.500597 70 -1.30853 65.8077 1.09745 63.256L19.977 43.2322C24.3356 38.6094 24.3356 31.3906 19.977 26.7678L1.09745 6.74406Z" fill="white" fillOpacity="0.2" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                    <div className="text-base font-medium font-jakarta tracking-wide">TERM 3</div>
                                    <div className="text-sm text-white/60 font-medium opacity-90 mt-1">Months 5 & 6</div>
                                </div>
                            </div>

                            {/* Internship */}
                            <div className="relative flex-1 -ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259 70" fill="none" className="w-full h-auto">
                                    <path d="M1.09745 6.74406C-1.30852 4.19227 0.500616 0 4.0078 0H224.517C227.749 0 230.845 1.3043 233.104 3.61756L255.556 26.6176C260.107 31.2794 260.107 38.7206 255.556 43.3824L233.104 66.3824C230.845 68.6957 227.749 70 224.517 70H4.00779C0.500597 70 -1.30853 65.8077 1.09745 63.256L19.977 43.2322C24.3356 38.6094 24.3356 31.3906 19.977 26.7678L1.09745 6.74406Z" fill="#3B432C" />
                                    <path d="M1.09745 6.74406C-1.30852 4.19227 0.500616 0 4.0078 0H224.517C227.749 0 230.845 1.3043 233.104 3.61756L255.556 26.6176C260.107 31.2794 260.107 38.7206 255.556 43.3824L233.104 66.3824C230.845 68.6957 227.749 70 224.517 70H4.00779C0.500597 70 -1.30853 65.8077 1.09745 63.256L19.977 43.2322C24.3356 38.6094 24.3356 31.3906 19.977 26.7678L1.09745 6.74406Z" fill="white" fillOpacity="0.1" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                    <div className="text-base font-medium font-jakarta tracking-wide">INTERNSHIP</div>
                                    <div className="text-sm text-white/60 font-medium opacity-90 mt-1">Months 7 to 9</div>
                                </div>
                            </div>

                            {/* Final Placements */}
                            <div className="relative flex-1 -ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 254 70" fill="none" className="w-full h-auto">
                                    <path d="M1.09745 6.74406C-1.30852 4.19227 0.500616 0 4.0078 0H241.629C248.234 0 253.598 5.33782 253.629 11.9429L253.739 35L253.629 58.0571C253.598 64.6622 248.234 70 241.629 70H4.00779C0.500603 70 -1.30853 65.8077 1.09745 63.256L19.977 43.2322C24.3356 38.6094 24.3356 31.3906 19.977 26.7678L1.09745 6.74406Z" fill="#3B432C" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                    <div className="text-base font-medium font-jakarta tracking-wide">FINAL PLACEMENTS</div>
                                    <div className="text-sm text-white/60 font-medium opacity-90 mt-1">Month 10 onwards</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="flex gap-2">
                        {/* Left Column - Term 1 with Image */}
                        <div className="w-1/5">
                            <div className="border-l-4 border-orange-500 bg-orange-50 rounded-lg p-4 h-full flex flex-col gap-4">
                                <p className="text-[#2C2C2C] text-sm font-bold leading-[140%] font-jakarta">
                                    Build your<br />Foundational Skills
                                </p>
                                <ul className="flex flex-col gap-2">
                                    <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                        <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                        <span>Advanced Excel and Analytics</span>
                                    </li>
                                    <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                        <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                        <span>Marketing Basics</span>
                                    </li>
                                    <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                        <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                        <span>Media Basics</span>
                                    </li>
                                </ul>
                                <img src="/courses/experience-with-digiaccel-1.webp" alt="Classroom" className="w-full object-cover rounded mt-auto" />
                            </div>
                        </div>

                        {/* Middle Columns */}
                        <div className="flex-1 flex flex-col gap-1">
                            {/* Top Row - Terms 2 & 3 */}
                            <div className="flex gap-2">
                                <div className="flex-1 border-l-4 border-orange-500 bg-orange-50 rounded-lg p-4">
                                    <p className="text-[#2C2C2C] text-sm font-bold leading-[140%] font-jakarta mb-3">
                                        Build your Functional Skills
                                    </p>
                                    <ul className="flex flex-col gap-2">
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Media Planning & Analytics</span>
                                        </li>
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Digital Media</span>
                                        </li>
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Advertising Management</span>
                                        </li>
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Growth Marketing</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex-1 border-l-4 border-orange-500 bg-orange-50 rounded-lg p-4">
                                    <p className="text-[#2C2C2C] text-sm font-bold leading-[140%] font-jakarta mb-3">
                                        Advanced Skills
                                    </p>
                                    <ul className="flex flex-col gap-2">
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>eCommerce Advertising</span>
                                        </li>
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Retention Marketing</span>
                                        </li>
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Data Visualization & tools</span>
                                        </li>
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Ad tools like Amazon Advertising, Meta ads, Google Ads etc</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex-1 border-l-4 border-purple-400 bg-purple-50 rounded-lg p-4">
                                    <p className="text-[#2C2C2C] text-sm font-bold leading-[140%] font-jakarta mb-3">
                                        Start your Internship
                                    </p>
                                    <ul className="flex flex-col gap-2">
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Real-world hands on experience in the selected role</span>
                                        </li>
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Paid internship with a stipend of upto ₹25,000 per month</span>
                                        </li>
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Convert internships into full-time opportunities</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Bottom Row - Placement Process */}
                            <div className="flex gap-2">
                                <div className="flex-1 border-l-4 border-purple-600 bg-purple-100 rounded-lg p-4">
                                    <p className="text-[#2C2C2C] text-sm font-bold leading-[140%] font-jakarta mb-3">
                                        Start Placement Prep
                                    </p>
                                    <ul className="flex flex-col gap-2">
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>CV Preparation</span>
                                        </li>
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Identifying Career Pathways</span>
                                        </li>
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>1-1 Mentorship Initiation</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex-1 border-l-4 border-purple-600 bg-purple-100 rounded-lg p-4">
                                    <p className="text-[#2C2C2C] text-sm font-bold leading-[140%] font-jakarta mb-3">
                                        Internship Process
                                    </p>
                                    <ul className="flex flex-col gap-2">
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Placement process across partner companies & other visiting companies</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex-1 border-l-4 border-purple-600 bg-purple-100 rounded-lg p-4">
                                    <p className="text-[#2C2C2C] text-sm font-bold leading-[140%] font-jakarta mb-3">
                                        Placement Assistance
                                    </p>
                                    <ul className="flex flex-col gap-2">
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Placement support for eligible students</span>
                                        </li>
                                        <li className="text-xs flex items-start font-jakarta font-medium text-[rgba(44,44,44,0.60)] gap-2 leading-[130%]">
                                            <span className="w-3 pt-0.5 flex-shrink-0">⭐</span>
                                            <span>Continued prep and mentorship for industry readiness</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Start Your Career */}
                        <div className="w-1/5 rounded-lg p-6 flex flex-col gap-12" style={{ background: 'linear-gradient(144deg, rgba(107, 68, 175, 0.95) 15.58%, rgba(92, 88, 170, 0.84) 100.06%)' }}>
                            <p className="text-3xl font-extrabold italic font-playfair text-white leading-[135%]">
                                <span className="not-italic font-light">Start</span><br />
                                Your<br />
                                Career
                            </p>
                            <img src="/courses/experience-with-digiaccel-2-mobile.webp" alt="Start Career" className="w-full rounded mb-0" />
                        </div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="block md:hidden">
                    <img src="/courses/curriculum-mobile.webp" alt="Course Curriculum" className="w-full" />
                </div>
            </div>
        </section>
    );
};

export default CourseExperience;
