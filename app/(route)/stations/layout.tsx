import Navigation from "@/components/nav/navigation";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <header className="content-grid">
        <Navigation />
      </header>
      <main className="content-grid">{props.children}</main>
    </>
  );
};

export default Layout;
