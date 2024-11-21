'use client';

import StateProvider from './StateProvider';
import { Provider } from "react-redux";
import store from './redux/store';
import Header from "./_components/Header";
import { usePathname  } from 'next/navigation';
import  { ChildrenProps } from './_types/global'
import './_styles/main.css';
import './_styles/layout.css';
import './_styles/header.css';
import DarkBackground from './_components/DarkBackground';

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
            <Provider store={store}>
              {/* Conditional rendering of the Header needed to be implemented as the App Router hirerachical structure with different layouts
              doesn't work properly with client side components */}
              {!excludeHeaderRoutes.includes(route) && <Header/>}
              <DarkBackground />
              {children}
            </Provider>
          </StateProvider>
        </body>
      </html>
  );
}