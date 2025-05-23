"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Company } from "@/Modules/ComaniesPage/Company/Company";
import { SubMenu } from "@/Modules/ComaniesPage/SubMenu/SubMenu";

export default function Companies() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (!storedToken) {
      router.push("/");
    }
  }, []);

  if (!token) return null;

  return (
    <div className="content">
      <SubMenu />
      <Company />
    </div>
  );
}
