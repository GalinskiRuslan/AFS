"use client";
import styles from "./page.module.css";
import { AuthForm } from "@/Modules/layouts/AuthForm/AuthForm";
import { appStore } from "@/store/store";
import { useEffect, useState } from "react";

export default function Home() {
  const { isAuth } = appStore;
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [isAuth]);
  if (!token) {
    return (
      <div className={styles.page}>
        <AuthForm />
      </div>
    );
  }
  return (
    <div className={styles.page}>
      <h3>Oak Tree C emetery</h3>
    </div>
  );
}
