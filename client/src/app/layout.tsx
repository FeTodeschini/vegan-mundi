export default function RootLayout({
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
          <title>Vegan Mundi - Vegan Cooking Classes</title>
          <meta name="description" content="Learn how to make your own healthy, yummy ad sustainable in incredibly fun and affordable classes. Online or in person classes in Tampa, United States"></meta>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root">{children}</div>
        </body>
      </html>
    )
  }