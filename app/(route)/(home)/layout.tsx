import Navigation from "@/components/nav/navigation";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <header className="content-grid">
        <Navigation />
      </header>
      <main className="content-grid min-h-screen">{props.children}</main>
    </>
  );
};

export default Layout;
