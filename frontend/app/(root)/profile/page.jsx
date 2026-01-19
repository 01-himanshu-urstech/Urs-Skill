'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGetMyProfileQuery } from '@/store/api/customerApi';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const {
    data,
    isLoading,
    isError,
    error
  } = useGetMyProfileQuery(undefined, {
    skip: !isAuthenticated
  });

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // ❌ API Error
  useEffect(() => {
    if (isError) {
      if (error?.status === 401) {
        toast.error('Session expired. Please login again');
        router.push('/login');
      } else {
        toast.error('Failed to load profile');
      }
    }
  }, [isError, error, router]);

  if (isLoading) {
    return (
      <div className="text-center mt-20">
        Loading profile...
      </div>
    );
  }

    if (isError) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">
            Unable to load profile
        </p>
        </div>
    );
    }


  const customer = data?.data?.customer;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg mb-4">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      <div className="space-y-4 text-sm">
        <div>
          <span className="font-medium">Name:</span>{' '}
          {customer?.name || '-'}
        </div>

        <div>
          <span className="font-medium">Email:</span>{' '}
          {customer?.email || '-'}
        </div>

        <div>
          <span className="font-medium">Phone:</span>{' '}
          {customer?.phone}
        </div>

        <div>
          <span className="font-medium">Joined On:</span>{' '}
          {new Date(customer?.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
