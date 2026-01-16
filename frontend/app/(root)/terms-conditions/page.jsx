import Link from 'next/link';
import { FileText, CreditCard, Copyright, Users, Award, AlertTriangle, Mail, Scale } from 'lucide-react';

export default function TermsConditions() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Scale className="w-10 h-10" />
                        <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
                    </div>
                    <p className="text-lg text-blue-100">URSSkills by URSTech Solutions</p>
                    <p className="text-sm text-blue-200 mt-2">Effective Date: 30th October, 2025</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Introduction */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        By accessing or enrolling in our programs through <span className="font-semibold text-blue-600">URSSkills by URSTech Solutions</span>, you agree to the following terms and conditions.
                    </p>
                </div>

                {/* Section 1: General Terms */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">1. General Terms</h2>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">URSSkills is a professional training initiative of URSTech Solutions.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">By using our services, you agree to abide by these Terms and Conditions and all applicable laws.</span>
                        </li>
                    </ul>
                </div>

                {/* Section 2: Enrollment & Payment */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">2. Enrollment & Payment</h2>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Course enrollment is confirmed only upon receipt of full payment.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Fees once paid are non-refundable, except under specific conditions stated in our Refund Policy.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">URSSkills reserves the right to cancel or reschedule sessions. In such cases, participants will be informed in advance.</span>
                        </li>
                    </ul>
                </div>

                {/* Section 3: Intellectual Property */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Copyright className="w-6 h-6 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">3. Intellectual Property</h2>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">All training materials, videos, and resources provided are the intellectual property of URSSkills by URSTech Solutions.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">You may not reproduce, share, or distribute any content without written consent.</span>
                        </li>
                    </ul>
                </div>

                {/* Section 4: Conduct & Participation */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-orange-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">4. Conduct & Participation</h2>
                    </div>
                    <p className="text-gray-700 mb-4">We expect all learners to:</p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Maintain professionalism and respect trainers and peers.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Avoid sharing login credentials or training materials externally.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Comply with corporate and academic integrity standards.</span>
                        </li>
                    </ul>
                </div>

                {/* Section 5: Certification */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                            <Award className="w-6 h-6 text-teal-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">5. Certification</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        Certificates are awarded only after successful completion of assignments, attendance, and evaluations as required by the specific program.
                    </p>
                </div>

                {/* Section 6: Limitation of Liability */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">6. Limitation of Liability</h2>
                    </div>
                    <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                        <p className="text-gray-700 leading-relaxed">
                            URSSkills and URSTech Solutions are not liable for any indirect, incidental, or consequential damages arising from participation in our programs or use of our platform.
                        </p>
                    </div>
                </div>

                {/* Section 7: Contact Information */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                            <Mail className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">7. Contact Information</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        For any queries regarding these terms, email{' '}
                        <a href="mailto:info@urstechsolution.com" className="text-indigo-600 font-semibold hover:underline">
                            info@urstechsolution.com
                        </a>
                        {' '}or visit{' '}
                        <a href="https://www.urstechsolution.com/ursskills" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">
                            www.urstechsolution.com/ursskills
                        </a>
                    </p>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white text-center">
                    <Mail className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-3">Have Questions?</h3>
                    <p className="text-blue-100 mb-6">
                        If you have any questions or concerns about our Terms & Conditions, feel free to reach out.
                    </p>
                    <a
                        href="mailto:info@urstechsolution.com"
                        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105"
                    >
                        Contact Us
                    </a>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
