import CourseExperience from '@/components/course/CourseExperience';
import CourseHero from '@/components/course/CourseHero';
import CourseMeta from '@/components/course/CourseMeta';
import HowWeTeach from '@/components/Home/HowWeTeach';
import KnowledgePartners from '@/components/Home/KnowledgePartners';
import CourseDetails from '@/components/course/CourseDetails';
import CareerSection from '@/components/course/CareerSection';
import AdmissionProcess from '@/components/course/AdmissionProcess';
import FaqSectionCourse from '@/components/course/FaqSectionCourse';
import NeedHelpForm from '@/components/Home/NeedHelpForm';

export default function CourseDetailsPage() {
  return (
    <>
      <CourseHero />
      <CourseMeta />
      <KnowledgePartners />
      <HowWeTeach />
      <CourseExperience />
      <CourseDetails />
      <CareerSection />
      <AdmissionProcess />
      <NeedHelpForm />
      <FaqSectionCourse />
    </>
  );
}
