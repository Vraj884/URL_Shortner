import UrlSchema from "@/model/UrlSchema"
import { connectDB } from "@/utils/connectDB"
import { notFound, redirect } from "next/navigation"

export const dynamicParams = true; 
export const revalidate = false;

const page = async({params}) => {
  const {id} = params
  await connectDB()
  const doc = await UrlSchema.findOne({shortCode:id})
  if(!doc){
    notFound()
  }
  else{
    redirect(doc.longUrl)
  }
}

export async function generateStaticParams() {
  await connectDB();

  const docs = await UrlSchema.find(); 

  return docs.map(doc => ({
    id: doc.shortCode
  }));
}

export default page
