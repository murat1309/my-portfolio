"use client";

import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";

export default function HomePage() {
  // Refs for scrolling functionality
  const skillsListRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  // Animation ref for main container
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
    // Get all skill cards for staggered animations
    const skillCards = document.querySelectorAll('.skill-card');
    const doingCards = document.querySelectorAll('.doing-card');
    const homepageSections = document.querySelectorAll('.homepage-section');
    const paragraphs = document.querySelectorAll('.main-content p');
    
    // Set index as CSS variable for staggered animations
    skillCards.forEach((card, index) => {
      (card as HTMLElement).style.setProperty('--skill-index', index.toString());
    });
    
    doingCards.forEach((card, index) => {
      (card as HTMLElement).style.setProperty('--doing-index', index.toString());
    });
    
    homepageSections.forEach((section, index) => {
      (section as HTMLElement).style.setProperty('--section-index', index.toString());
    });
    
    paragraphs.forEach((p, index) => {
      (p as HTMLElement).style.setProperty('--paragraph-index', index.toString());
    });
  }, []);

  // Function to handle scroll
  const handleScroll = () => {
    if (skillsListRef.current && thumbRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = skillsListRef.current;
      const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
      
      // Calculate maximum translation based on track width and thumb width
      const trackWidth = 180; // Match the width in CSS
      const thumbWidth = 40; // Match the width in CSS
      const maxTranslation = trackWidth - thumbWidth;
      
      // Apply translation to the thumb
      thumbRef.current.style.transform = `translateX(${scrollPercentage * maxTranslation}px)`;
      
      // Show/hide navigation buttons based on scroll position
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll to the left or right
  const scrollSkills = (direction: 'left' | 'right') => {
    if (skillsListRef.current) {
      const { clientWidth } = skillsListRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      skillsListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Function to handle mouse down on the thumb
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    if (skillsListRef.current) {
      setStartScrollLeft(skillsListRef.current.scrollLeft);
    }
    
    // Add cursor styling to the body to indicate dragging
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };
  
  // Function to handle mouse move when dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !skillsListRef.current || !thumbRef.current || !trackRef.current) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    const thumbWidth = 40; // Match the width in CSS
    const trackWidth = trackRect.width;
    
    // Calculate how far the mouse has moved
    const deltaX = e.clientX - startX;
    
    // Convert this to a scroll percentage
    const { scrollWidth, clientWidth } = skillsListRef.current;
    const scrollableWidth = scrollWidth - clientWidth;
    
    // Calculate the maximum drag distance in the track
    const maxDragDistance = trackWidth - thumbWidth;
    
    // Calculate what proportion of the max drag distance we've moved
    const dragPercentage = deltaX / maxDragDistance;
    
    // Calculate new scroll position
    const newScrollLeft = startScrollLeft + (dragPercentage * scrollableWidth);
    
    // Apply the scroll
    skillsListRef.current.scrollLeft = newScrollLeft;
  }, [isDragging, startX, startScrollLeft, skillsListRef, thumbRef, trackRef]);
  
  // Function to handle mouse up and end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };
  
  // Track click handler to jump to a position
  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current || !skillsListRef.current || e.target !== trackRef.current) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    const thumbWidth = 40; // Match the width in CSS
    const trackWidth = trackRect.width;
    
    // Calculate click position relative to the track
    const clickPosition = e.clientX - trackRect.left;
    
    // Calculate click percentage (adjusted for thumb width)
    const effectiveTrackWidth = trackWidth - thumbWidth;
    const clickPercentage = Math.max(0, Math.min(1, (clickPosition - thumbWidth/2) / effectiveTrackWidth));
    
    // Calculate and set new scroll position
    const { scrollWidth, clientWidth } = skillsListRef.current;
    const scrollableWidth = scrollWidth - clientWidth;
    const newScrollLeft = clickPercentage * scrollableWidth;
    
    skillsListRef.current.scrollLeft = newScrollLeft;
  };

  // Initialize scroll state on mount and set up event listeners
  useEffect(() => {
    const skillsList = skillsListRef.current;
    if (skillsList) {
      handleScroll(); // Initial check
      skillsList.addEventListener('scroll', handleScroll);
      
      // Add document-level event listeners for mouse movements
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        skillsList.removeEventListener('scroll', handleScroll);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startX, startScrollLeft, handleMouseMove]); // Dependencies for the drag operation

  return (
    <MainLayout>
      {/* About Me Section */}
      <div className="main-card" ref={mainRef}>
      <section className="mb-8 homepage-section">
        <h2 className="section-title">About Me</h2>
        <div className="main-content mb-8">
          <p>
            A skilled and dedicated Backend Developer with solid experience in Java, TypeScript, JavaScript and Node.js. I focus on creating efficient and scalable backend systems, with an emphasis on seamless API integrations, performance optimization, and high-quality application delivery. I have a strong foundation in building reliable solutions that meet diverse project requirements.
          </p>
          <p>
            Additionally, I have hands-on experience with Docker, AWS Cloud, and Terraform, which I use to deploy and manage applications in cloud environments. These tools help me automate infrastructure tasks and manage cloud resources effectively, contributing to the stability and scalability of the systems I develop.
          </p>
          <p>
            I am always eager to learn and adapt to new technologies and industry practices, while placing a high value on teamwork and effective communication. I believe that strong collaboration plays a key role in achieving successful outcomes, and I strive to work closely with my colleagues to deliver practical and reliable backend solutions.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section homepage-section">
        <h3 className="section-title">Skills</h3>
        <div className="skills-container">
          {/* Skills List with horizontal scrolling */}

          {/* Java */}
          <div className="skills-list" ref={skillsListRef}>
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/java/java-icon.svg"
                alt="Java"
                width={64}
                height={64}
              />
              <span className="skill-name">Java</span>
            </div>

            {/* JavaScript */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg"
                alt="JavaScript"
                width={64}
                height={64}
              />
              <span className="skill-name">JavaScript</span>
            </div>

            {/* TypeScript */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg"
                alt="TypeScript"
                width={64}
                height={64}
              />
              <span className="skill-name">TypeScript</span>
            </div>

            {/* NestJS */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/nestjs/nestjs-icon.svg"
                alt="NestJS"
                width={64}
                height={64}
              />
              <span className="skill-name">NestJS</span>
            </div>

            {/* Node.js */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg"
                alt="Node.js"
                width={64}
                height={64}
              />
              <span className="skill-name">Node.js</span>
            </div>

             {/* React */}
             <div className="skill-card">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
                alt="React"
                width={64}
                height={64}
              />
              <span className="skill-name">React & Native</span>
            </div>


             {/* Python */}
             <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/python/python-icon.svg"
                alt="Python"
                width={64}
                height={64}
              />
              <span className="skill-name">Python</span>
            </div>

            {/* Golang */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/golang/golang-icon.svg"
                alt="Golang"
                width={64}
                height={64}
              />
              <span className="skill-name">Golang</span>
            </div>

            {/* Spring */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg"
                alt="Spring"
                width={64}
                height={64}
              />
              <span className="skill-name">Spring</span>
            </div>

            {/* Hibernate */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/hibernate/hibernate-icon.svg"
                alt="Hibernate"
                width={64}
                height={64}
              />
              <span className="skill-name">Hibernate</span>
            </div>
  
              {/* Next.js */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg"
                alt="Next.js"
                width={64}
                height={64}
              />
              <span className="skill-name">Next.js</span>
            </div>

            {/* JSP */}
            <div className="skill-card">
              <Image
                src="https://images.icon-icons.com/2107/PNG/512/file_type_jsp_icon_130498.png"
                alt="JSP"
                width={64}
                height={64}
              />
              <span className="skill-name">JSP</span>
            </div>

            {/* HTML */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg"
                alt="HTML"
                width={64}
                height={64}
              />
              <span className="skill-name">HTML</span>
            </div>

            {/* CSS */}
            <div className="skill-card">
              <Image
                src="https://w7.pngwing.com/pngs/224/77/png-transparent-website-web-internet-css-style-css3-technology-social-media-logos-i-flat-colorful-icon.png"
                alt="CSS"
                width={64}
                height={64}
              />
              <span className="skill-name">CSS</span>
            </div>



          {/* CLOUD */}




            {/* AWS */}
           <div className="skill-card">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/aws-2.svg"
                alt="AWS"
                width={64}
                height={64}
              />
              <span className="skill-name">AWS</span>
            </div>

            {/* Azure */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg"
                alt="Azure"
                width={64}
                height={64}
              />
              <span className="skill-name">Azure</span>
            </div>

            {/* Docker */}
            <div className="skill-card">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/docker.svg"
                alt="Docker"
                width={64}
                height={64}
              />
              <span className="skill-name">Docker</span>
            </div>

            {/* Terraform */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/terraformio/terraformio-icon.svg"
                alt="Terraform"
                width={64}
                height={64}
              />
              <span className="skill-name">Terraform</span>
            </div>

            {/* Swagger/OpenAPI */}
            <div className="skill-card">
              <Image
                src="https://raw.githubusercontent.com/vscode-icons/vscode-icons/628385aa1269526d2d51333aec0c1c5ef7220ab7/icons/file_type_swagger.svg"
                alt="Swagger/OpenAPI"
                width={64}
                height={64}
              />
              <span className="skill-name">Swagger/OpenAPI</span>
            </div>




            {/* DATABASE */}


            {/* Oracle SQL */}
            <div className="skill-card">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Oracle_Logo.svg"
                alt="Oracle SQL"
                width={64}
                height={64}
              />
              <span className="skill-name">Oracle SQL</span>
            </div>

            {/* PostgreSQL */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg"
                alt="PostgreSQL"
                width={64}
                height={64}
              />
              <span className="skill-name">PostgreSQL</span>
            </div>

            
            {/* MongoDB */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg"
                alt="MongoDB"
                width={64}
                height={64}
              />
              <span className="skill-name">MongoDB</span>
            </div>
    
            {/* MySQL */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg"
                alt="MySQL"
                width={64}
                height={64}
              />
              <span className="skill-name">MySQL</span>
            </div>

          
            {/* Redis */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/redis/redis-icon.svg"
                alt="Redis"
                width={64}
                height={64}
              />
              <span className="skill-name">Redis</span>
            </div>




          {/* Version Control */} 

          

            {/* Git */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg"
                alt="Git"
                width={64}
                height={64}
              />
              <span className="skill-name">Git</span>
            </div>

      
            {/* Jira */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/atlassian_jira/atlassian_jira-icon.svg"
                alt="Jira"
                width={64}
                height={64}
              />
              <span className="skill-name">Jira</span>
            </div>

            {/* TFS */}
            <div className="skill-card">
              <Image
                src="https://raw.githubusercontent.com/gilbarbara/logos/92bb74e98bca1ea1ad794442676ebc4e75038adc/logos/visual-studio.svg"
                alt="TFS"
                width={64}
                height={64}
              />
              <span className="skill-name">TFS</span>
            </div>
    


          {/* IDE */}



            {/* VS Code */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg"
                alt="VS Code"
                width={64}
                height={64}
              />
              <span className="skill-name">VS Code</span>
            </div>

      
            {/* WebStorm */}
            <div className="skill-card">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/WebStorm_Icon.svg/2048px-WebStorm_Icon.svg.png"
                alt="WebStorm"
                width={64}
                height={64}
              />
              <span className="skill-name">WebStorm</span>
            </div>

            {/* IntelliJ IDEA */}
            <div className="skill-card">
              <Image
                src="https://raw.githubusercontent.com/gilbarbara/logos/92bb74e98bca1ea1ad794442676ebc4e75038adc/logos/intellij-idea.svg"
                alt="IntelliJ IDEA"
                width={64}
                height={64}
              />
              <span className="skill-name">IntelliJ IDEA</span>
            </div>

            {/* Postman */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"
                alt="Postman"
                width={64}
                height={64}
              />
              <span className="skill-name">Postman</span>
            </div>


          {/* Extra */}


           {/* Apache Maven */}
           <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/apache_maven/apache_maven-icon.svg"
                alt="Apache Maven"
                width={64}
                height={64}
              />
              <span className="skill-name">Apache Maven</span>
            </div>

            {/* Django */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/djangoproject/djangoproject-icon.svg"
                alt="Django"
                width={64}
                height={64}
              />
              <span className="skill-name">Django</span>
            </div>



            {/* Mockito */}
            <div className="skill-card">
              <Image
                src="https://junit.org/assets/img/junit5-logo.png"
                alt="Mockito"
                width={64}
                height={64}
              />
              <span className="skill-name">Mockito</span>
            </div>

            {/* SonarQube */}
            <div className="skill-card">
              <Image
                src="https://images.seeklogo.com/logo-png/43/1/sonar-source-logo-png_seeklogo-438217.png"
                alt="SonarQube"
                width={64}
                height={64}
              />
              <span className="skill-name">SonarQube</span>
            </div>

            {/* JSON */}
            <div className="skill-card">
              <Image
                src="https://www.vectorlogo.zone/logos/json/json-icon.svg"
                alt="JSON"
                width={64}
                height={64}
              />
              <span className="skill-name">JSON</span>
            </div>

            {/* XML */}
            <div className="skill-card">
              <Image
                src="https://www.svgrepo.com/show/31053/xml.svg"
                alt="XML"
                width={64}
                height={64}
              />
              <span className="skill-name">XML</span>
            </div>


          </div>

          {/* Custom Scrollbar */}
          <div 
            className="skills-scrollbar-track" 
            ref={trackRef}
            onClick={handleTrackClick}
          >
            <div 
              className="skills-scrollbar-thumb" 
              ref={thumbRef}
              onMouseDown={handleThumbMouseDown}
            ></div>
          </div>

          {/* Navigation Buttons */}
          <div className="skills-nav-buttons">
            <button 
              className="skills-nav-button" 
              onClick={() => scrollSkills('left')}
              style={{ opacity: showLeftButton ? 1 : 0.5 }}
              disabled={!showLeftButton}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="skills-nav-button" 
              onClick={() => scrollSkills('right')}
              style={{ opacity: showRightButton ? 1 : 0.5 }}
              disabled={!showRightButton}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* What I'm Doing Section */}
      <section className="mb-8 homepage-section">
        <h3 className="section-title">What I'm Doing</h3>
        <div className="doing-grid">
          {/* Backend Development */}
          <div className="doing-card">
            <Image
              src="https://web-assets.same.dev/1489531667/4146975529.svg+xml"
              alt="Backend Development Icon"
              width={44}
              height={44}
              className="doing-icon"
            />
            <div>
              <div className="doing-title">Backend Development</div>
              <div className="doing-desc">
                Building robust, scalable, and secure backend systems using Java, Node.js, and modern frameworks. Focused on API design, microservices, and high-performance architectures for enterprise and cloud-native applications.
              </div>
            </div>
          </div>
          {/* Web Development */}
          <div className="doing-card">
            <Image
              src="https://web-assets.same.dev/2888399260/3929846380.svg+xml"
              alt="Web Development Icon"
              width={44}
              height={44}
              className="doing-icon"
            />
            <div>
              <div className="doing-title">Web Development</div>
              <div className="doing-desc">
                Developing modern, responsive web applications with React, TypeScript, and best practices. Delivering seamless user experiences and integrating complex backend services.
              </div>
            </div>
          </div>
          {/* DevOps & Cloud Engineering */}
          <div className="doing-card">
            <Image
              src="https://web-assets.same.dev/1746662513/2182041708.svg+xml"
              alt="DevOps & Cloud Icon"
              width={44}
              height={44}
              className="doing-icon"
            />
            <div>
              <div className="doing-title">DevOps & Cloud Engineering</div>
              <div className="doing-desc">
                Automating infrastructure and deployments using Docker, AWS, and Terraform. Implementing CI/CD pipelines, infrastructure as code, and cloud resource management for reliable and scalable systems.
              </div>
            </div>
          </div>
          {/* Database Engineering */}
          <div className="doing-card">
            <Image
              src="https://web-assets.same.dev/3684638020/1207353946.svg+xml"
              alt="Database Engineering Icon"
              width={44}
              height={44}
              className="doing-icon"
            />
            <div>
              <div className="doing-title">Database Engineering</div>
              <div className="doing-desc">
                Designing, optimizing, and managing databases with PostgreSQL, MongoDB, Oracle, and MySQL. Ensuring data integrity, high availability, and performance for mission-critical applications.
              </div>
            </div>
          </div>
        </div>
      </section>

    
      </div>
    </MainLayout>
  );
}
