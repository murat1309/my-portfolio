"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import translationsData from "@/translations.json";

interface Translations {
  pages: {
    id: string;
    en: Partial<Record<string, string>>;
    tr: Partial<Record<string, string>>;
  }[];
  navbar: {
    en: Partial<Record<string, string>>;
    tr: Partial<Record<string, string>>;
  };
}

interface LanguageContextType {
  language: "en" | "tr";
  setLanguage: (lang: "en" | "tr") => void;
  getTranslation: (pageId: string, key: string) => string;
  getNavbarTranslation: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<"en" | "tr">("en"); // Default language is English
  const translations: Translations = translationsData as Translations;

  // Attempt to load language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang === "en" || savedLang === "tr") {
      setLanguage(savedLang);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const getTranslation = (pageId: string, key: string): string => {
    const page = translations.pages.find((p) => p.id === pageId);
    if (page) {
      return page[language][key] || key;
    }
    return key;
  };

  const getNavbarTranslation = (key: string): string => {
    return translations.navbar[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getTranslation, getNavbarTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
} 