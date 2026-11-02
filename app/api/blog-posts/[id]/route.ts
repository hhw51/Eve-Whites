import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const jsonDirectory = path.join(process.cwd(), "public/data")
    const fileContents = await fs.readFile(path.join(jsonDirectory, "blog-posts.json"), "utf8")
    const posts = JSON.parse(fileContents)
    const post = posts.find((p: { id: string }) => p.id === id)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error reading blog post:", error)
    return NextResponse.json({ error: "Error loading blog post" }, { status: 500 })
  }
}
