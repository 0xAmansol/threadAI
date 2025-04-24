"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { ModeSwitcher } from "@workspace/ui/components/mode-switcher";
import Image from "next/image";

import { LoginButton } from "./LoginButton";
import ThemeToggleButton from "../ui/theme-toggle-button";

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowLinks(false);
      } else {
        setShowLinks(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="h-20 fixed top-0 left-0 right-0 flex items-center z-50 justify-center">
      <div
        className={`flex items-center justify-center gap-3 p-2 px-4 bg-muted/70 backdrop-blur-sm transition-all duration-300 rounded-full ${
          showLinks
            ? "max-w-[520px] w-full md:gap-8"
            : "max-w-[320px] w-full md:gap-2"
        }`}
      >
        <Link className="flex text-sm items-center" href={"/"}>
          <Image
            width={56}
            height={56}
            src="/logo.png"
            alt="Logo"
            className="block dark:hidden"
          />
          <Image
            width={40}
            height={40}
            src="/logo2.png"
            alt="Logo"
            className="hidden dark:block"
          />
        </Link>
        <div
          className={`flex items-center gap-3 text-md text-gray-700 transition-all duration-300 dark:text-gray-200 ${
            showLinks
              ? "opacity-100 max-w-full"
              : "opacity-0 max-w-0 overflow-hidden"
          }`}
        >
          <Link href={"/community"}>Community</Link>
          <Link href={"/projects"}>Projects</Link>
        </div>
        <div className="flex gap-1 md:gap-2 items-center">
          <LoginButton />
          <ThemeToggleButton start="top-right" />
        </div>
      </div>
    </nav>
  );
}
