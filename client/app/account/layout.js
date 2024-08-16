'use client';

import StateProvider from '../StateProvider.js';

const metadata = {
  title: {
    template: "Vegan Mundi - %s",
    default: "Vegan Mundi - Vegan Cooking Classes"
  } ,
  description: "Learn how to make your own healthy, yummy ad sustainable in incredibly fun and affordable classes. Online or in person classes in Tampa, United States"
};

export default function Layout({children}) {
    
    return (
      <html lang="en">
        <head>
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <title>Vegan Mundi - Vegan Cooking Classes</title>
          <meta name="description" content="Learn how to make your own healthy, yummy ad sustainable in incredibly fun and affordable classes. Online or in person classes in Tampa, United States"></meta>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <StateProvider>
            {children}
          </StateProvider>
        </body>
      </html>
    )
  }