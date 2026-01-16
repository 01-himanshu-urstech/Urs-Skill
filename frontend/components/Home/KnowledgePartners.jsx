const KnowledgePartners = () => {
    return (
        <section className="mt-12 mx-auto max-w-6xl rounded-sm px-6 sm:px-4 py-10 bg-gray-300 relative overflow-hidden mb-10">
            {/* Soft center gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/15 to-transparent pointer-events-none" />

            {/* Heading */}
            <div className="relative text-center">
                <h2 className="text-purple-600 text-2xl ">
                    Urs Group of Companies
                </h2>

                {/* Dashed divider */}
                <div className="mt-4 flex justify-center">
                    <div className="relative w-full max-w-4xl h-px">
                        {/* Dashed line */}
                        <div className="absolute inset-0 border-t border-dashed border-black" />

                        {/* Left blur */}
                        <div className="absolute left-0 top-0 h-px w-24 bg-gradient-to-r from-[#454347e3] to-transparent" />

                        {/* Right blur */}
                        <div className="absolute right-0 top-0 h-px w-24 bg-gradient-to-l from-[#454347e3] to-transparent" />
                    </div>
                </div>
            </div>

            {/* Logos */}
            <div className="relative mt-8 flex items-center justify-center gap-10 sm:gap-6">
                {/* Urs Tech Solution */}
                <img
                    src="/partners/urstechsolution-logo.webp"
                    alt="Urs Tech Solution"
                    className="w-48 sm:w-28 object-contain"
                />

                {/* Separator */}
                <span className="hidden md:block flex flex-shrink-0 mx-[3em] sm:mx-[.5em] md:mx-[.5em] text-[2.125em] text-[rgba(255,255,255,0.40)] font-playfair italic font-[600] leading-[150%]">
                    &
                </span>

                {/* Vertical line (desktop) */}
                {/* <div className="hidden sm:block h-12 w-px bg-white/40" /> */}

                {/* Urs Writer */}
                <img
                    src="/partners/urswriter-removebg-preview.webp"
                    alt="Urs Writer"
                    className="w-48 sm:w-28 object-contain"
                />
            </div>
        </section>
    );
};

export default KnowledgePartners;
