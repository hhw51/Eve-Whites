import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), "public/data")
    const fileContents = await fs.readFile(jsonDirectory + "/products.json", "utf8")
    const products = JSON.parse(fileContents)

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error reading products:", error)
    return NextResponse.json({ error: "Error loading products" }, { status: 500 })
  }
}
