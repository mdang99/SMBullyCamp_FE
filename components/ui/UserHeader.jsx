"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function UserHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Trang chủ", href: "/welcome" },
    { name: "Cây phả hệ", href: "/familytree" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <header className="bg-gradient-to-r from-[#f9ede4] to-[#fffaf5] shadow-md sticky top-0 z-50 border-b border-[#e4d2c0]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="./img/vector-mau.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-bold text-[#4e342e]">
            SM Bully Camp
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "bg-gradient-to-r from-[#a97458] to-[#6d4c41] text-white shadow-md"
                  : "text-[#5d4037] hover:text-[#3e2723] hover:bg-[#f1e5dc]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#5d4037]"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                isActive(item.href)
                  ? "bg-gradient-to-r from-[#a97458] to-[#6d4c41] text-white shadow"
                  : "text-[#5d4037] hover:text-[#3e2723] hover:bg-[#f1e5dc]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
