"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";
import clsx from "clsx";

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
          className={clsx(css.navLink, pathname === "/" && css.active)}
        >
          Home
        </Link>
        <Link
          href="/catalog"
          className={clsx(
            css.navLink,
            pathname.startsWith("/catalog") && css.active,
          )}
        >
          Catalog
        </Link>
      </nav>
    </header>
  );
}
