"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { getTranslation, language } = useLanguage();

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout sidebarAnimate>
      <div className={`contact-page-container ${isLoaded ? 'animate-in' : ''}`}>
        {/* Contact content with sidebar and map side by side */}
        <motion.div 
          key={`contact-grid-${language}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="contact-main-grid"
        >
          {/* Map Section */}
          <div className="contact-map-section">
            <h3 className="section-title contact-map-title" style={{ '--section-index': 0 } as React.CSSProperties}>
              {getTranslation("contactPage", "findMeHereTitle")}
            </h3>
            
            <div className="contact-map-container" style={{ '--map-index': 0 } as React.CSSProperties}>
              <iframe
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '1rem' }}
                src="https://maps.google.com/maps?q=İstanbul,+Çekmeköy,+Merkez+Mahallesi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div> 

            
          </div>
        </motion.div>
        <motion.div 
          key={`download-btn-${language}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="w-full flex justify-center mt-8"
        >
          <a href="/muratcan-gokyokus-CV.pdf" download className="contact-download-btn">
            <Download size={19} />
            {getTranslation("contactPage", "downloadCVButton")}
          </a>
        </motion.div>
      </div>
    </MainLayout>
  );
}
