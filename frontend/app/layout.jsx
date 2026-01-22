import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SideHoverNav from '@/components/layout/SideHoverNav'; // Import your new component
import ReduxProvider from '@/store/provider';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Urs Skill - eCommerce and Marketing Academy',
  description: 'Learn eCommerce and Applied Marketing',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative"> {/* Added relative for better fixed positioning context */}
        <ReduxProvider>
          {/* 1. Global Navigation Components */}
          <Navbar />
          
          {/* 2. Fixed Hover Navigation (Stays on left across all screens) */}
          <SideHoverNav /> 
          
          {/* 3. Main Content Area */}
          <main>{children}</main>
          
          {/* 4. Feedback & Footer */}
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <Footer className="mt-2" />
        </ReduxProvider>

        {/* External SDKs */}
        <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
      </body>
    </html>
  );
}