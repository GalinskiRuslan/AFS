"use client";
import { appStore } from "@/store/store";
import cl from "../company.module.css";
import Image from "next/image";
import pencil from "@/public/imgs/Pencil.svg";
import { useState, useEffect } from "react";
import cancel from "@/public/imgs/X.svg";
import check from "@/public/imgs/Check.svg";
import { observer } from "mobx-react-lite";

export const Contacts = observer(() => {
  const { contact } = appStore;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  });

  // Загружаем данные в formData при изменении contact
  useEffect(() => {
    if (contact) {
      setFormData({
        firstname: contact.firstname || "",
        lastname: contact.lastname || "",
        phone: contact.phone || "",
        email: contact.email || "",
      });
    }
  }, [contact]);

  if (!contact) {
    return <p>Loading contact details...</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSave = () => {
    appStore.patchContactWithId(Number(contact.id), formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstname: contact.firstname || "",
      lastname: contact.lastname || "",
      phone: contact.phone || "",
      email: contact.email || "",
    });
    setIsEditing(false);
  };

  return (
    <div className={cl.item}>
      <div className={cl.flexTitle}>
        <p className={cl.itemTitle}>Contacts</p>
        {!isEditing ? (
          <button className={cl.editBtn} onClick={() => setIsEditing(true)}>
            <Image alt="pen" src={pencil} />
            <p>Edit</p>
          </button>
        ) : (
          <div className={cl.btnGroup}>
            <button className={cl.editBtn} onClick={handleSave}>
              <Image alt="check" src={check} /> Save
            </button>
            <button className={cl.editBtn} onClick={handleCancel}>
              <Image alt="X" src={cancel} />
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className={cl.content}>
        <div>
          <p className={cl.contentText}>Responsible person:</p>
          <p className={cl.contentText}>Phone number:</p>
          <p className={cl.contentText}>E-mail:</p>
        </div>
        <div>
          {isEditing ? (
            <>
              <div className={cl.inputItemFirst}>
                <input
                  className={cl.input}
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                <span className={cl.contentText}>Lastname:</span>
                <input
                  className={cl.input}
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className={cl.inputItem}>
                <input
                  className={cl.input}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className={cl.inputItem}>
                <input
                  className={cl.input}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <>
              <p className={cl.conentTextR}>
                {formData.firstname} {formData.lastname}
              </p>
              <p className={cl.conentTextR}>
                {formData.phone
                  ? formData.phone.replace(
                      /(\d{1})(\d{3})(\d{3})(\d{4})/,
                      "+$1 $2 $3 $4"
                    )
                  : ""}
              </p>
              <p className={cl.conentTextR}>{formData.email}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
