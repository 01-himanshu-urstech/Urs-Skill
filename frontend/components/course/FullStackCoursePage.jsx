import CourseHero from './CourseHero';
import CourseMeta from './CourseMeta';
import CourseExperience from './CourseExperience';
import CourseDetails from './CourseDetails';
import CareerSection from './CareerSection';
import AdmissionProcess from './AdmissionProcess';
import FaqSectionCourse from './FaqSectionCourse';
import KnowledgePartners from '@/components/Home/KnowledgePartners';
import HowWeTeach from '@/components/Home/HowWeTeach';
import NeedhelpCourses from '@/components/course/NeedhelpCourses';

export default function FullStackCoursePage() {
  return (
    <>
      <CourseHero course="fullstack" />
      <CourseMeta course="fullstack" />

      <KnowledgePartners />
      <HowWeTeach />

      <CourseExperience />
      <CourseDetails course="fullstack" />
      <CareerSection />
      <AdmissionProcess />

      <NeedhelpCourses id="need-help-course" />
      <FaqSectionCourse course="fullstack" />
    </>
  );
}
