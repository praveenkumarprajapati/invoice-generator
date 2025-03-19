"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Invoices", path: "/invoices" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Header */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl flex font-bold text-blue-600">
            <Image src="logo.svg" alt="logo" width={30} height={30} />
            <span>Invoice Generator</span>
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-4 text-gray-700">
            {NAV_LINKS.map(({ name, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  className={`hover:text-blue-600 transition ${
                    pathname === path ? "text-blue-600 font-semibold" : ""
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu (Opens Below Header) */}
      {isOpen && (
        <div className="absolute left-0 w-full bg-white shadow-md p-4 z-10 transition-transform duration-300">
          <ul className="flex flex-col gap-3 text-gray-700">
            {NAV_LINKS.map(({ name, path }) => (
              <li key={path}>
                <Link
                  href={path}
                  className={`block p-2 hover:text-blue-600 transition ${
                    pathname === path ? "text-blue-600 font-semibold" : ""
                  }`}
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
