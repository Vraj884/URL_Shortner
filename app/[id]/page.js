import UrlSchema from "@/model/UrlSchema";
import { connectDB } from "@/utils/connectDB";
import { notFound, redirect } from "next/navigation";

export const dynamicParams = true; 

const page = async ({ params }) => {
  const { id } = params;
  
  await connectDB();
  const doc = await UrlSchema.findOne({ shortCode: id });

  if (!doc) {
    notFound();
  }

  redirect(doc.longUrl);
};

export async function generateStaticParams() {
  await connectDB();
  const docs = await UrlSchema.find().limit(20);
  return docs.map((doc) => ({ id: doc.shortCode }));
}

export default page;
