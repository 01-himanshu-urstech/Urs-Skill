const KnowledgePartners = () => {
  return (
    <section className="
      mt-10 sm:mt-8
      mx-auto max-w-6xl
      rounded-sm
      px-6 sm:px-4
      py-10 sm:py-8
      bg-gray-300
      relative overflow-hidden
      mb-10 sm:mb-8
    ">
      {/* Soft animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent pointer-events-none animate-pulseSlow" />

      {/* Heading */}
      <div className="relative text-center">
        <h2 className="text-purple-900 text-2xl sm:text-xl font-semibold">
          Urs Group of Companies
        </h2>

        {/* Dashed divider */}
        <div className="mt-4 flex justify-center">
          <div className="relative w-full max-w-4xl h-px">
            <div className="absolute inset-0 border-t border-dashed border-black" />
            <div className="absolute left-0 top-0 h-px w-16 sm:w-10 bg-gradient-to-r from-[#454347e3] to-transparent" />
            <div className="absolute right-0 top-0 h-px w-16 sm:w-10 bg-gradient-to-l from-[#454347e3] to-transparent" />
          </div>
        </div>
      </div>

      {/* Logos */}
      <div className="
        relative mt-10 sm:mt-8
        flex flex-row
        items-center justify-center
        gap-10 sm:gap-6
        flex-wrap sm:flex-nowrap
      ">
        {/* Urs Tech Solution */}
        <img
          src="/partners/urstechsolution-logo.webp"
          alt="Urs Tech Solution"
          className="
            w-48 sm:w-28 xs:w-24
            max-w-full
            object-contain
            transition-all duration-500 ease-out
            hover:scale-105 hover:-translate-y-1
            hover:drop-shadow-[0_10px_20px_rgba(124,58,237,0.25)]
            animate-floatSlow
          "
        />

        {/* Separator */}
        <span className="
          hidden md:block
          flex-shrink-0
          mx-[3em] md:mx-[1.5em]
          text-[2.125em]
          text-[rgba(255,255,255,0.40)]
          font-playfair italic font-[600]
          leading-[150%]
        ">
          &
        </span>

        {/* Urs Writer */}
        <img
          src="/partners/urswriter-removebg-preview.webp"
          alt="Urs Writer"
          className="
            w-48 sm:w-28 xs:w-24
            max-w-full
            object-contain
            transition-all duration-500 ease-out
            hover:scale-105 hover:-translate-y-1
            hover:drop-shadow-[0_10px_20px_rgba(124,58,237,0.25)]
            animate-floatSlowDelay
          "
        />
      </div>
    </section>
  );
};

export default KnowledgePartners;
