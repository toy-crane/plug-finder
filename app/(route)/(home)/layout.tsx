const Layout = (props: { children: React.ReactNode }) => {
  return <main className="content-grid min-h-screen">{props.children}</main>;
};

export default Layout;
