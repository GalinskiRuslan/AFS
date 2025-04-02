"use client";
import { appStore } from "@/store/store";
import cl from "../company.module.css";
import Image from "next/image";
import trashW from "@/public/imgs/TrashW.svg";
import addPhoto from "@/public/imgs/Icon.svg";

export const Photo = () => {
  const { company } = appStore;
  return (
    <div className={cl.item}>
      <div className={cl.flexTitle}>
        <p className={cl.itemTitle}>Photos</p>
        <button className={cl.editBtn}>
          <Image alt="photo" src={addPhoto} />
          <p>Add </p>
        </button>
      </div>
      <div className={cl.photos}>
        {company?.photos.map((photo) =>
          photo && photo.filepath ? (
            <div key={photo.name} className={cl.photoContainer}>
              <Image
                alt="photo"
                src={photo.filepath}
                width={144}
                height={108}
                className={cl.photo}
              />
              <button className={cl.deleteBtn}>
                <Image alt="delete" src={trashW} />
              </button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
