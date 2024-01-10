const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <header className="content-grid">
        <nav>Hello</nav>
      </header>
      <main className="content-grid min-h-screen">{props.children}</main>
    </>
  );
};

export default Layout;
