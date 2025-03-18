"use client";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";
import { SyncLocalStorage } from "./components/SyncLocalStoragrage";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <SyncLocalStorage />
        <body className={`antialiased`}>
          <Header />

          {children}
        </body>
      </html>
    </Provider>
  );
}
