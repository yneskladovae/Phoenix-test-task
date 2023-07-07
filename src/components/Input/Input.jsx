import React from "react";
import styles from "./Input.module.css";
export const Input = ({ value, defaultValue, type, onChange, placeholder, classNameValue, style }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={`${styles.input} ${classNameValue}`}
      placeholder={placeholder}
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={handleInputChange}
      style={style}
    />
  );
};
