"use client";

import { useEffect, useRef } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Download, BookOpen, Briefcase } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function ResumePage() {
  // Ref for main container to add animation class
  const mainRef = useRef<HTMLDivElement>(null);
  const { getTranslation, language } = useLanguage();
  
  // Add animation class after component mounts
  useEffect(() => {
    // Wait a small amount of time before starting animations
    const timer = setTimeout(() => {
      if (mainRef.current) {
        mainRef.current.classList.add('animate-in');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Set CSS custom property for item index
  useEffect(() => {
    // Get all timeline items
    const timelineItems = document.querySelectorAll('.resume-timeline-item');
    const timelineDots = document.querySelectorAll('.resume-timeline-dot');
    const bullets = document.querySelectorAll('.resume-bullet');
    
    // Set index as CSS variable for staggered animations
    timelineItems.forEach((item, index) => {
      (item as HTMLElement).style.setProperty('--item-index', index.toString());
    });
    
    timelineDots.forEach((dot, index) => {
      (dot as HTMLElement).style.setProperty('--item-index', index.toString());
    });
    
    // Set staggered animation for bullet points
    bullets.forEach((bullet, index) => {
      (bullet as HTMLElement).style.setProperty('--bullet-index', index.toString());
    });
  }, []);

  return (
    <MainLayout>
      <div className="main-card" ref={mainRef}>
        {/* Resume Title */}
        <motion.h1 
          key={`resume-title-${language}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="section-title"
        >
          {getTranslation("resumePage", "resumeTitle")}
        </motion.h1>

        {/* Experience Section */}
        <motion.div 
          key={`experience-section-${language}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{ marginBottom: '2.8rem', position: 'relative' }}
        >
          {/* Timeline line */}
          <div className="resume-timeline-line2"></div>
          
          {/* Experience Title Row */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', position: 'relative' }}>
            <span className="resume-section-icon"><Briefcase size={24} /></span>
            <h2 className="resume-section-title">{getTranslation("resumePage", "experienceTitle")}</h2>
          </div>

          <div className="resume-timeline">
           

            {/* Backend Developer & DevOps Engineer, Kauna.ai */}
            <div className="resume-timeline-item">
              <div className="resume-timeline-dot"></div>
              <div className="resume-timeline-content">
                <div>{getTranslation("resumePage", "seniorBackendDevOpsEngineerTitle")}</div>
                <div>{getTranslation("resumePage", "kaunaAIName")}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="resume-badge">{getTranslation("resumePage", "kaunaAIDates")}</span>
                  <span style={{ color: '#bdbdbd', fontSize: '0.92rem', fontStyle: 'italic' }}>{getTranslation("resumePage", "kaunaAILocation")}</span>
                </div>
                <ul style={{ marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "kaunaAIDesc1")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "kaunaAIDesc2")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "kaunaAIDesc3")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "kaunaAIDesc4")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "kaunaAIDesc5")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "kaunaAIDesc6")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "kaunaAIDesc7")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "kaunaAIDesc8")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "kaunaAIDesc9")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "kaunaAIDesc10")}</li>
                </ul>
              </div>
            </div>


            {/* Fullstack Developer, OBSS Technology */}
            <div className="resume-timeline-item">
              <div className="resume-timeline-dot"></div>
              <div className="resume-timeline-content">
                <div>{getTranslation("resumePage", "backendDeveloperObssTitle")}</div>
                <div>{getTranslation("resumePage", "obssTechnologyName")}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="resume-badge">{getTranslation("resumePage", "obssTechnologyDates")}</span>
                  <span style={{ color: '#bdbdbd', fontSize: '0.92rem', fontStyle: 'italic' }}>{getTranslation("resumePage", "obssTechnologyLocation")}</span>
                </div>
                <ul style={{ marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "obssTechnologyDesc1")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "obssTechnologyDesc2")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "obssTechnologyDesc3")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "obssTechnologyDesc4")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "obssTechnologyDesc5")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "obssTechnologyDesc6")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "obssTechnologyDesc7")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "obssTechnologyDesc8")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "obssTechnologyDesc9")}</li>
                </ul>
              </div>
            </div>
            
            {/* Fullstack Developer, Vadi Kurumsal Bilgi Sistemleri */}
            <div className="resume-timeline-item">
              <div className="resume-timeline-dot"></div>
              <div className="resume-timeline-content">
                <div>{getTranslation("resumePage", "fullstackDeveloperVadiTitle")}</div>
                <div>{getTranslation("resumePage", "vadiName")}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="resume-badge">{getTranslation("resumePage", "vadiDates")}</span>
                  <span style={{ color: '#bdbdbd', fontSize: '0.92rem', fontStyle: 'italic' }}>{getTranslation("resumePage", "vadiLocation")}</span>
                </div>
                <ul style={{ marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "vadiDesc1")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "vadiDesc2")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "vadiDesc3")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "vadiDesc4")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "vadiDesc5")}</li>
                </ul>
              </div>
            </div>

            {/* Backend Developer Intern */}
            <div className="resume-timeline-item">
              <div className="resume-timeline-dot"></div>
              <div className="resume-timeline-content">
                <div>{getTranslation("resumePage", "backendDeveloperInternTitle")}</div>
                <div>{getTranslation("resumePage", "etiyaName")}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="resume-badge">{getTranslation("resumePage", "etiyaDates")}</span>
                  <span style={{ color: '#bdbdbd', fontSize: '0.92rem', fontStyle: 'italic' }}>{getTranslation("resumePage", "etiyaLocation")}</span>
                </div>
                <ul style={{ marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "etiyaDesc1")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "etiyaDesc2")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "etiyaDesc3")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "etiyaDesc4")}</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>{getTranslation("resumePage", "etiyaDesc5")}</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

  {/* Education Section */}
  <motion.div 
    key={`education-section-${language}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    style={{ marginBottom: '2.8rem', position: 'relative' }}
  >
          {/* Timeline line */}
          <div className="resume-timeline-line1"></div>
          
          {/* Education Title Row */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', position: 'relative' }}>
            <span className="resume-section-icon"><BookOpen size={24} /></span>
            <h2 className="resume-section-title">{getTranslation("resumePage", "educationTitle")}</h2>
          </div>

          <div className="resume-timeline">
            <div className="resume-timeline-item">
              <div className="resume-timeline-dot"></div>
              <div className="resume-timeline-content">
                <div>{getTranslation("resumePage", "duzceUniversityName")}</div>
                <div>{getTranslation("resumePage", "duzceUniversityDegree")}</div>
                <span className="resume-badge">{getTranslation("resumePage", "duzceUniversityDates")}</span>
              </div>
            </div>
            <div className="resume-timeline-item">
              <div className="resume-timeline-dot secondary"></div>
              <div className="resume-timeline-content">
                <div>{getTranslation("resumePage", "nesrinUcakliogluName")}</div>
                <div>{getTranslation("resumePage", "nesrinUcakliogluDegree")}</div>
                <span className="resume-badge">{getTranslation("resumePage", "nesrinUcakliogluDates")}</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Download CV Button */}
        <div className="w-full flex justify-center mt-8">
          <a href="/muratcan-gokyokus-CV.pdf" download className="resume-download-btn">
            {getTranslation("resumePage", "downloadCVButton")}
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
