import Image from "next/image";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <>
      <Link href="/" className={className}>
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
