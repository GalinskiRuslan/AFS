import cl from "./selector.module.css";

import { useState } from "react";

interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const Select = ({ options, value, onChange }: SelectProps) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
