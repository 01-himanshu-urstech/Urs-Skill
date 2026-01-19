'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useGetBlogBySlugQuery } from '@/store/api/BlogApi';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetBlogBySlugQuery(slug);

  const blog = data?.data?.blog;

  if (isLoading) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500 text-lg">Loading blog...</p>
      </section>
    );
  }

  if (isError || !blog) {
    return (
      <section className="py-20 text-center">
        <p className="text-red-500 text-lg">Blog not found</p>
      </section>
    );
  }

  return (
    <article className="max-w-6xl mx-auto px-6 py-16">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {blog.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
        <span>
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        {/* <span>•</span>
        <span>{blog.createdBy?.role}</span> */}
      </div>

      {/* Cover Image */}
      {blog.coverImage?.url && (
        <div className="relative w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden mb-10">
          <Image
            src={blog.coverImage.url}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Excerpt */}
      {blog.excerpt && (
        <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
          {blog.excerpt}
        </p>
      )}

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
