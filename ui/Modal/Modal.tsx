"use client";
import React from "react";
import cl from "./modal.module.css";
import { type } from "os";

type Props = {
  children: React.ReactNode;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const Modal = ({ children, visible, setVisible }: Props) => {
  const rootClasses = [cl.modal];
  if (visible) {
    rootClasses.push(cl.active);
    if (window) {
      if (document.getElementsByTagName("html")[0]) {
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
      }
    }
  } else {
    if (window) {
      if (document.getElementsByTagName("html")[0]) {
        document.getElementsByTagName("html")[0].style.overflow = "auto";
      }
    }
  }
  if (visible) {
    return (
      <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
        <div
          className={cl.content}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default Modal;
