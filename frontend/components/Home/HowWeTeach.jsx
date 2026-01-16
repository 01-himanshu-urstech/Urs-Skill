export default function HowWeTeach() {
    return (
        <section className="bg-gradient-to-br from-purple-50 to-purple-100 py-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20">

                {/* HEADER */}
                <div className="max-w-3xl mb-16">
                    <h1 className="text-purple-900 text-2xl sm:text-3xl md:text-3xl font-playfair italic font-extrabold leading-tight">
                        How We Teach
                    </h1>

                    <h2 className="text-purple-800 text-xl sm:text-2xl md:text-2xl font-light mt-[-4px]">
                        in Urs Skill Program
                    </h2>

                    <p className="text-[rgba(44,44,44,0.6)] text-sm sm:text-lg md:text-md mt-3 font-nunito">
                        A unique 3 phase program to launch your career
                    </p>
                </div>

                {/* PHASES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-purple-300 ">

                    {/* PHASE 1 */}
                    <PhaseCard
                        number="1"
                        title="Learn"
                        points={[
                            "Skills that are valued by the industry",
                            "from expert mentors who have excelled in that field",
                        ]}
                        image="https://assets.digiaccel.in/website/images/bootcamp/learn-phase.webp"
                        bordered="right"
                    />

                    {/* PHASE 2 */}
                    <PhaseCard
                        number="2"
                        title="Intern"
                        points={[
                            "With partner companies in sectors like eCommerce,",
                            "Brands, Media and Analytics",
                        ]}
                        image="https://assets.digiaccel.in/website/images/bootcamp/intern-phase.webp"
                        bordered="both"
                    />

                    {/* PHASE 3 */}
                    <PhaseCard
                        number="3"
                        title="Get Placed"
                        points={[
                            "In Analyst (or equivalent) roles",
                            "(Expected Average CTC between 6 LPA to 7 LPA)",
                        ]}
                        image="https://assets.digiaccel.in/website/images/bootcamp/get-placed-phase.webp"
                        bordered="left"
                    />

                </div>
            </div>
        </section>
    );
}

/* ---------------- PHASE CARD ---------------- */

function PhaseCard({ number, title, points, image, bordered }) {
    return (
        <div
            className={`flex flex-col justify-between border-purple-300 border-t bg-white/50 backdrop-blur-sm ${bordered === "right"
                ? "md:border-r"
                : bordered === "left"
                    ? "md:border-l"
                    : bordered === "both"
                        ? "md:border-x"
                        : ""
                }`}
        >
            {/* TEXT */}
            <div className="relative px-8 pt-16 pb-10">
                {/* BIG NUMBER */}
                <span className="absolute top-6 left-6 text-[72px] font-jakarta font-bold text-[rgba(98,105,86,0.2)]">
                    {number}
                </span>

                <h3 className="text-[#3B432C] font-poppins text-[24px] font-semibold relative z-10 left-12">
                    {title}
                </h3>

                <ul className="mt-3 space-y-2 text-[rgba(59,67,44,0.8)] text-sm font-nunito leading-relaxed">
                    {points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                    ))}
                </ul>
            </div>

            {/* IMAGE */}
            <img
                src={image}
                alt={title}
                className="w-full object-cover border-t border-purple-300"
            />
        </div>
    );
}
