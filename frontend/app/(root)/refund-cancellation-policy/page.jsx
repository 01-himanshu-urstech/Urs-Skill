import Link from 'next/link';
import { DollarSign, XCircle, RefreshCw, Briefcase, Ban, Scale, Mail } from 'lucide-react';

export default function RefundCancellationPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 mb-4">
                        <RefreshCw className="w-10 h-10" />
                        <h1 className="text-4xl md:text-5xl font-bold">Refund & Cancellation Policy</h1>
                    </div>
                    <p className="text-lg text-emerald-100">URSSkills by URSTech Solutions</p>
                    <p className="text-sm text-emerald-200 mt-2">Effective Date: 30th October, 2025</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Introduction */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        At <span className="font-semibold text-emerald-600">URSSkills</span>, we strive to ensure a smooth and transparent training experience. Please read our refund and cancellation terms carefully.
                    </p>
                </div>

                {/* Section 1: Course Cancellation by Participant */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">1. Course Cancellation by Participant</h2>
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Cancellations made within 48 hours of registration may be eligible for a partial refund (excluding payment gateway charges).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">No refunds will be issued once the course access, materials, or live sessions have started.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">
                                Requests must be emailed to{' '}
                                <a href="mailto:info@urstechsolution.com" className="text-red-600 font-semibold hover:underline">
                                    info@urstechsolution.com
                                </a>
                                {' '}with payment proof.
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Section 2: Course Cancellation by URSSkills */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <RefreshCw className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">2. Course Cancellation by URSSkills</h2>
                    </div>
                    <p className="text-gray-700 mb-4">
                        If URSSkills cancels or reschedules a batch due to unavoidable reasons, participants will be notified and offered:
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">A full refund, or</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">Option to transfer to the next available batch.</span>
                        </li>
                    </ul>
                </div>

                {/* Section 3: Corporate & Group Bookings */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">3. Corporate & Group Bookings</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        Corporate training sessions booked through organizations are subject to separate agreements. Refunds will be governed as per the corporate contract.
                    </p>
                </div>

                {/* Section 4: Non-Transferable */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <Ban className="w-6 h-6 text-orange-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">4. Non-Transferable</h2>
                    </div>
                    <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                        <p className="text-gray-700 leading-relaxed">
                            Course registrations are non-transferable between participants once access credentials have been issued.
                        </p>
                    </div>
                </div>

                {/* Section 5: Dispute Resolution */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                            <Scale className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">5. Dispute Resolution</h2>
                    </div>
                    <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
                        <p className="text-gray-700 leading-relaxed">
                            All refund-related disputes will be handled under the jurisdiction of Delhi, India.
                        </p>
                    </div>
                </div>

                {/* Important Notice */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <DollarSign className="w-6 h-6 text-amber-700" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-amber-900 mb-2">Important Notice</h3>
                            <p className="text-amber-800 leading-relaxed">
                                Please ensure you read and understand our refund policy before making a payment. Once the course has commenced or materials have been accessed, refunds cannot be processed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-lg p-8 text-white text-center">
                    <Mail className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-3">Need Assistance?</h3>
                    <p className="text-emerald-100 mb-6">
                        If you have any questions about refunds or cancellations, our team is here to help.
                    </p>
                    <a
                        href="mailto:info@urstechsolution.com"
                        className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105"
                    >
                        Contact Us
                    </a>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
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
