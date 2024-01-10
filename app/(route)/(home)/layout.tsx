import SearchBar from "./_components/search-bar";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <header className="content-grid">
        <nav className="py-2">
          <SearchBar />
        </nav>
      </header>
      <main className="content-grid min-h-screen">{props.children}</main>
    </>
  );
};

export default Layout;
