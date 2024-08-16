'use client';

import StateProvider from './StateProvider.js';
import Header from "./_components/Header.js";

//  How do I use metadat in a client side component?
const metadata = {
  title: {
    template: "Vegan Mundi - %s",
    default: "Vegan Mundi - Vegan Cooking Classes"
  } ,
  description: "Learn how to make your own healthy, yummy ad sustainable in incredibly fun and affordable classes. Online or in person classes in Tampa, United States"
};

export default function LayoutHeader({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
      <html lang="en">
        <head>
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <StateProvider>
            <Header/>
            {children}
          </StateProvider>
        </body>
      </html>
    )
  }