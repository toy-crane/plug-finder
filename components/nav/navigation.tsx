"use client;";

import Logo from "./logo";
import SearchBar from "./search-bar";

const Navigation = () => {
  return (
    <nav className="py-3 flex items-center">
      <Logo className="mr-2" />
      <SearchBar />
    </nav>
  );
};

export default Navigation;
