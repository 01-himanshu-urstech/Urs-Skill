import CourseHero from './CourseHero';
import CourseMeta from './CourseMeta';
import CourseDetails from './CourseDetails';
import CareerSection from './CareerSection';
import AdmissionProcess from './AdmissionProcess';
import FaqSectionCourse from './FaqSectionCourse';
import KnowledgePartners from '@/components/Home/KnowledgePartners';
import NeedhelpCourses from '@/components/course/NeedhelpCourses';

export default function BusinessAdminCoursePage() {
  return (
    <>
      <CourseHero course="mba" />
      <CourseMeta course="mba" />

      <KnowledgePartners />

      <CourseDetails course="mba" />
      <CareerSection />
      <AdmissionProcess />

      <NeedhelpCourses id="need-help-course" />
      <FaqSectionCourse course="mba" />
    </>
  );
}
