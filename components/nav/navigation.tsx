"use client;";

import Logo from "./logo";
import SearchBar from "./search-bar";

const Navigation = () => {
  return (
    <nav className="py-2 flex items-center">
      <Logo />
      <SearchBar />
    </nav>
  );
};

export default Navigation;
