import Logo from "./_components/logo";
import SearchBar from "./_components/search-bar";
import Image from "next/image";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <header className="content-grid">
        <nav className="py-2 flex items-center">
          <Logo />
          <SearchBar />
        </nav>
      </header>
      <main className="content-grid min-h-screen">{props.children}</main>
    </>
  );
};

export default Layout;
