import FullStackCoursePage from '@/components/course/FullStackCoursePage';
import BusinessAdminCoursePage from '@/components/course/BusinessAdminCoursePage';
import { notFound } from 'next/navigation';

export default async function CoursePage({ params }) {
  const { slug } = await params;

  if (slug === 'full-stack-development') {
    return <FullStackCoursePage />;
  }

  if (slug === 'business-administration') {
    return <BusinessAdminCoursePage />;
  }

  return notFound();
}
