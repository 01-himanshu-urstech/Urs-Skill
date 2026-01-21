// app/(root)/courses/[slug]/page.jsx

import FullStackCoursePage from '@/components/course/FullStackCoursePage';
import BusinessAdminCoursePage from '@/components/course/BusinessAdminCoursePage';
import { notFound } from 'next/navigation';

export default async function CoursePage({ params }) {
  // In Next.js 15, params is a promise
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  console.log("Current Slug:", slug); // Check your terminal to see if this hits

  if (slug === 'full-stack-development') {
    return <FullStackCoursePage />;
  }

  if (slug === 'business-administration') {
    return <BusinessAdminCoursePage />;
  }

  return notFound();
}