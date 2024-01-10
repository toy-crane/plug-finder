"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      src="/logo-filled.png"
      width={48}
      height={48}
      alt="Logo"
      className="align-middle cursor-pointer"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
