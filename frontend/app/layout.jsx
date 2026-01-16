import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UpperNavbar from '@/components/layout/UpperNavbar';

export const metadata = {
  title: 'Urs Skill - eCommerce and Marketing Academy',
  description: 'Learn eCommerce and Applied Marketing',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UpperNavbar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
