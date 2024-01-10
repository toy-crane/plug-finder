"use client;";

import Logo from "../../app/(route)/(home)/_components/logo";
import SearchBar from "../../app/(route)/(home)/_components/search-bar";

const Navigation = () => {
  return (
    <nav className="py-2 flex items-center">
      <Logo />
      <SearchBar />
    </nav>
  );
};

export default Navigation;
