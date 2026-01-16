import HeroSection from '@/components/about/HeroSection';
import WhatWeOfferSection from '@/components/about/WhatWeOfferSection';
import StatsSection from '@/components/about/StatsSection';
import TechMarquee from '@/components/Home/TechMarquee';

export const metadata = {
  title: 'About Us | URSSkill by URSTech Solution',
  description: 'Empowering Professionals with Future-Ready Skills through AI-powered technical training programs.',
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <TechMarquee/>
      <WhatWeOfferSection />
      <StatsSection />
    </main>
  );
}
