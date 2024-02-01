import Logo from "@/components/nav/logo";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="content-grid bg-white">
        <nav className="py-3 flex items-center">
          <Logo className="mr-2" />
        </nav>
      </header>
      <main className="content-grid flex-grow pb-36">{props.children}</main>
    </div>
  );
};

export default Layout;
