"use client";
import { observer } from "mobx-react-lite";
import { appStore } from "@/store/store";
import { useState } from "react";
import cl from "./authform.module.css";
import { useRouter } from "next/navigation";
export const AuthForm: React.FC = observer(() => {
  const [name, setName] = useState<string>("");
  const router = useRouter();
  return (
    <>
      <p className={cl.title}>Autharization</p>
      <input
        className={cl.input}
        placeholder="Enter your name"
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className={cl.submit}
        onClick={() => appStore.fetchAuth(name, router)}
      >
        Submit
      </button>
    </>
  );
});
