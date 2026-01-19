import HeroBanner from "@/components/Home/HeroBanner";
import NeedHelpForm from "@/components/Home/NeedHelpForm";
import PartnersLogo from "@/components/Home/PartnersLogoSection";
import TrackRecords from "@/components/Home/TrackRecords";
import TrainingOptions from "@/components/Home/TrainingOptions";
import MentorSection from "@/components/Home/MentorSection";
import FAQAccordion from "@/components/Home/FaqSection";
import Image from "next/image";
import HeroSection from "@/components/Home/HeroSection";
import ReusableHeroSection from "@/components/Home/ReusableHeroSection";
import TechMarquee from "@/components/Home/TechMarquee";
import PopularBlogs from "@/components/Home/PopularBlogs";
import ExploreCoursesSection from "@/components/Home/ExploreCoursesSection";
import KnowledgePartners from "@/components/Home/KnowledgePartners";
import HowWeTeach from "@/components/Home/HowWeTeach";
import VideoSection from "@/components/ui/VideoSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      {/* <TechMarquee/> */}
      <KnowledgePartners />
      {/* <HeroSection /> */}
      {/* <TrustedByExperts/> */}
      {/* <TrackRecords /> */}
      <ExploreCoursesSection />
      <HowWeTeach />
      {/* <TrainingOptions /> */}
      {/* <PartnersLogo /> */}

      <VideoSection />
      <PopularBlogs />
      {/* <MentorSection /> */}
      <NeedHelpForm />
      {/* <ReusableHeroSection /> */}
      <FAQAccordion />
    </div>
  );
}
