'use client';

export default function AdmissionProcess() {
    return (
        <section className="relative bg-[#2b193f] py-24 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-10">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-16">
                    <div>
                        <h2 className="text-white text-3xl font-semibold">
                            Admission Process
                        </h2>
                        <p className="text-[#d8cceb] text-sm mt-1">
                            4 step admission process to assess mutual fitment
                        </p>
                    </div>

                    {/* ORANGE — UNCHANGED */}
                    <button className="bg-[#ff7a1a] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
                        Apply Now →
                    </button>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-3 gap-x-10 gap-y-20 relative">

                    {/* FLOW CONNECTOR — ORANGE UNCHANGED */}
                    <div
                        className="absolute left-0 right-0 pointer-events-none z-0"
                        style={{ top: '125px', height: '500px' }}
                    >
                        <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
                            <path
                                d="
                  M 320 0
                  H 930
                  Q 980 0 980 50
                  V 160
                  Q 980 210 930 210
                  H 450
                  Q 400 210 400 260
                  V 260
                  Q 400 310 450 310
                  H 980
                "
                                fill="none"
                                stroke="#ff7a1a"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                            />
                        </svg>
                    </div>

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
                        text="Shortlisted applicants will be called for an in-person interview at our Gurugram campus for a case study and program director interaction."
                    />

                    <StepCard
                        step="4"
                        titleTop="Offer of"
                        titleMain="Acceptance"
                        text="Selected candidates will be provided with an offer of admission to the program."
                    />

                    {/* IMAGE CARD */}
                    <div className="relative col-span-2 h-[250px] rounded-xl overflow-hidden group shadow-xl">
                        <img
                            src="https://assets.digiaccel.in/website/images/bootcamp/admission-process-dark-1.webp"
                            className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                            alt=""
                        />
                        <img
                            src="https://assets.digiaccel.in/website/images/bootcamp/admission-process-bright-1.webp"
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            alt=""
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

/* STEP CARD */
function StepCard({ step, titleTop, titleMain, text }) {
    return (
        <div
            className="
        relative h-[250px] rounded-xl p-8 overflow-hidden
        bg-[#1f1433]
        transition-all duration-500
        hover:-translate-y-1 group
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
          transition-opacity duration-500
          pointer-events-none
        "
                style={{
                    background:
                        'radial-gradient(600px circle at 50% 30%, rgba(170,120,255,0.18), transparent 60%)',
                }}
            />

            {/* BIG NUMBER */}
            <span className="absolute right-[-20px] bottom-[-40px] text-[20rem] font-playfair leading-none text-black/30 pointer-events-none">
                {step}
            </span>

            {/* CONTENT */}
            <div className="relative z-10">
                <h3 className="text-lg font-light text-[#e6dbff]">
                    {titleTop}
                </h3>

                <h2 className="text-xl font-semibold mb-4 text-white">
                    {titleMain}
                </h2>

                {/* ORANGE DIVIDER — UNCHANGED */}
                <div className="w-10 h-[3px] rounded-full mb-4 bg-orange-500" />

                <p className="text-sm leading-relaxed text-white/70">
                    {text}
                </p>
            </div>
        </div>
    );
}
