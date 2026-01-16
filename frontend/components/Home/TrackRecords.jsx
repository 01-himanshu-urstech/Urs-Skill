import Image from 'next/image';

export default function TrackRecord() {
  const stats = [
    {
      value: '75 Lakhs',
      label: 'Highest CTC post urstechsolutionel Program',
      bgColor: 'bg-[#FFF4E6]'
    },
    {
      value: '3,000+',
      label: 'Alumni across programs',
      bgColor: 'bg-[#F3F4F6]'
    },
    {
      value: '30+',
      label: 'Partner Companies',
      bgColor: 'bg-[#F3F4F6]'
    },
    {
      value: '50+',
      label: 'Cohorts across eComm & Marketing',
      bgColor: 'bg-[#FFF4E6]'
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Proven Track Record of Outcomes
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Urs Skill&apos; education has helped leading professionals accelerate their careers and crack top jobs.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col justify-center min-h-[180px] lg:min-h-[220px]`}
              >
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {stat.value}
                </h3>
                <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/proven-records-image.webp"
              alt="urstechsolutionel Alumni"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
