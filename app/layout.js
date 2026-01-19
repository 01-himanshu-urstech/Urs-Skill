"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { usePathname } from 'next/navigation';
import './globals.css';
import Sidebar from '../components/layout/Sidebar';
import { LayoutProvider } from '../context/LayoutContext';
import MainContentWrapper from '../components/layout/MainContentWrapper';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <Provider store={store}>
      <html lang="en">
        <body className="bg-neutral flex text-gray-900 overflow-x-hidden">
          {isLoginPage ? (
            // Sirf Login Form dikhega
            <div className="w-full h-screen bg-gray-50">
              {children}
            </div>
          ) : (
            // Baki pages ke liye pura Dashboard UI
            <LayoutProvider>
              <Sidebar />
              <MainContentWrapper>
                {children}
              </MainContentWrapper>
            </LayoutProvider>
          )}
        </body>
      </html>
    </Provider>
  );
}