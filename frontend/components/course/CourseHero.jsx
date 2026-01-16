const CourseHero = () => {
  return (
    <section className="relative h-[300px] sm:h-[350px] md:h-[300px] w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="/courses/amp-hero.webp"
        alt="Course Banner"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
          Upskill & Launch your Career
        </h1>

        <p className="mt-2 text-white text-lg sm:text-xl md:text-2xl">
          as an Analyst in <span className="text-orange-400 italic">Growth</span>
        </p>

        {/* CTA */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="bg-orange-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base hover:bg-orange-600 transition-colors">
            Apply Now
          </button>
          <button
            href="#need-help"
            className="bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base hover:bg-gray-100 transition-colors">
            Speak to a Counsellor
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
