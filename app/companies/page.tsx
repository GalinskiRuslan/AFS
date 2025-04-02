"use client";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { appStore } from "@/store/store";
import { useEffect, useState } from "react";
import { Company } from "@/Modules/ComaniesPage/Company/Company";
import { AuthForm } from "@/Modules/layouts/AuthForm/AuthForm";

export default function Companies() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);
  if (!token) return <AuthForm />;
  return (
    <div className="content">
      <Company />
    </div>
  );
}
