// "use client";
// import { Provider } from "react-redux";
// import { store } from "../redux/store/store";
// import { usePathname } from 'next/navigation';
// import './globals.css';
// import Sidebar from '../components/layout/Sidebar';
// import { LayoutProvider } from '../context/LayoutContext';
// import MainContentWrapper from '../components/layout/MainContentWrapper';

// export default function RootLayout({ children }) {
//   const pathname = usePathname();
//   const isLoginPage = pathname === '/login';

//   return (
//     <Provider store={store}>
//       <html lang="en">
//         <body className="bg-neutral flex text-gray-900 overflow-x-hidden">
//           {isLoginPage ? (
//             // Sirf Login Form dikhega
//             <div className="w-full h-screen bg-gray-50">
//               {children}
//             </div>
//           ) : (
//             // Baki pages ke liye pura Dashboard UI
//             <LayoutProvider>
//               <Sidebar />
//               <MainContentWrapper>
//                 {children}
//               </MainContentWrapper>
//             </LayoutProvider>
//           )}
//         </body>
//       </html>
//     </Provider>
//   );
// }

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
      {/* 1. suppressHydrationWarning added to html tag */}
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* 2. Global Script to suppress hydration errors in console */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                const originalError = console.error;
                console.error = (...args) => {
                  if (args[0]?.includes?.('Hydration') || args[0]?.includes?.('content does not match')) {
                    return;
                  }
                  originalError.apply(console, args);
                };
              `,
            }}
          />
        </head>
        {/* 3. Added antialiased and suppressHydrationWarning to body */}
        <body className="bg-neutral flex text-gray-900 overflow-x-hidden antialiased" suppressHydrationWarning>
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