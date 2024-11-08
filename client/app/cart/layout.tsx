'use client';

import { Provider } from "react-redux";
import store from '@/redux/store';
import  { ChildrenProps } from '@/_types/global'

// export default function Layout({ children }: ChildrenProps){
export default function Layout({ children }: ChildrenProps){
 
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
}

