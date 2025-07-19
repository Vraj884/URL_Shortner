import Image from "next/image";
import { Montserrat } from "next/font/google";
import UrlForm from "@/components/UrlForm";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ["700"]
})

export default function Home() {
  return (
    <>
      <div className="w-screen flex flex-col h-screen gap-4">
        <div>
          <p className={`
          ${montserrat.className} 
          text-2xl md:text-3xl lg:text-4xl text-center bg-blue-600 py-4 text-gray-200`}>
            URL<span className="text-yellow-300 italic">Shortner884</span>
          </p>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <UrlForm/>
        </div>
      </div>
    </>
  );
}
