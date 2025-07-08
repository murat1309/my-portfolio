import Image from "next/image";
import MainLayout from "@/components/layouts/MainLayout";
import { Card } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "Flutter vs. Flock: Cross-Platform Evaluation",
    date: "Nov 18, 2024",
    summary: "Explore the differences between Flutter and Flock, a new fork focused on faster development and community-driven cross-platform app creation",
    link: "https://aakash58.hashnode.dev/flutter-vs-flock-exploring-the-new-fork-in-cross-platform-development",
    image: "https://placehold.co/800x400/232730/e1a27a?text=Flutter+vs+Flock"
  },
  {
    id: 2,
    title: "Flutter's Impact on Future Cross-Platform Apps",
    date: "Nov 13, 2024",
    summary: "Explore Flutter's growing influence on cross-platform app development in 2024 and its future potential across mobile, web, and IoT devices",
    link: "https://aakash58.hashnode.dev/the-future-of-cross-platform-apps-flutters-role-in-2024-and-beyond",
    image: "https://placehold.co/800x400/232730/e1a27a?text=Flutter+Impact"
  }
];

export default function BlogPage() {
  return (
    <MainLayout>
      <section>
        <h2 className="section-title">Blog</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="overflow-hidden h-full transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-primary text-sm font-medium">Blog</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {post.summary}
                  </p>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
