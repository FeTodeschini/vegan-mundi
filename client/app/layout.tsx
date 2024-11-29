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

// export default function Layout({ children }: ChildrenProps){
export default function Layout({ children }: ChildrenProps){

  const excludeHeaderRoutes = [
    '/account/create',
    '/account/signin'
  ];

  const route = usePathname ();
  
  return (
      <html>
        <body>
          <StateProvider>
            <Provider store={store}>
              {!excludeHeaderRoutes.includes(route) && 
                <Header/>
              }
              {children}
            </Provider>
          </StateProvider>
        </body>
      </html>
  );
}