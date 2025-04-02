"use client";
import Link from "next/link";
import cl from "./subMenu.module.css";
import Image from "next/image";
import org from "@/public/imgs/Company.svg";
import arch from "@/public/imgs/archivePrimery.svg";
import user from "@/public/imgs/UserPrimery.svg";

export const SubMenu = () => {
  return (
    <div className={cl.contaiiner}>
      <div>
        <div className={cl.head}>
          <p className={cl.title}>Oak Tree C emetery</p>
          <p className={cl.role}>Process Manager</p>
        </div>
        <div className={cl.items}>
          <nav className={cl.nav}>
            <Link href={"#"} className={cl.itemPrimary}>
              <Image alt="org" src={org} width={16} height={16} />{" "}
              <p>Organizations</p>
            </Link>
            <Link href={"#"} className={cl.item}>
              <Image alt="org" src={arch} width={16} height={16} />{" "}
              <p>Contractors</p>
            </Link>
            <Link href={"#"} className={cl.item}>
              <Image alt="org" src={user} width={16} height={16} />{" "}
              <p>Clients</p>
            </Link>
          </nav>
        </div>
      </div>
      <p className={cl.copyright}>All Funeral Services © 2015-2025</p>
    </div>
  );
};
