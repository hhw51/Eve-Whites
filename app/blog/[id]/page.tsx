"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Share2 } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  content: string
  image: string
  date: string
  category: string
  readTime: string
  author: string
}

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        const response = await fetch("/api/blog-posts")
        if (response.ok) {
          const data: BlogPost[] = await response.json()
          const foundPost = data.find((p) => p.id === id)
          setBlogPost(foundPost || null)
        }
      } catch (error) {
        console.error("Error loading blog post:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogPost()
  }, [id])

  if (loading) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!blogPost) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light tracking-wide mb-4">Post Not Found</h1>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Journal
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-4">
            <span className="text-xs text-gray-500 uppercase tracking-wide">{blogPost.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6">{blogPost.title}</h1>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-8">
            <div className="flex items-center">
              <span>By {blogPost.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(blogPost.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{blogPost.readTime}</span>
            </div>
            <button className="flex items-center space-x-2 hover:text-black transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 mb-12 overflow-hidden rounded-lg">
          <Image
            src={blogPost.image || "/placeholder.svg"}
            alt={blogPost.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
          style={{
            lineHeight: "1.8",
            color: "#374151",
          }}
        />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Written by</p>
              <p className="font-medium">{blogPost.author}</p>
            </div>
            <button className="btn-secondary">Follow for More</button>
          </div>
        </footer>
      </article>

      {/* Related Posts */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light tracking-wide mb-8 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for related posts */}
            {[1, 2, 3].map((i) => (
              <Link key={i} href={`/blog/${i + 1}`} className="group">
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={`/placeholder.svg?height=300&width=400`}
                    alt={`Related post ${i}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-medium mb-2 group-hover:text-gray-600 transition-colors">
                  Related Article Title {i}
                </h3>
                <p className="text-gray-600 text-sm">Brief excerpt of the related article content...</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
