import React from "react";
import styles from "./Button.module.css";

export const Button = ({
  onClick,
  children,
  classNameValue,
  style,
  disabled,
}) => {
  return (
    <button
      className={`${styles.button} ${classNameValue}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
