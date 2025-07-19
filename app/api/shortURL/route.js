import UrlSchema from "@/model/UrlSchema";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

function isValidHttpUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

function generateShortCode(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url || !isValidHttpUrl(url)) {
      return NextResponse.json(
        { error: "Invalid URL. Must start with http:// or https://" },
        { status: 400 }
      );
    }

    await connectDB();

    let shortCode;
    let isUnique = false;

    while (!isUnique) {
      shortCode = generateShortCode();
      const existing = await UrlSchema.findOne({ shortCode });
      console.log(existing);      
      if (!existing) {
        isUnique = true;
      }
    }

    const data = new UrlSchema({ shortCode, longUrl: url });
    await data.save();

    const fullShortUrl = `${process.env.BASE_URL}/${shortCode}`;
    revalidatePath(`/${shortCode}`, "page");

    
    
    return NextResponse.json({ url: fullShortUrl }, { status: 200 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
