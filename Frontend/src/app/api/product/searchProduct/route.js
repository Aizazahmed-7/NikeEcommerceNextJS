import { NextResponse } from "next/server";
import Product from "@/models/product";
import { connectToDatabase, disconnectFromDatabase } from "@/utils/database";

export async function GET(request) {
  const searchParams = new URL(request.url);

  const category = searchParams.searchParams.get("category");
  const keyword = searchParams.searchParams.get("keyword");
  const minPrice = searchParams.searchParams.get("minPrice");
  const maxPrice = searchParams.searchParams.get("maxPrice");

  const searchQuery = {};

  if (category && category !== "null" && category !== "undefined") {
    searchQuery.category = category;
  }

  if (keyword) {
    searchQuery.name = { $regex: keyword, $options: "i" };
  }

  if (minPrice && maxPrice) {
    searchQuery.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice) {
    searchQuery.price = { $gte: minPrice };
  } else if (maxPrice) {
    searchQuery.price = { $lte: maxPrice };
  }

  try {
    await connectToDatabase();
    const products = await Product.find(searchQuery).populate("category");
    if (!products) {
      NextResponse.status(404);
      throw new Error("Products Not Found");
    }
    // disconnectFromDatabase();
    return NextResponse.json({
      message: "Search results",
      products,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Could not Fetch Products", { status: 500 });
  }
}
