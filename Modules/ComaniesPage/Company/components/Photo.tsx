"use client";
import { appStore } from "@/store/store";
import cl from "../company.module.css";
import Image from "next/image";
import trashW from "@/public/imgs/TrashW.svg";
import addPhoto from "@/public/imgs/Icon.svg";
import { observer } from "mobx-react-lite";

export const Photo = observer(() => {
  const { company } = appStore;

  const handleAddPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    appStore.postImg(Number(company?.id), file);
  };
  const handleDeletePhoto = async (name: string) => {
    appStore.deleteImg(Number(company?.id), name);
  };
  return (
    <div className={cl.item}>
      <div className={cl.flexTitle}>
        <p className={cl.itemTitle}>Photos</p>
        <label className={cl.editBtn}>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleAddPhoto}
          />
          <Image alt="photo" src={addPhoto} />
          <p>Add </p>
        </label>
      </div>
      <div className={cl.photos}>
        {company?.photos?.map((photo) =>
          photo && photo.filepath ? (
            <div key={photo.name} className={cl.photoContainer}>
              <Image
                alt="photo"
                src={photo.filepath}
                width={144}
                height={108}
                className={cl.photo}
              />
              <button
                className={cl.deleteBtn}
                onClick={(e) => handleDeletePhoto(photo.name)}
              >
                <Image alt="delete" src={trashW} />
              </button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
});
