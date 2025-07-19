import UrlSchema from "@/model/UrlSchema";
import { connectDB } from "@/utils/connectDB";
import { headers } from "next/headers"; 

export const dynamicParams = true;
export const revalidate = 60;

const page = async ({ params }) => {
  const { id } = params;
  const headersList = headers();
  const isPrerender = headersList.get("x-prerender") === "true";

  await connectDB();
  const doc = await UrlSchema.findOne({ shortCode: id });

  if (!doc) {
    notFound();
  }

  if (!isPrerender) {
    redirect(doc.longUrl);
  }

  // ISR needs to render something to generate the static page
  return null; 
};

export async function generateStaticParams() {
  await connectDB();
  const docs = await UrlSchema.find();
  return docs.map((doc) => ({ id: doc.shortCode }));
}

export default page;
