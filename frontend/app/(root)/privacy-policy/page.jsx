import Link from 'next/link';
import { Shield, Lock, Eye, FileText, UserCheck, RefreshCw, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-10 h-10" />
                        <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
                    </div>
                    <p className="text-lg text-indigo-100">URSSkills by URSTech Solutions</p>
                    <p className="text-sm text-indigo-200 mt-2">Effective Date: 30th October, 2025</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Introduction */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        At <span className="font-semibold text-indigo-600">URSSkills by URSTech Solutions</span>, your privacy is our top priority. This Privacy Policy explains how we collect, use, and protect your personal information when you access our website or enroll in our training programs.
                    </p>
                </div>

                {/* Section 1: Information We Collect */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                            <FileText className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">1. Information We Collect</h2>
                    </div>
                    <p className="text-gray-700 mb-4">We may collect the following information:</p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Personal details (name, email address, phone number, company name)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Payment information (secured through trusted third-party gateways)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Course preferences and feedback</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Usage data (cookies, IP address, browser type, and device information)</span>
                        </li>
                    </ul>
                </div>

                {/* Section 2: How We Use Your Information */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Eye className="w-6 h-6 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">2. How We Use Your Information</h2>
                    </div>
                    <p className="text-gray-700 mb-4">We use collected data to:</p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Process registrations and manage your training experience</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Communicate program updates, certificates, and offers</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Improve our courses and website experience</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Maintain records for compliance and certification</span>
                        </li>
                    </ul>
                </div>

                {/* Section 3: Data Security */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Lock className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">3. Data Security</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        Your data is stored securely and protected using encryption and secure access protocols. We do not sell, rent, or trade your personal data with any third parties.
                    </p>
                </div>

                {/* Section 4: Third-Party Services */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Shield className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">4. Third-Party Services</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        Our website may use third-party tools like Google Analytics or payment gateways, which have their own privacy policies.
                    </p>
                </div>

                {/* Section 5: Cookies */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <FileText className="w-6 h-6 text-orange-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">5. Cookies</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        We use cookies to improve browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings.
                    </p>
                </div>

                {/* Section 6: Your Rights */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                            <UserCheck className="w-6 h-6 text-teal-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">6. Your Rights</h2>
                    </div>
                    <p className="text-gray-700 mb-4">You have the right to:</p>
                    <ul className="space-y-3 mb-6">
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Access and update your personal information</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Request deletion of your data</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Withdraw consent from marketing communications</span>
                        </li>
                    </ul>
                    <div className="bg-teal-50 border-l-4 border-teal-600 p-4 rounded">
                        <p className="text-gray-700">
                            To exercise your rights, contact us at{' '}
                            <a href="mailto:info@urstechsolution.com" className="text-teal-600 font-semibold hover:underline">
                                info@urstechsolution.com
                            </a>
                        </p>
                    </div>
                </div>

                {/* Section 7: Changes to this Policy */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                            <RefreshCw className="w-6 h-6 text-pink-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">7. Changes to this Policy</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        We may update this Privacy Policy periodically. All updates will be posted on this page with a revised effective date.
                    </p>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white text-center">
                    <Mail className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-3">Have Questions?</h3>
                    <p className="text-indigo-100 mb-6">
                        If you have any questions or concerns about our Privacy Policy, feel free to reach out.
                    </p>
                    <a
                        href="mailto:info@urstechsolution.com"
                        className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105"
                    >
                        Contact Us
                    </a>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
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
