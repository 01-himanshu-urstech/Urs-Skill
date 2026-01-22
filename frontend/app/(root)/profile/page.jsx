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
  ShieldCheck, Settings, Lock, BookOpen, Save, X, Eye, EyeOff, CheckCircle, Tag, ArrowUpRight
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // FIX: Prevent Hydration Mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    oldPassword: '',
    newPassword: ''
  });

  const { data: profileData, isLoading: isProfileLoading } = useGetMyProfileQuery(undefined, { skip: !isAuthenticated });
  const { data: txnData, isLoading: isTxnLoading } = useGetMyTransactionsQuery(undefined, { skip: !isAuthenticated });
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();

  const customer = profileData?.data?.customer;

  const enrolledCourses = useMemo(() => {
    if (!txnData?.data?.transactions) return [];
    return txnData.data.transactions
      .filter(txn => txn.status === 'SUCCESS')
      .map(txn => {
        const courseStaticInfo = STATIC_COURSES[txn.courseId];
        return {
          id: txn._id,
          title: txn.courseDetails?.name || courseStaticInfo?.name || `Course #${txn.courseId}`,
          amount: txn.finalAmount,
          status: txn.status,
          coupon: txn.couponCode,
          // Hydration safe date handling
          dateRaw: txn.createdAt 
        };
      });
  }, [txnData]);

  useEffect(() => {
    if (customer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    const isPhoneChanged = formData.phone !== customer.phone;
    const isPasswordChanging = formData.newPassword.length > 0;

    if (!isNameChanged && !isPhoneChanged && !isPasswordChanging) {
      toast("No changes detected.", { icon: 'ℹ️' });
      setIsEditing(false);
      return;
    }

    const loadingToast = toast.loading("Updating profile...");
    try {
      const payload = {};
      if (isNameChanged) payload.name = formData.name;
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

  // Prevent rendering until mounted to solve hydration issues
  if (!mounted || isProfileLoading || isTxnLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#8B19E6]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFB] pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <span className="text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
              • Student Workspace
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              My <span className="text-[#8B19E6]">Profile</span>
            </h1>
          </div>
          
          <button
            onClick={handleLogout}
            title='logout'
            className="flex items-center gap-2 text-white hover:cursor-pointer font-bold bg-[#8B19E6] hover:bg-[#7014ba] px-6 py-3 rounded-2xl shadow-lg shadow-purple-100 transition-all active:scale-95 text-sm"
          >
            <LogOut size={18} />
            <span>Logout Account</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center">
              <div className="relative group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-purple-50 flex items-center justify-center text-[#8B19E6] border border-purple-100 mb-6 transition-all duration-500 group-hover:bg-white group-hover:shadow-xl">
                  <User size={48} />
                </div>
                <div className="absolute bottom-6 right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                   <CheckCircle size={14} className="text-white" />
                </div>
              </div>

              {isEditing ? (
                <input
                  className="text-2xl font-bold text-gray-900 border-b-2 border-purple-100 focus:border-[#8B19E6] focus:outline-none text-center w-full mb-2 bg-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{customer?.name}</h2>
              )}
              <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold mb-8">Premium Learner</p>

              <div className="w-full space-y-3 pt-6 border-t border-gray-50">
                {isEditing ? (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full bg-white border-0 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-100"
                      value={formData.oldPassword}
                      onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                    />
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="New Password"
                        className="w-full bg-white border-0 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-100"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3.5 text-gray-400">
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="w-full flex items-center justify-center gap-3 py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">
                    <Lock size={16} className="text-[#8B19E6]" /> Change Password
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 relative">
              <div className="absolute top-8 right-8 flex gap-3">
                {isEditing ? (
                  <>
                    <button onClick={handleSave} title='Save Profile' className="p-3 bg-green-50 hover:cursor-pointer text-green-600 rounded-xl hover:bg-green-100 transition-all"><Save size={20} /></button>
                    <button onClick={() => setIsEditing(false)} title='cancel changes' className="p-3 bg-red-50 hover:cursor-pointer text-red-500 rounded-xl hover:bg-red-100 transition-all"><X size={20} /></button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} title='update profile' className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:cursor-pointer hover:text-[#8B19E6] hover:bg-purple-50 transition-all"><Settings size={20} /></button>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-8">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                <InfoItem icon={<Mail size={20} />} label="Email Address" value={customer?.email} />
                <InfoItem 
                    icon={<Phone size={20} />} 
                    label="Phone Number" 
                    value={customer?.phone || 'Not Provided'} 
                    isEditable={isEditing}
                    fieldValue={formData.phone}
                    onFieldChange={(v) => setFormData({...formData, phone: v})}
                />
                <InfoItem icon={<Calendar size={20} />} label="Member Since" value={customer?.createdAt ? new Date(customer.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'N/A'} />
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Account Status</label>
                    <div className="flex items-center gap-3 py-2">
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-bold">
                            <ShieldCheck size={14} /> Verified Account
                        </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                   <BookOpen size={24} className="text-[#8B19E6]" />
                   Enrolled <span className="text-[#8B19E6]">Programs</span>
                </h3>
              </div>

              {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="group p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-purple-50 text-[#8B19E6] rounded-2xl flex items-center justify-center group-hover:bg-[#8B19E6] group-hover:text-white transition-all">
                          <BookOpen size={22} />
                        </div>
                        <div className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-wider">
                           {new Date(course.dateRaw).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </div>

                      <h4 className="font-bold text-gray-900 text-lg mb-4 line-clamp-1">{course.title}</h4>
                      
                      <div className="space-y-3 pt-6 border-t border-gray-50">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400 font-medium">Net Investment</span>
                          <span className="font-black text-gray-900">₹{course.amount}</span>
                        </div>
                        {course.coupon && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400 font-medium flex items-center gap-1.5"><Tag size={14} className="text-[#8B19E6]" /> Applied Coupon</span>
                            <span className="font-bold text-[#8B19E6]">{course.coupon}</span>
                          </div>
                        )}
                        <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#8B19E6] transition-all">
                           Open Course <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No active enrollments</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value, isEditable, fieldValue, onFieldChange }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">{label}</label>
      {isEditable && onFieldChange ? (
        <input 
            className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-purple-100"
            value={fieldValue}
            onChange={(e) => onFieldChange(e.target.value)}
        />
      ) : (
        <div className="flex items-center gap-4 text-gray-900 font-bold py-2">
            <div className="text-[#8B19E6]">{icon}</div>
            <span className="truncate">{value}</span>
        </div>
      )}
    </div>
  );
}