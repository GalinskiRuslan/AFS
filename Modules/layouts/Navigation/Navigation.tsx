"use client";
import Link from "next/link";
import cl from "./navigation.module.css";
import Image from "next/image";
import src from "@/public/imgs/Oak tree logo.svg";
import srcComp from "@/public/imgs/Company.svg";
import srcSearch from "@/public/imgs/Search.svg";
import srcSetting from "@/public/imgs/Settings.svg";
import srcSignOut from "@/public/imgs/SignOut.svg";
import { usePathname } from "next/navigation";
export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className={cl.container}>
      <div className={cl.item}>
        <Link href="/">
          <Image alt="home" src={src} />
        </Link>
        <Link href="/companies">
          <button
            className={`${cl.buttonTransparent} ${
              pathname === "/companies" ? cl.active : ""
            }`}
          >
            <Image alt="companies" src={srcComp} />
          </button>
        </Link>
        <Link href="/#search">
          <button
            className={`${cl.buttonTransparent} ${
              pathname === "/search" ? cl.active : ""
            }`}
          >
            <Image alt="companies" src={srcSearch} />
          </button>
        </Link>
      </div>
      <div className={cl.item}>
        <Link href="/#setting">
          <button
            className={`${cl.buttonTransparent} ${
              pathname === "/setting" ? cl.active : ""
            }`}
          >
            <Image alt="companies" src={srcSetting} />
          </button>
        </Link>
        <Link href="/signout">
          <button
            className={`${cl.buttonTransparent} ${
              pathname === "/signout" ? cl.active : ""
            }`}
          >
            <Image alt="companies" src={srcSignOut} />
          </button>
        </Link>
      </div>
    </nav>
  );
};
