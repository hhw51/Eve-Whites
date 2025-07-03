"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  readTime: string
  author: string
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blog-posts")
        if (response.ok) {
          const data = await response.json()
          setBlogPosts(data)
        }
      } catch (error) {
        console.error("Error loading blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))]

  const filteredPosts =
    selectedCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  if (loading) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest mb-4">JOURNAL</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Insights on style, sustainability, and the stories behind our collections.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-16">
            <Link href={`/blog/${filteredPosts[0].id}`} className="group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative h-80 lg:h-96 overflow-hidden rounded-lg">
                  <Image
                    src={filteredPosts[0].image || "/placeholder.svg"}
                    alt={filteredPosts[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{filteredPosts[0].category}</span>
                  <h2 className="text-2xl md:text-3xl font-light tracking-wide mt-2 mb-4 group-hover:text-gray-600 transition-colors">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{new Date(filteredPosts[0].date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{filteredPosts[0].readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group">
              <article>
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{post.category}</span>
                  <h3 className="font-medium mt-2 mb-2 group-hover:text-gray-600 transition-colors">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
