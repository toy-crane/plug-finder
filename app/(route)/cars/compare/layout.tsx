import { Icons } from "@/components/icons";
import Logo from "@/components/nav/logo";
import Link from "next/link";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="content-grid bg-white">
        <nav className="py-4 flex items-center">
          <Link href="/">
            <Icons.textLogo className="w-32 h-8" />
          </Link>
        </nav>
      </header>
      <main className="content-grid flex-grow pb-36">{props.children}</main>
    </div>
  );
};

export default Layout;
