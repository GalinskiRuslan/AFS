"use client";
import cl from "./company.module.css";
import { observer } from "mobx-react-lite";
import { appStore } from "@/store/store";
import { useEffect, useState } from "react";
import bigPencil from "@/public/imgs/Pencil (1).svg";
import trash from "@/public/imgs/Trash.svg";
import Image from "next/image";
import { Details } from "./components/Details";
import Modal from "@/ui/Modal/Modal";
import { Contacts } from "./components/Contacts";
import { Photo } from "./components/Photo";
export const Company = observer(() => {
  const { company } = appStore;
  const [isDeleting, setIsDeleting] = useState(false);
  const [comName, setComName] = useState(company?.name || "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    appStore.fetchCompanyWithId(12);
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setComName(() => e.target.value);
  };

  const handleSave = async () => {
    if (company) {
      appStore.patchCompanyWithId(Number(company.id), {
        name: comName,
        shortName: company.shortName,
        businessEntity: company.businessEntity,
        contract: {
          no: company.contract.no,
          issue_date: company.contract.issue_date,
        },
      });
      setVisible(false);
    }
  };
  const handleDelete = async () => {
    appStore.deleteCompanyWithId(Number(company?.id));
    setVisible(false);
  };
  const handleCancel = () => {
    setComName(company?.name || "");
    setIsDeleting(false);
    setVisible(false);
  };

  if (company) {
    return (
      <div className={cl.container}>
        <div className={cl.flexTitle}>
          <p className={cl.title}>{company.name}</p>
          <div className={cl.buttons}>
            <button className={cl.transperentBtn}>
              <Image
                alt="pen"
                src={bigPencil}
                onClick={() => {
                  setIsDeleting(false), setVisible(true);
                }}
              />
            </button>
            <button className={cl.transperentBtn}>
              <Image
                alt="trash"
                src={trash}
                onClick={() => {
                  setIsDeleting(true), setVisible(true);
                }}
              />
            </button>
          </div>
        </div>
        <Details />
        <Contacts />
        <Photo />
        <Modal visible={visible} setVisible={setVisible}>
          {isDeleting ? (
            <div className={cl.modalContainer}>
              <p className={cl.modalTitle}>Remove the Organization?</p>
              <p className={cl.modalText}>
                Are you sure you want to remove this Organozation?
              </p>
              <div className={cl.modalButtons}>
                <button className={cl.inhBtn} onClick={handleCancel}>
                  No
                </button>
                <button className={cl.primaryBtn} onClick={handleDelete}>
                  Yes, Remove
                </button>
              </div>
            </div>
          ) : (
            <div className={cl.modalContainer}>
              <p className={cl.modalTitle}>Specify the Organization's name</p>
              <input
                className={cl.input}
                name="agreement"
                value={comName}
                onChange={handleChange}
              />
              <div className={cl.modalButtons}>
                <button className={cl.inhBtn} onClick={handleCancel}>
                  Cancel
                </button>
                <button className={cl.primaryBtn} onClick={handleSave}>
                  Save changes
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  }
});
