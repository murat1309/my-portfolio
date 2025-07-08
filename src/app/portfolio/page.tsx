"use client";

import { useState } from "react";
import Image from "next/image";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock project data for demonstration
const projectData = [
  {
    id: 1,
    title: "Nagarik App",
    category: "Application",
    image: "https://placehold.co/600x400/232730/e1a27a?text=Nagarik+App",
    link: "https://nagarikapp.gov.np/",
  },
  {
    id: 2,
    title: "Ambition Guru",
    category: "Application",
    image: "https://placehold.co/600x400/232730/e1a27a?text=Ambition+Guru",
    link: "https://www.ambition.guru/",
  },
  {
    id: 3,
    title: "Sociair",
    category: "Application",
    image: "https://placehold.co/600x400/232730/e1a27a?text=Sociair",
    link: "https://play.google.com/store/apps/details?id=com.onewinme.sociair",
  },
  {
    id: 4,
    title: "Tokma",
    category: "Application",
    image: "https://placehold.co/600x400/232730/e1a27a?text=Tokma",
    link: "https://tokma.ai/",
  },
  {
    id: 5,
    title: "GitHub users search App",
    category: "Web development",
    image: "https://placehold.co/600x400/232730/e1a27a?text=GitHub+Users",
    link: "https://github-user-ruby-kappa.vercel.app/",
  },
  {
    id: 6,
    title: "Car Zone",
    category: "Web development",
    image: "https://placehold.co/600x400/232730/e1a27a?text=Car+Zone",
    link: "https://carzone-seven.vercel.app/",
  },
  {
    id: 7,
    title: "Movfix",
    category: "Web development",
    image: "https://placehold.co/600x400/232730/e1a27a?text=Movfix",
    link: "https://movfix-bay.vercel.app/",
  },
  {
    id: 8,
    title: "Houseman",
    category: "UI/UX",
    image: "https://placehold.co/600x400/232730/e1a27a?text=Houseman",
    link: "#",
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = selectedCategory === "all"
    ? projectData
    : projectData.filter(project => project.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <MainLayout>
      <section>
        <h2 className="section-title">Portfolio</h2>

        {/* Portfolio Filter */}
        <div className="mb-10">
          <Tabs
            defaultValue="all"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList className="bg-[#232730] p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="application"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Applications
              </TabsTrigger>
              <TabsTrigger
                value="web development"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Web development
              </TabsTrigger>
              <TabsTrigger
                value="ui/ux"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                UI/UX
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-[#232730] rounded-lg overflow-hidden transition-transform hover:scale-105">
                <div className="relative h-52">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {project.category}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
