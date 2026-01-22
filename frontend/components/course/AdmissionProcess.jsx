'use client';

export default function AdmissionProcess() {
    return (
        <section id="admission-process" className="relative bg-[#2b193f] py-16 md:py-24 overflow-hidden border-b border-white/5">
            {/* 1440px MASTER ALIGNMENT: Exactly synced with Navbar */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER: Responsive layout aligned to the grid backbone */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-[1px] bg-orange-500"></span>
                            <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em]">The Onboarding</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                            Admission <span className="text-[#8B19E6]">Process.</span>
                        </h2>
                        <p className="text-[#d8cceb] text-sm md:text-base mt-4 font-medium opacity-70">
                            A strategic 4-step assessment designed to ensure a mutual fit for your career goals.
                        </p>
                    </div>

                    {/* ORANGE CTA — UNCHANGED */}
                    <button className="bg-[#ff7a1a] text-white px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:opacity-90 transition-all shadow-xl shadow-orange-900/20 active:scale-95">
                        Apply Now →
                    </button>
                </div>

                {/* GRID: Responsive 1 -> 2 -> 3 logic for proper breathing room */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 relative">

                    <StepCard
                        step="1"
                        titleTop="Online"
                        titleMain="Application"
                        text="The first step in the admission process is filling the online application. We’d love to get to know you better."
                    />

                    <StepCard
                        step="2"
                        titleTop="Take the"
                        titleMain="Aptitude Test"
                        text="Based on your application, you will be shortlisted for the AMP aptitude test. The test is a quick, engaging assessment."
                    />

                    <StepCard
                        step="3"
                        titleTop="Interview"
                        titleMain="Process"
                        text="Shortlisted applicants will be called for an in-person interview at our Gurugram campus for a case study and director interaction."
                    />

                    <StepCard
                        step="4"
                        titleTop="Offer of"
                        titleMain="Acceptance"
                        text="Selected candidates will be provided with an offer of admission to the program."
                    />

                    {/* IMAGE CARD: Responsive Span Logic */}
                    <div className="relative col-span-1 sm:col-span-2 lg:col-span-2 h-[250px] md:h-auto min-h-[280px] rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/5">
                        <img
                            src="https://assets.digiaccel.in/website/images/bootcamp/admission-process-dark-1.webp"
                            className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-700"
                            alt="Admission environment"
                        />
                        <img
                            src="https://assets.digiaccel.in/website/images/bootcamp/admission-process-bright-1.webp"
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            alt="Admission interaction"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

/* STEP CARD: Preserved textures and logic with improved padding */
function StepCard({ step, titleTop, titleMain, text }) {
    return (
        <div
            className="
                relative h-[260px] md:h-[300px] rounded-[2.5rem] p-8 md:p-12 overflow-hidden
                bg-[#1f1433] border border-white/5
                transition-all duration-500
                hover:-translate-y-2 group
            "
            style={{
                backgroundImage: "url('/textures/noise.png')",
                backgroundRepeat: 'repeat',
            }}
        >
            {/* PURPLE HOVER LIGHT */}
            <div
                className="
                    absolute inset-0 opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-700
                    pointer-events-none
                "
                style={{
                    background:
                        'radial-gradient(600px circle at 50% 30%, rgba(139,25,230,0.15), transparent 60%)',
                }}
            />

            {/* BIG NUMBER - Scaled for high-end look */}
            <span className="absolute -right-6 -bottom-12 text-[14rem] md:text-[20rem] font-bold leading-none text-black/20 pointer-events-none select-none transition-transform duration-1000 group-hover:scale-110 group-hover:-rotate-6">
                {step}
            </span>

            {/* CONTENT */}
            <div className="relative z-10">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#e6dbff] opacity-50 mb-1">
                    {titleTop}
                </h3>

                <h2 className="text-xl md:text-2xl font-bold mb-5 text-white tracking-tight">
                    {titleMain}
                </h2>

                {/* ORANGE DIVIDER — UNCHANGED */}
                <div className="w-12 h-[3px] rounded-full mb-6 bg-orange-500 shadow-sm" />

                <p className="text-xs md:text-sm leading-relaxed text-white/60 font-medium max-w-[240px]">
                    {text}
                </p>
            </div>
        </div>
    );
}