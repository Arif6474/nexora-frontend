"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Google from "@/public/google.png"; 

export default function GoogleLogin() {


  const handleGoogleLogin = () => {
    signIn("google");
  };

  return (
    <div className="my-8 px-4">
      <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-2 bg-white text-black  rounded-full px-4 py-2  w-full border-1 border-gray-300 hover:bg-gray-100  hover:cursor-pointer transition-all duration-300 ease-in-out">
        <Image src={Google} alt="Google" width={20} height={20}  className="rounded-full" />
        <span style={{ marginLeft: "10px" }}>Continue with Google</span>
      </button>
    </div>
  );
}
