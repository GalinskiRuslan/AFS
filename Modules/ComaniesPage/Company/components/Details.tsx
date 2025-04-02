"use client";
import { useState } from "react";
import cl from "../company.module.css";
import { appStore } from "@/store/store";
import Image from "next/image";
import pencil from "@/public/imgs/Pencil.svg";
import dayjs from "dayjs";
import cancel from "@/public/imgs/X.svg";
import check from "@/public/imgs/Check.svg";

const options = ["Partnership", "Corporation", "LLCs", "Sole Proprietorship"];
const typeOptions = [
  "Public Financial Institutions",
  "funeral_home",
  "logistics_services",
];

export const Details = () => {
  const { company } = appStore;
  const [isEditing, setIsEditing] = useState(false);

  if (!company) {
    return <p>Loading company details...</p>;
  }
  const [formData, setFormData] = useState({
    agreement: company.contract.no,
    issueDate: dayjs(company.contract.issue_date).format("YYYY-MM-DD"),
    businessEntity: company.businessEntity,
    type: company?.type.join(", "),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (company) {
      appStore.patchCompanyWithId(Number(company?.id), {
        name: company.name,
        shortName: company.shortName,
        businessEntity: formData.businessEntity,
        contract: {
          no: formData.agreement,
          issue_date: new Date(formData.issueDate),
        },
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      agreement: company?.contract.no,
      issueDate: dayjs(company?.contract.issue_date).format("YYYY-MM-DD"),
      businessEntity: company?.businessEntity,
      type: company?.type.join(", "),
    });
    setIsEditing(false);
  };

  return (
    <div className={cl.item}>
      <div className={cl.flexTitle}>
        <p className={cl.itemTitle}>Company Details</p>
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
          <p className={cl.contentText}>Agreement:</p>
          <p className={cl.contentText}>Business entity:</p>
          <p className={cl.contentText}>Company type:</p>
        </div>
        <div>
          {isEditing ? (
            <>
              <div className={cl.inputItemFirst}>
                <input
                  className={cl.input}
                  name="agreement"
                  value={formData.agreement}
                  onChange={handleChange}
                />
                <span className={cl.contentText}>Date:</span>
                <input
                  className={cl.input}
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                />
              </div>
              <div className={cl.inputItem}>
                <select
                  name="businessEntity"
                  value={formData.businessEntity}
                  onChange={handleChange}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className={cl.inputItem}>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  {typeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <p className={cl.conentTextR}>
                {formData.agreement} <span className={cl.contentText}>/</span>
                {dayjs(formData.issueDate).format("MM.DD.YYYY")}
              </p>
              <p className={cl.conentTextR}>{formData.businessEntity}</p>
              <p className={cl.conentTextR}>{formData.type}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
