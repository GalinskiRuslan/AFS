"use client";
import Link from "next/link";
import cl from "./subMenu.module.css";

export const SubMenu = () => {
  return (
    <div className={cl.contaiiner}>
      <div className={cl.head}>
        <p className={cl.title}>Oak Tree C emetery</p>
        <p className={cl.role}>Process Manager</p>
      </div>
      <div className={cl.items}>
        <nav>
          <Link href={"/companies"} className={cl.item}>
            Organizations
          </Link>
          <Link href={"/companies"} className={cl.item}>
            Organizations
          </Link>
          <Link href={"/companies"} className={cl.item}>
            Organizations
          </Link>
        </nav>
      </div>
      <p className={cl.copyright}>All Funeral Services © 2015-2025</p>
    </div>
  );
};
