import Logo from "@/components/nav/logo";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <header className="content-grid">
        <nav className="py-3 flex items-center">
          <Logo className="mr-2" />
        </nav>
      </header>
      <main className="content-grid bg-[#fafafa] pt-20 min-h-screen pb-20">
        {props.children}
      </main>
    </>
  );
};

export default Layout;
