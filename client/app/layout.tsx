'use client';

import StateProvider from './StateProvider';
import Header from "./_components/Header";
import { usePathname  } from 'next/navigation';

import  { ChildrenProps } from './_types/global'
import './_styles/main.css';
import './_styles/header.css';

// export default function Layout({ children }: ChildrenProps){
export default function Layout({ children }: ChildrenProps){

  const excludeHeaderRoutes = [
    '/account/create',
    '/account/signin'
  ];

  const route = usePathname ();
  
  return (
      <html>
        <head>
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        </head>
        <body>
          <StateProvider>
            {/* Conditional rendering of the Header needed to be implemented as the App Router hirerachical structure with different layouts
             doesn't work properly with client side components */}
            {!excludeHeaderRoutes.includes(route) && <Header/>}
            {children}
          </StateProvider>
        </body>
      </html>
  );
}