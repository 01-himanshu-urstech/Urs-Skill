'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from '@/store/api/customerApi';
import { useGetMyTransactionsQuery } from '@/store/api/transactionApi';
import { STATIC_COURSES } from '@/app/(root)/constants/constant';
import { logout } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';
import {
  User, Mail, Phone, Calendar, LogOut,
  ShieldCheck, Settings, Lock, BookOpen, ExternalLink, Save, X, Eye, EyeOff, CheckCircle, Tag
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    oldPassword: '',
    newPassword: ''
  });

  // Fetching Data
  const { data: profileData, isLoading: isProfileLoading } = useGetMyProfileQuery(undefined, { skip: !isAuthenticated });
  const { data: txnData, isLoading: isTxnLoading } = useGetMyTransactionsQuery(undefined, { skip: !isAuthenticated });
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();

  const customer = profileData?.data?.customer;

  // Updated Logic: Map transactions to Course Cards
  const enrolledCourses = useMemo(() => {
    if (!txnData?.data?.transactions) return [];

    return txnData.data.transactions
      .filter(txn => txn.status === 'SUCCESS') // Note: Latest course won't show if status is PENDING
      .map(txn => {
        // Since STATIC_COURSES is an Object, access it directly by key
        // Example: STATIC_COURSES["1"]
        const courseStaticInfo = STATIC_COURSES[txn.courseId];

        return {
          id: txn._id,
          title: txn.courseDetails?.name || courseStaticInfo?.name || `Course #${txn.courseId}`,
          amount: txn.finalAmount,
          status: txn.status,
          coupon: txn.couponCode,
          instructor: courseStaticInfo?.instructor || "Expert Instructor",
          date: new Date(txn.createdAt).toLocaleDateString('en-IN')
        };
      });
  }, [txnData]);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        oldPassword: '',
        newPassword: ''
      });
    }
  }, [customer, isEditing]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push('/login');
  };

  const handleSave = async () => {
    const isNameChanged = formData.name !== customer.name;
    const isEmailChanged = formData.email !== customer.email;
    const isPhoneChanged = formData.phone !== customer.phone;
    const isPasswordChanging = formData.newPassword.length > 0;

    if (!isNameChanged && !isEmailChanged && !isPhoneChanged && !isPasswordChanging) {
      toast("No changes detected.", { icon: 'ℹ️' });
      setIsEditing(false);
      return;
    }

    const loadingToast = toast.loading("Updating profile...");
    try {
      const payload = {};
      if (isNameChanged) payload.name = formData.name;
      if (isEmailChanged) payload.email = formData.email;
      if (isPhoneChanged) payload.phone = formData.phone;

      if (isPasswordChanging) {
        if (!formData.oldPassword) {
          toast.dismiss(loadingToast);
          return toast.error("Current password required");
        }
        payload.oldPassword = formData.oldPassword;
        payload.newPassword = formData.newPassword;
      }

      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully!", { id: loadingToast });
      setIsEditing(false);
      setFormData(prev => ({ ...prev, oldPassword: '', newPassword: '' }));
    } catch (err) {
      toast.error(err?.data?.message || "Update failed", { id: loadingToast });
    }
  };

  if (isProfileLoading || isTxnLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-4">
      <div className="max-w-6xl mx-auto relative">
        <button
          onClick={handleLogout}
          title='logout'
          className="absolute -top-2 right-0 flex items-center gap-2 text-white font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-lg transition-all active:scale-95 z-10 text-sm sm:text-base hover:cursor-pointer"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 pt-2">My Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-purple-100 flex flex-col items-center h-fit">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 border-4 border-purple-50 mb-4">
              <User size={40} />
            </div>
            {isEditing ? (
              <input
                className="text-lg font-bold text-gray-900 border-b border-purple-300 focus:outline-none text-center w-full mb-1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            ) : (
              <h2 className="text-lg font-bold text-gray-900">{customer?.name}</h2>
            )}
            <p className="text-gray-500 text-xs mb-6 uppercase tracking-widest font-semibold">Student Account</p>

            {isEditing ? (
              <div className="w-full space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Current Password"
                  className="w-full bg-white border rounded-lg px-3 py-2 text-sm outline-none"
                  value={formData.oldPassword}
                  onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                />
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full bg-white border rounded-lg px-3 py-2 text-sm outline-none"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2.5 text-gray-400 hover:cursor-pointer">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} title='change password' className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 text-purple-700 rounded-xl font-semibold text-sm hover:cursor-pointer">
                <Lock size={18} /> Change Password
              </button>
            )}
          </div>

          {/* Personal Info */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
            <div className="absolute top-6 right-6 flex gap-2">
              {isEditing ? (
                <>
                  <button onClick={handleSave} title='save information' className="p-2 text-green-600 hover:cursor-pointer"><Save size={22} /></button>
                  <button onClick={() => setIsEditing(false)} title='cancel' className="p-2 text-red-500 hover:cursor-pointer"><X size={22} /></button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} title='edit' className="hover:cursor-pointer p-2 text-gray-400"><Settings size={20} /></button>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <Mail size={18} className="text-purple-600 shrink-0" />
                  <span className="truncate">{customer?.email}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <Phone size={18} className="text-purple-600 shrink-0" />
                  <span>{customer?.phone || 'Not Provided'}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Member Since</label>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <Calendar size={18} className="text-purple-600 shrink-0" />
                  <span>{customer?.createdAt ? new Date(customer.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'N/A'}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Account Status</label>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <ShieldCheck size={18} className="text-green-500 shrink-0" />
                  <span className="flex items-center gap-1.5">
                    Verified
                    <CheckCircle size={14} className="fill-green-500 text-white" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses Card Section */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen size={20} className="text-purple-700" />
              My Enrolled Courses
            </h3>

            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="p-5 border border-purple-100 rounded-2xl bg-gradient-to-br from-white to-purple-50/30 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                        <BookOpen size={20} />
                      </div>
                      {/* <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">
                        {course.status}
                      </span> */}
                    </div>

                    <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">{course.title}</h4>
                    <p className="text-xs text-gray-500 mb-4">Purchased: {course.date}</p>

                    <div className="space-y-2 pt-3 border-t border-purple-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Amount Paid</span>
                        <span className="font-bold text-gray-900">₹{course.amount}</span>
                      </div>

                      {course.coupon && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 flex items-center gap-1">
                            <Tag size={14} className="text-purple-500" /> Coupon
                          </span>
                          <span className="font-medium text-purple-600">{course.coupon}</span>
                        </div>
                      )}
                    </div>

                    {/* <button className="w-full mt-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors">
                      Start Learning <ExternalLink size={14} />
                    </button> */}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-medium text-sm">No active enrollments found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}