"use client";

import { useEffect, useRef } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Download, BookOpen, Briefcase } from "lucide-react";

export default function ResumePage() {
  // Ref for main container to add animation class
  const mainRef = useRef<HTMLDivElement>(null);
  
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
        <h1 className="section-title">
          Resume
        </h1>

        {/* Experience Section */}
        <div style={{ marginBottom: '2.8rem', position: 'relative' }}>
          {/* Timeline line */}
          <div className="resume-timeline-line2"></div>
          
          {/* Experience Title Row */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', position: 'relative' }}>
            <span className="resume-section-icon"><Briefcase size={24} /></span>
            <h2 className="resume-section-title">Experience</h2>
          </div>

          <div className="resume-timeline">
           

            {/* Backend Developer & DevOps Engineer, Kauna.ai */}
            <div className="resume-timeline-item">
              <div className="resume-timeline-dot"></div>
              <div className="resume-timeline-content">
                <div>Senior Backend Developer & DevOps Engineer</div>
                <div>Kauna.ai</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="resume-badge">Sep, 2024 – Jun, 2025</span>
                  <span style={{ color: '#bdbdbd', fontSize: '0.92rem', fontStyle: 'italic' }}>Remote</span>
                </div>
                <ul style={{ marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Architected and built a modular, testable, high-performance Node.js API from scratch using NestJS and TypeScript.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Implemented full end-to-end user authentication with AWS Cognito, including native sign-up, email confirmation, sign-in, password reset, and resend-confirmation flows.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Integrated OAuth2+PKCE social logins (Google, Facebook) via Cognito's /authorize and /token endpoints, leveraging Redis (ElastiCache) for secure session storage.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Mastered the aws-sdk and aws-cognito-sdk libraries to handle all authentication flows server-side; added refresh-token blacklisting and single-device session management for enhanced security.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Modeled and managed user–product relationships in MongoDB within transactions; optimized performance with indexes and sharding strategies.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Employed Terraform for Infrastructure as Code, provisioning AWS resources (EKS, ElastiCache, S3, CloudFront, Lambda, API Gateway, IAM, ECS/ECR, SQS, SNS, CodePipeline, etc.) in modular dev/prod environments.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Developed CI/CD pipelines using GitHub Actions and AWS CodePipeline/CodeBuild, automating Docker builds and deployments to AWS EKS/ECS with seamless rollback capabilities.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Enforced security and reliability best practices: JWT authorization, CSRF protection, CORS configuration, rate-limiting, input validation, centralized exception handling, and comprehensive logging/monitoring.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Integrated intelligent styling suggestions via the OpenAI API; added affiliate functionality with Amazon PAAPI and virtual try-on services, applying performance optimizations throughout.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Established a scalable, best-practice microservices architecture that minimizes redundancy and enables rapid feature expansion.</li>
                </ul>
              </div>
            </div>


            {/* Fullstack Developer, OBSS Technology */}
            <div className="resume-timeline-item">
              <div className="resume-timeline-dot"></div>
              <div className="resume-timeline-content">
                <div>Backend Developer</div>
                <div>OBSS Technology</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="resume-badge">Nov, 2019 – Present</span>
                  <span style={{ color: '#bdbdbd', fontSize: '0.92rem', fontStyle: 'italic' }}>Istanbul, Turkey</span>
                </div>
                <ul style={{ marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Worked in applications developed with Java, Node.js, React, Golang.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Spent 1 year on the Dragon AI-powered service project, mastering and applying Java, Python, Go, React, JSP, and Node.js to build an in-house solution from scratch.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Served 4 years as a senior developer on TEB Retail Internet Banking, refining and delivering sprint tasks on schedule using Java, Struts, JSP, and JavaScript.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Managed version control across ClearCase, ClearQuest, Git, and TFS; led the migration to Git and implemented Azure-based code review workflows and CI/CD pipelines for production deployments.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Wrote and optimized PL/SQL routines in Oracle to ensure reliable, high-performance database APIs.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Designed and rolled out a unit testing framework: researched best practices, integrated SonarQube/SonarLint for code coverage and quality metrics aligned with SDLC standards.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Configured and supported AI coding assistants (GitHub Copilot, Claude, GPT) in IntelliJ IDEA and VSCode, accelerating issue diagnosis and development efficiency.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Coordinated with cross-functional core teams to ensure smooth integration and delivery of features across the platform.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Applied SOLID principles and clean code practices across all projects, ensuring maintainable, testable, and scalable backend systems aligned with enterprise-grade architecture standards.</li>
                </ul>
              </div>
            </div>
            
            {/* Fullstack Developer, Vadi Kurumsal Bilgi Sistemleri */}
            <div className="resume-timeline-item">
              <div className="resume-timeline-dot"></div>
              <div className="resume-timeline-content">
                <div>Fullstack Developer</div>
                <div>Vadi Kurumsal Bilgi Sistemleri</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="resume-badge">Nov, 2018 – Nov, 2019</span>
                  <span style={{ color: '#bdbdbd', fontSize: '0.92rem', fontStyle: 'italic' }}>Istanbul, Turkey</span>
                </div>
                <ul style={{ marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Architected and implemented a microservices-based backend using Java 8, Spring MVC, Spring Boot, Spring Cloud, Hibernate, MySQL, and Oracle to deliver modular, high-performance services.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Built responsive Single-Page Application components with React, creating dynamic, user-friendly interfaces across desktop and mobile browsers.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Specialized in React Native to implement mobile-first features, integrating native modules and optimizing app performance on iOS and Android.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Leveraged Spring Cloud for service discovery, centralized configuration, and fault tolerance within the microservices ecosystem.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Invested in continuous learning—completed courses on modern Java and front-end frameworks—to adopt best practices and emerging technologies.</li>
                </ul>
              </div>
            </div>

            {/* Backend Developer Intern */}
            <div className="resume-timeline-item">
              <div className="resume-timeline-dot"></div>
              <div className="resume-timeline-content">
                <div>Backend Developer Intern</div>
                <div>Etiya</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span className="resume-badge">Jun, 2017 – Aug, 2017</span>
                  <span style={{ color: '#bdbdbd', fontSize: '0.92rem', fontStyle: 'italic' }}>Istanbul, Turkey</span>
                </div>
                <ul style={{ marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Assisted in developing and maintaining Java applications, ensuring seamless functionality and user-friendly interfaces.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Supported the implementation of visually appealing UI designs that aligned with client requirements and design principles.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Collaborated with cross-functional teams, including back-end developers and designers, to deliver efficient, high-quality, and scalable solutions.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Gained hands-on experience in debugging, troubleshooting, and refining app features to improve user experience.</li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}><span className="resume-bullet"></span>Built SOAP APIs while learning API standards and clean code architecture for maintainable backend development.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

  {/* Education Section */}
  <div style={{ marginBottom: '2.8rem', position: 'relative' }}>
          {/* Timeline line */}
          <div className="resume-timeline-line1"></div>
          
          {/* Education Title Row */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', position: 'relative' }}>
            <span className="resume-section-icon"><BookOpen size={24} /></span>
            <h2 className="resume-section-title">Education</h2>
          </div>

          <div className="resume-timeline">
            <div className="resume-timeline-item">
              <div className="resume-timeline-dot"></div>
              <div className="resume-timeline-content">
                <div>Duzce University</div>
                <div>Bachelor of Computer Engineering</div>
                <span className="resume-badge">2014 – 2018</span>
              </div>
            </div>
            <div className="resume-timeline-item">
              <div className="resume-timeline-dot secondary"></div>
              <div className="resume-timeline-content">
                <div>Nesrin Ucaklioglu Anatolian High School</div>
                <div>High School</div>
                <span className="resume-badge">2010 – 2014</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Download CV Button */}
        <div className="w-full flex justify-center mt-8">
          <a href="/muratcan-gokyokus-CV.pdf" download className="resume-download-btn">
            Download CV
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
