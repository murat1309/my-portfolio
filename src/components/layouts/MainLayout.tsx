"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Smartphone, MapPin, Linkedin, Github, BookOpen, Twitter, Menu, X, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/animations/PageTransition";
import { useLanguage } from "@/context/LanguageContext";

interface MainLayoutProps {
  children: ReactNode;
  sidebarAnimate?: boolean;
}

export default function MainLayout({ children, sidebarAnimate }: MainLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, getNavbarTranslation } = useLanguage();

  const navLinks = [
    { href: "/", label: getNavbarTranslation("about") },
    { href: "/resume", label: getNavbarTranslation("resume") },
    { href: "/courses", label: getNavbarTranslation("courses") },
    //{ href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: getNavbarTranslation("contact") },
  ];

  const currentPageLabel = navLinks.find(link => link.href === pathname)?.label || "Page";
  const displayTitle = pathname === "/" ? getNavbarTranslation("about") : currentPageLabel;

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "tr" : "en");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#18191a]">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#18191a]/80 border-b border-[#282828]">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Name Section */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-black font-bold text-xl">M</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white font-semibold">Muratcan Gökyokuş</h1>
                <p className="text-sm text-gray-400">{getNavbarTranslation("backendDeveloper")}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 relative">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "header-nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group overflow-visible",
                      isActive ? "text-primary" : "text-gray-300"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* Animated underline for active and hover */}
                    {isActive && (
                      <motion.div
                        layoutId="header-underline"
                        className="absolute left-4 right-4 h-1 bg-primary rounded-full bottom-0 z-0"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {/* Hover underline (only if not active) */}
                    {!isActive && (
                      <span className="absolute left-4 right-4 h-1 bg-primary/60 rounded-full bottom-0 z-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                  </Link>
                );
              })}

              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                className="ml-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <motion.div
                  className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold"
                  initial={{ backgroundColor: language === "en" ? "#800080" : "#333" }}
                  animate={{ backgroundColor: language === "en" ? "#800080" : "#333" }}
                  transition={{ duration: 0.3 }}
                >
                  {language === "en" ? "EN" : "TR"}
                </motion.div>
                <span className="text-sm text-gray-300">
                  {language === "en" ? "English" : "Türkçe"}
                </span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4"
              >
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "bg-primary text-black"
                          : "text-gray-300 hover:bg-white/10"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-start justify-center py-8 px-4">
        <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className={cn("sidebar-card", sidebarAnimate && "sidebar-card-animate")}>
            <div className="avatar-wrapper">
              <Image
                src="/my.jpg"
                alt="Muratcan Gökyokuş"
                width={116}
                height={116}
                className="avatar-image"
                unoptimized
              />
              <div className="online-indicator"></div>
            </div>
            <div className="sidebar-name">Muratcan Gökyokuş</div>
            <div className="sidebar-badge">
              <span className="badge-text-default">{getNavbarTranslation("backendDeveloper")}</span>
              <span className="badge-text-hover">✨ Backend Pro ✨</span>
            </div>
            <div className="sidebar-divider"></div>
            <div className="w-full mb-2">
              <div className="sidebar-contact-item">
                <div className="contact-icon-wrapper">
                  <Mail className="contact-icon" />
                </div>
                <div>
                  <div className="contact-label">EMAIL</div>
                  <a href="mailto:muratcangokyokus@gmail.com" className="contact-value">
                    muratcangokyokus@gmail.com
                  </a>
                </div>
              </div>
              <div className="sidebar-contact-item">
                <div className="contact-icon-wrapper">
                  <Smartphone className="contact-icon" />
                </div>
                <div>
                  <div className="contact-label">PHONE</div>
                  <a href="tel:+905553372711" className="contact-value">
                    +90 555 337 27 11
                  </a>
                </div>
              </div>
              <div className="sidebar-contact-item">
                <div className="contact-icon-wrapper">
                  <MapPin className="contact-icon" />
                </div>
                <div>
                  <div className="contact-label">LOCATION</div>
                  <span className="contact-value">Istanbul, Turkey</span>
                </div>
              </div>
            </div>
            <div className="sidebar-socials">
              <a
                href="https://www.linkedin.com/in/muratcangokyokus"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-wrapper"
              >
                <Linkedin className="social-icon" />
              </a>
              <a
                href="https://github.com/murat1309"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-wrapper"
              >
                <Github className="social-icon" />
              </a>
              <a
                href="https://g.dev/muratcangokyokus"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-wrapper"
              >
                <BookOpen className="social-icon" />
              </a>
              <a
                href="https://www.instagram.com/muratcangokyokus"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-wrapper"
              >
                <Instagram className="social-icon" />
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 bg-card rounded-[20px] ">
            <AnimatePresence mode="wait">
              <PageTransition key={pathname}>
                {children}
              </PageTransition>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
