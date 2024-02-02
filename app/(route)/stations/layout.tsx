import Navigation from "@/components/nav/navigation";
import Script from "next/script";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <header className="content-grid">
        <Navigation />
      </header>
      <main className="content-grid">{props.children}</main>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />
    </>
  );
};

export default Layout;
