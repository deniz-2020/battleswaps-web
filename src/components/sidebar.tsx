"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/button";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Swords,
  Info,
  FileText,
} from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/request-battle", icon: Swords, label: "Request battle" },
  { href: "/open-battles", icon: FileText, label: "Open battle requests" },
  { href: "/my-battles", icon: FileText, label: "My battles" },
  { href: "/about", icon: Info, label: "About" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className={`bg-gray-900 text-white transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:white self-end"
          >
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-white hover:white ${
                      pathname === item.href ? "bg-blue-600" : ""
                    }`}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {isOpen && item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
