import React from "react";
import styles from "./Select.module.css";

export const Select = ({ onChange, options, placeholder, defaultValue, classNameValue }) => {
  return (
    <div className={styles.selectContainer}>
      <select
        className={`${styles.select} ${classNameValue}`}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className={styles.verticalLine}></span>
    </div>
  );
};
