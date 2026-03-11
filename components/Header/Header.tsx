"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/">
        <Image src="/logo.svg" alt="RentalCar" width={104} height={16} />
      </Link>

      <nav className={css.nav}>
        <Link
          href="/"
          className={`${css.navLink} ${pathname === "/" ? css.active : ""}`}
        >
          Home
        </Link>
        <Link
          href="/catalog"
          className={`${css.navLink} ${pathname.startsWith("/catalog") ? css.active : ""}`}
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
}
