import localFont from 'next/font/local';
import './globals.css'; // Import global styles

// Load custom fonts
// const geistSans = localFont({
//   src: '../public/fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });

// const geistMono = localFont({
//   src: '../public/fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

// Metadata for the application
export const metadata = {
  title: 'Celebrity Pulse - Thailand’s Rising Stars Platform',
  description: 'Celebrity Pulse - A fan-driven platform where fans vote to elevate the most promising Thai artists, shaping the future of entertainment.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet" />
        <meta name="description" content={metadata.description} />

        {/* Import custom CSS */}
        <link rel="stylesheet" href="/css/index.css" />

        {/* Import custom JS files */}
        <script src="/js/gsap.min.js" defer></script>
        <script src="/js/jquery.min.js" defer></script>
        <script src="/js/bez.js" defer></script>
        <script src="/js/pace.js" defer></script>
        <script src="/js/index.js" defer></script>
      </head>
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body>
        {children}
      </body>
    </html>
  );
}
