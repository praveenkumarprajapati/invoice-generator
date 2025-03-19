"use client";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";
import { SyncLocalStorage } from "./components/SyncLocalStoragrage";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { NotificationProvider } from "./components/NotificationProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html data-theme="winter" lang="en">
        <SyncLocalStorage />
        <body className={`antialiased`}>
          <NotificationProvider />
          <Header />
          <div className="min-h-[calc(100vh-64px)]">{children}</div>
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
