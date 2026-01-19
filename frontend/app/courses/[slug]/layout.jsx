import { Download } from "lucide-react";

export default async function CourseLayout({ children, params }) {
  const { slug } = await params; // ✅ FIX

  const brochureMap = {
    "full-stack-development": "/brochure/full-stack-brochure.pdf",
    "business-administration": "/brochure/mba-brochure.pdf",
  };

  const brochureUrl = brochureMap[slug];

  return (
    <section className="course-wrapper relative">
      {children}

      {brochureUrl && (
        <a
          href={brochureUrl}
          download
          aria-label="Download Course Brochure"
          className="
            fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50
            flex items-center gap-2
            bg-purple-600 hover:bg-purple-700 text-white
            px-4 py-3 rounded-full shadow-xl
            transition-all duration-300
            hover:scale-105 active:scale-95
            animate-float
          "
        >
          <Download size={20} className="animate-pulse" />
          <span className="hidden sm:inline font-medium">
            Download Brochure
          </span>
        </a>
      )}
        {/* <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script> */}

    </section>
  );
}
