"use client";

import { useRouter } from "next/navigation";
import { LuArrowBigLeft } from "react-icons/lu";

export default function BackBtn() {
  const router = useRouter();
  return (
    <button
      className="inline-flex items-center bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 w-fit disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
      onClick={() => router.back()}
    >
      <LuArrowBigLeft className="mr-2 h-4 w-4" />
      Back
    </button>
  );
}
