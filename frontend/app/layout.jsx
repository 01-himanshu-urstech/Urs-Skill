import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UpperNavbar from '@/components/layout/UpperNavbar';
import ReduxProvider from '@/store/provider';
// import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';


export const metadata = {
  title: 'Urs Skill - eCommerce and Marketing Academy',
  description: 'Learn eCommerce and Applied Marketing',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {/* <UpperNavbar /> */}
          <Navbar />
          <main>{children}</main>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <Footer className="mt-2" />
        </ReduxProvider>
        <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
      </body>
    </html>
  );
}
