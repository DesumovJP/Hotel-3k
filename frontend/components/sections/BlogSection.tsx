"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/motion";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  heroImage: string;
  category: string;
  tags?: string[];
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: number;
  isFeatured?: boolean;
}

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  posts: BlogPost[];
  variant?: "grid" | "featured" | "list";
  showCategories?: boolean;
  className?: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function BlogCard({ post, variant = "default" }: { post: BlogPost; variant?: "default" | "featured" | "compact" }) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <motion.article
      variants={fadeInUp}
      className={cn(
        "group bg-neutral rounded-xl overflow-hidden shadow-elevation-1 hover:shadow-elevation-3 transition-shadow",
        isFeatured && "lg:grid lg:grid-cols-2"
      )}
    >
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <motion.div
          className={cn("aspect-[16/10] overflow-hidden", isFeatured && "lg:aspect-auto lg:h-full")}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      </Link>

      {/* Content */}
      <div className={cn("p-6", isFeatured && "lg:p-8 lg:flex lg:flex-col lg:justify-center")}>
        {/* Category & Meta */}
        <div className="flex items-center gap-4 mb-3">
          <span className="text-xs font-medium text-gold uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-ink-400 text-xs flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime} min read
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3
            className={cn(
              "font-display text-ink group-hover:text-gold transition-colors mb-3",
              isFeatured ? "text-display-sm" : "text-lg"
            )}
          >
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {!isCompact && (
          <p className={cn("text-ink-600 text-body-sm mb-4", isFeatured ? "line-clamp-3" : "line-clamp-2")}>
            {post.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          {/* Author */}
          <div className="flex items-center gap-3">
            {post.author.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-ink text-sm font-medium">{post.author.name}</p>
              <p className="text-ink-500 text-xs">{formatDate(post.publishedAt)}</p>
            </div>
          </div>

          {/* Read more */}
          <Link
            href={`/blog/${post.slug}`}
            className="text-gold hover:text-gold-600 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            Read
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function BlogSection({
  title = "From the Journal",
  subtitle,
  posts,
  variant = "grid",
  showCategories = false,
  className,
}: BlogSectionProps) {
  const categories = [...new Set(posts.map((p) => p.category))];
  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];
  const regularPosts = posts.filter((p) => p.id !== featuredPost?.id);

  return (
    <section className={cn("py-section-lg bg-sand-100", className)}>
      <div className="px-gutter max-w-content-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.header variants={fadeInUp} className="text-center mb-12">
            <h2 className="font-display text-display-lg text-ink mb-4">{title}</h2>
            {subtitle && (
              <p className="text-ink-600 text-body-lg max-w-2xl mx-auto">{subtitle}</p>
            )}
          </motion.header>

          {/* Categories (optional) */}
          {showCategories && categories.length > 0 && (
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/category/${category.toLowerCase()}`}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-neutral rounded-full text-body-sm text-ink-700 hover:bg-sand-300 transition-colors min-h-[44px]"
                >
                  <Tag className="w-3 h-3" />
                  {category}
                </Link>
              ))}
            </motion.div>
          )}

          {/* Posts */}
          {variant === "featured" && featuredPost ? (
            <>
              {/* Featured post */}
              <motion.div variants={fadeInUp} className="mb-12">
                <BlogCard post={featuredPost} variant="featured" />
              </motion.div>

              {/* Regular posts grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.slice(0, 3).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* View all link */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-600 font-medium transition-colors"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Default blog posts
export const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Discover the Hidden Beaches of Texel",
    slug: "hidden-beaches-texel",
    excerpt: "Beyond the popular shores lie secret coves and pristine stretches of sand. Our guide reveals the island's best-kept beach secrets.",
    heroImage: "/images/blog/beaches.jpg",
    category: "Destination",
    tags: ["beach", "nature", "insider-tips"],
    author: { name: "Anna de Vries", role: "Guest Experience" },
    publishedAt: "2025-11-15",
    readTime: 6,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Farm to Table: Our Culinary Philosophy",
    slug: "farm-to-table-philosophy",
    excerpt: "Meet the local farmers and fishermen who supply our kitchen. Discover how we create dishes that tell the story of Texel.",
    heroImage: "/images/blog/culinary.jpg",
    category: "Culinary",
    author: { name: "Chef Willem Brouwer" },
    publishedAt: "2025-10-28",
    readTime: 8,
  },
  {
    id: 3,
    title: "The Art of Doing Nothing",
    slug: "art-of-doing-nothing",
    excerpt: "In our always-on world, true rest is revolutionary. Learn to embrace the Dutch concept of 'niksen' during your stay.",
    heroImage: "/images/blog/wellness.jpg",
    category: "Wellness",
    author: { name: "Dr. Marlene Jansen" },
    publishedAt: "2025-09-20",
    readTime: 5,
  },
];
