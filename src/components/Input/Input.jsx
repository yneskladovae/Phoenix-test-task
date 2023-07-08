import React from "react";
import styles from "./Input.module.css";
export const Input = ({ value, defaultValue, type, onChange, placeholder, classNameValue, style, readOnly }) => {
  return (
    <input
      className={`${styles.input} ${classNameValue}`}
      placeholder={placeholder}
      type={type}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      style={style}
      readOnly={readOnly}
    />
  );
};
