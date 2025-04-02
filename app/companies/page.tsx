"use client";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { appStore } from "@/store/store";
import { useEffect, useState } from "react";
import { Company } from "@/Modules/ComaniesPage/Company/Company";

export default function Companies() {
  //   const token =
  //     typeof window !== "undefined" ? localStorage.getItem("token") : null;
  //   const router = useRouter();
  //   useEffect(() => {
  //     if (!token) {
  //       router.push("/");
  //     }
  //   }, [token]);
  //   if (!token) return null;
  return (
    <div className="content">
      <Company />
    </div>
  );
}
