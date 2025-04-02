"use client";
import styles from "./page.module.css";
import { AuthForm } from "@/Modules/layouts/AuthForm/AuthForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  if (token) {
    return <AuthForm />;
  }
  return (
    <div className={styles.page}>
      <h3>Oak Tree C emetery</h3>
    </div>
  );
}
