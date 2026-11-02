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
    const fileContents = await fs.readFile(path.join(jsonDirectory, "products.json"), "utf8")
    const products = JSON.parse(fileContents)
    const product = products.find((p: { id: string }) => p.id === id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error reading product:", error)
    return NextResponse.json({ error: "Error loading product" }, { status: 500 })
  }
}
