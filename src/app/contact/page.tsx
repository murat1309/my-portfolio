"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Download } from "lucide-react";

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);

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
        <div className="contact-main-grid">
          {/* Map Section */}
          <div className="contact-map-section">
            <h3 className="section-title contact-map-title" style={{ '--section-index': 0 } as React.CSSProperties}>
              Find Me Here
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
        </div>
        <div className="w-full flex justify-center mt-8">
          <button className="contact-download-btn">
            <Download size={19} />
            Download My CV
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
