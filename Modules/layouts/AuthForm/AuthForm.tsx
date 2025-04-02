"use client";
import { observer } from "mobx-react-lite";
import { appStore } from "@/store/store";
import { useEffect, useState } from "react";
export const AuthForm: React.FC = observer(() => {
  const [name, setName] = useState<string>("");
  useEffect(() => {
    appStore.fetchAuth(name);
  }, []);
  return (
    <div>
      Autharization
      <input
        placeholder="Enter your name"
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => appStore.fetchAuth(name)}>Submit</button>
    </div>
  );
});
