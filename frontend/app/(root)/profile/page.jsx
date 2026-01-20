'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from '@/store/api/customerApi';
import { logout } from '@/store/slices/authSlice';
import toast from 'react-hot-toast'; // Changed import
import { 
  User, Mail, Phone, Calendar, LogOut, 
  ShieldCheck, Settings, Lock, BookOpen, ExternalLink, Save, X, Eye, EyeOff 
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

  const { data, isLoading } = useGetMyProfileQuery(undefined, { skip: !isAuthenticated });
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();

  const customer = data?.data?.customer;

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
    toast.success("Logged out successfully"); // react-hot-toast syntax
    router.push('/login');
  };

  const handleSave = async () => {
    const isNameChanged = formData.name !== customer.name;
    const isEmailChanged = formData.email !== customer.email;
    const isPhoneChanged = formData.phone !== customer.phone;
    const isPasswordChanging = formData.newPassword.length > 0;

    if (!isNameChanged && !isEmailChanged && !isPhoneChanged && !isPasswordChanging) {
      toast("No changes detected.", { icon: 'ℹ️' }); // react-hot-toast info equivalent
      setIsEditing(false);
      return; 
    }

    // Start a loading toast
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
      
      // Update the existing loading toast to success
      toast.success("Profile updated successfully!", { id: loadingToast });
      setIsEditing(false);
      setFormData(prev => ({ ...prev, oldPassword: '', newPassword: '' }));
    } catch (err) {
      // Update the existing loading toast to error
      toast.error(err?.data?.message || "Update failed", { id: loadingToast });
    }
  };

  const renderPasswordHint = () => {
    if (!customer?.password) return "••••••••";
    const lastFour = customer.password.slice(-4);
    return `••••••••${lastFour}`;
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
    </div>
  );

  const enrolledCourses = customer?.enrolledCourses || [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto relative">
        <button 
          onClick={handleLogout} 
          className="absolute -top-2 right-0 flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-8 pt-2">My Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-purple-100 relative overflow-hidden h-fit">
            <div className="absolute top-4 right-4 bg-purple-50 text-purple-700 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold border border-purple-100">
              <ShieldCheck size={14} />VERIFIED
            </div>

            <div className="flex flex-col items-center text-center mt-4">
              <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 border-4 border-purple-50 mb-4">
                <User size={48} />
              </div>
              
              {isEditing ? (
                <input 
                  className="text-xl font-bold text-gray-900 border-b border-purple-300 focus:outline-none text-center w-full mb-2 bg-transparent" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-900">{customer?.name}</h2>
              )}
              <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-semibold">Student Account</p>
              
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 hover:bg-purple-50 text-purple-700 border border-purple-100 rounded-xl transition-all font-semibold"
              >
                <Lock size={18} /> {isEditing ? "Editing Mode" : "Change Password"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
            <div className="absolute top-6 right-6 flex gap-2">
              {isEditing ? (
                <>
                  <button onClick={handleSave} disabled={isUpdating} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all">
                    <Save size={22} />
                  </button>
                  <button onClick={() => setIsEditing(false)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <X size={22} />
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-purple-700 transition-colors">
                  <Settings size={20} />
                </button>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <Mail size={18} className="text-purple-600" />
                  {isEditing ? (
                    <input 
                      className="border-b w-full focus:outline-none border-purple-200 py-1" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                  ) : customer?.email}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <Phone size={18} className="text-purple-600" />
                  {isEditing ? (
                    <input 
                      className="border-b w-full focus:outline-none border-purple-200 py-1" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    />
                  ) : (customer?.phone || 'Not Provided')}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Password Security</label>
                <div className="flex items-start gap-3 text-gray-700 font-medium relative">
                  <Lock size={18} className="text-purple-600 mt-1" />
                  {isEditing ? (
                    <div className="w-full flex flex-col gap-3 pr-8">
                      <input 
                        type={showPass ? "text" : "password"} 
                        placeholder="Current Password" 
                        className="border-b w-full focus:outline-none border-purple-200 py-1 text-sm" 
                        value={formData.oldPassword} 
                        onChange={(e) => setFormData({...formData, oldPassword: e.target.value})} 
                      />
                      <input 
                        type={showPass ? "text" : "password"} 
                        placeholder="New Password" 
                        className="border-b w-full focus:outline-none border-purple-200 py-1 text-sm" 
                        value={formData.newPassword} 
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})} 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-0 top-1 text-gray-400 hover:text-purple-600"
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  ) : (
                    <span className="font-mono text-gray-400 tracking-wider">
                      {renderPasswordHint()}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Member Since</label>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <Calendar size={18} className="text-purple-600" />
                  {customer?.createdAt ? new Date(customer.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-2">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BookOpen size={20} className="text-purple-700" />
              My Enrolled Courses
            </h3>

            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledCourses.map((course, index) => (
                  <div key={index} className="p-4 border border-gray-100 rounded-xl hover:border-purple-200 transition-colors bg-purple-50/30 group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700">{course.title}</h4>
                      <ExternalLink size={16} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <BookOpen size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No courses enrolled yet.</p>
                <button 
                  onClick={() => router.push('/courses')}
                  className="mt-4 text-purple-700 font-bold hover:underline"
                >
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}