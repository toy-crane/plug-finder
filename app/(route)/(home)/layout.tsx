import BottomNav from "@/components/nav/bottom-nav";
import Navigation from "@/components/nav/navigation";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <header className="content-grid border-b">
        <Navigation />
      </header>
      <main className="min-h-screen">{props.children}</main>
      <BottomNav />
    </>
  );
};

export default Layout;
