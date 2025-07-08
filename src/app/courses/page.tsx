"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { ExternalLink, Award, BookOpen, TrendingUp, Code, Cloud, Briefcase, Monitor, Globe, FileText } from 'lucide-react';
import udemyCourses from "../../udemys.json";

interface Course {
  title: string;
  description: string;
  category: string;
  subcategories: string[];
  url: string;
}

export default function ExperiencePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Group courses by category
  const groupedCourses = udemyCourses.reduce((acc: Record<string, Course[]>, course: Course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {});

  // Learning platforms data
  const learningPlatforms = [
    {
      name: "FreeCodeCamp",
      description: "Comprehensive web development curriculum focusing on HTML, CSS, JavaScript, and modern frameworks. Completed multiple certifications including Responsive Web Design and JavaScript Algorithms.",
      url: "https://www.freecodecamp.org/",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      icon: <Code className="w-6 h-6" />,
      color: "from-green-500/20 to-emerald-500/20 border-green-500/30"
    },
    {
      name: "JavaScript.info",
      description: "Deep dive into modern JavaScript concepts from basics to advanced topics. Mastered ES6+, async/await, promises, and advanced DOM manipulation techniques.",
      url: "https://javascript.info/",
      technologies: ["JavaScript", "ES6+", "DOM", "Async Programming"],
      icon: <FileText className="w-6 h-6" />,
      color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30"
    },
    {
      name: "MDN Web Docs",
      description: "Mozilla Developer Network - The ultimate reference for web technologies. Used extensively for HTML semantics, CSS properties, and JavaScript APIs documentation.",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      technologies: ["HTML", "CSS", "JavaScript", "Web APIs"],
      icon: <Globe className="w-6 h-6" />,
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
    }
  ];

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Development':
        return <Code className="w-6 h-6" />;
      case 'IT & Software':
        return <Cloud className="w-6 h-6" />;
      case 'Office Productivity':
        return <Briefcase className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Development':
        return 'from-blue-500/20 to-purple-500/20 border-blue-500/30';
      case 'IT & Software':
        return 'from-green-500/20 to-teal-500/20 border-green-500/30';
      case 'Office Productivity':
        return 'from-orange-500/20 to-red-500/20 border-orange-500/30';
      default:
        return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  return (
    <MainLayout>
      <div className={`experience-page-container ${isLoaded ? 'animate-in' : ''}`}>
        {/* Page Header */}
        <div className="experience-header" style={{ '--section-index': 0 } as React.CSSProperties}>
          <h2 className="section-title">Learning Journey</h2>
          <div className="experience-stats">
            <div className="stat-card" style={{ '--stat-index': 0 } as React.CSSProperties}>
              <Award className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">30+</span>
                <span className="stat-label">Courses Completed</span>
              </div>
            </div>
            <div className="stat-card" style={{ '--stat-index': 1 } as React.CSSProperties}>
              <TrendingUp className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">{Object.keys(groupedCourses).length + 2} </span>
                <span className="stat-label">Categories Mastered</span>
              </div>
            </div>
            <div className="stat-card" style={{ '--stat-index': 2 } as React.CSSProperties}>
              <BookOpen className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">500+</span>
                <span className="stat-label">Hours of Learning</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Categories */}
        <div className="experience-content">
          {Object.entries(groupedCourses).map(([category, courses], categoryIndex) => (
            <div 
              key={category} 
              className="category-section"
              style={{ '--category-index': categoryIndex } as React.CSSProperties}
            >
              <div className="category-header">
                <div className="category-icon">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="category-title">{category}</h3>
                <span className="course-count">{courses.length} courses</span>
              </div>

              <div className="courses-grid">
                {courses.map((course: Course, courseIndex) => (
                  <div
                    key={course.title}
                    className={`course-card ${getCategoryColor(category)}`}
                    style={{ '--course-index': courseIndex } as React.CSSProperties}
                    onClick={() => window.open(course.url, '_blank')}
                  >
                    <div className="course-card-header">
                      <h4 className="course-title">{course.title}</h4>
                      <ExternalLink className="course-external-icon" />
                    </div>
                    
                    <p className="course-description">{course.description}</p>
                    
                    <div className="course-tags">
                      {course.subcategories.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="course-tag">
                          {tag}
                        </span>
                      ))}
                      {course.subcategories.length > 2 && (
                        <span className="course-tag-more">
                          +{course.subcategories.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="course-card-footer">
                      <span className="course-platform">Udemy</span>
                      <div className="course-status">
                        <Award className="w-4 h-4" />
                        <span>Certified</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Learning Platforms Section */}
          <div 
            className="category-section"
            style={{ '--category-index': Object.keys(groupedCourses).length } as React.CSSProperties}
          >
            <div className="category-header">
              <div className="category-icon">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="category-title">Learning Platforms</h3>
              <span className="course-count">{learningPlatforms.length} platforms</span>
            </div>

            <div className="courses-grid">
              {learningPlatforms.map((platform, platformIndex) => (
                <div
                  key={platform.name}
                  className={`course-card platform-card ${platform.color}`}
                  style={{ '--course-index': platformIndex } as React.CSSProperties}
                  onClick={() => window.open(platform.url, '_blank')}
                >
                  <div className="course-card-header">
                    <h4 className="course-title">{platform.name}</h4>
                    <ExternalLink className="course-external-icon" />
                  </div>
                  
                  <p className="course-description">{platform.description}</p>
                  
                  <div className="course-tags">
                    {platform.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="course-tag">
                        {tech}
                      </span>
                    ))}
                    {platform.technologies.length > 3 && (
                      <span className="course-tag-more">
                        +{platform.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="course-card-footer">
                    <span className="course-platform">Web Platform</span>
                    <div className="course-status">
                      <Monitor className="w-4 h-4" />
                      <span>Frontend Focus</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 