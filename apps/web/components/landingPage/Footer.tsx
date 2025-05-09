"use client";

import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { ArrowUpRight, Mail, Heart, XIcon, X } from "lucide-react";
import React from "react";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex justify-center w-full mb-7">
      <footer className="z-20 mt-16 flex max-h-fit min-h-[12rem] flex-col justify-between gap-10 rounded-xl border border-yellow-500/20 bg-transparent dark:bg-black/60 p-8 backdrop-blur-lg md:flex-row md:items-center w-full max-w-[70%]">
        <section className="flex-1">
          <aside className="flex flex-col gap-[10px]">
            <p className="font-secondary text-2xl font-extrabold tracking-tight md:text-4xl">
              kreate<span className="text-yellow-500">AI</span>
              <span className="text-yellow-500">.</span>
            </p>
            <p className="text-sm text-gray-400">
              Showcase your open-source journey in style.
            </p>
          </aside>

          <aside className="mt-6 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-4">
              <Link
                href={"https://github.com/amanbairagi30/merged-n-share/"}
                className="group rounded-full p-2 transition-colors hover:bg-gray-800 "
              >
                <GitHubLogoIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
              </Link>
              <Link
                href={"https://x.com/AMANBAIRAGI_30/"}
                className="group rounded-full p-2 transition-colors hover:bg-gray-800 "
              >
                <TwitterLogoIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
              </Link>
              <Link
                href={"mailto:contact@example.com"}
                className="group rounded-full p-2 transition-colors hover:bg-gray-800"
              >
                <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
              </Link>
            </div>

            <div className="h-4 w-px bg-gray-700"></div>

            <p className="text-sm text-gray-400">
              Made with <Heart className="inline h-3 w-3 text-red-500" /> by{" "}
              <Link
                href="https://github.com/amanbairagi30"
                className="font-medium text-white hover:text-yellow-500 transition-colors"
              >
                Aman
              </Link>
            </p>
          </aside>

          <aside className="mt-6 flex flex-col md:flex-row md:flex-wrap gap-4 text-sm text-gray-400">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="hidden md:inline">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="hidden md:inline">•</span>
            <p>&copy; {year} | All Rights Reserved.</p>
          </aside>
        </section>

        <section
          onClick={scrollToTop}
          className="group flex h-[8rem] w-full cursor-pointer items-center justify-center rounded-xl border border-yellow-500 bg-yellow-500 text-black transition-all duration-300 hover:bg-yellow-400 md:w-[12rem]"
        >
          <div className="relative">
            <ArrowUpRight className="h-16 w-16 rotate-45 transition-transform duration-300 ease-out group-hover:rotate-0" />
            <span className="absolute -bottom-6 left-1/2 w-max -translate-x-1/2 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Back to top
            </span>
          </div>
        </section>
      </footer>
    </div>
  );
}
