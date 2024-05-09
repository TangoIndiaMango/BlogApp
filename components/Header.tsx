"use client";

import Link from "next/link";
import Search from "./Search";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header>
      <Link href="/">
        <div className="brand">Blogs</div>
      </Link>

      <div className="addButton">
        {pathname === "/add" ? (
          ""
        ) : (
          <Link href="/add" className="addblog">
            Add Blog
          </Link>
        )}
        <Search />
      </div>
    </header>
  );
};

export default Header;
