import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), "public/data")
    const fileContents = await fs.readFile(jsonDirectory + "/blog-posts.json", "utf8")
    const posts = JSON.parse(fileContents)

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return NextResponse.json({ error: "Error loading blog posts" }, { status: 500 })
  }
}
