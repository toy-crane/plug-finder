import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href="/">
        <Image
          src="/logo-filled.png"
          width={48}
          height={48}
          alt="Logo"
          className="align-middle cursor-pointer"
        />
      </Link>
    </>
  );
};

export default Logo;
