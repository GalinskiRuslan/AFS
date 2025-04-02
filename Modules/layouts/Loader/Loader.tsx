"use client";
import cl from "./loader.module.css";
import { observer } from "mobx-react-lite";
import { appStore } from "@/store/store";
import { useEffect, useState } from "react";

export const Loader: React.FC = observer(() => {
  if (!appStore.loading) {
    return null;
  } else {
    return (
      <div className={cl.container}>
        <span className={cl.loader}></span>
      </div>
    );
  }
});
