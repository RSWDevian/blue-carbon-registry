"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SessionProvider } from "next-auth/react";
import Theme from "./theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <meta name="description" content="Hi" />
        <title>Black Carbon Registry</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <Theme>
            <SessionProvider>
              {children}
            </SessionProvider>
          </Theme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}