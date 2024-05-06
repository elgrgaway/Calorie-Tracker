/*eslint-disable*/
import styles from "./FormInput.module.css";
import { forwardRef } from "react";
const FormInput = forwardRef((props, ref) => {
  const { label, id, type, isValid, onBlur, value, onChange, children } = props;
  const input =
    type === "select" ? (
      <select
        className={styles["form-input"]}
        id={id}
        onChange={onBlur}
        ref={ref}
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        className={`${styles["form-input"]} ${!isValid ? styles.error : ""}`}
        ref={ref}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
    );

  return (
    <>
      <label htmlFor={id}>{label}: </label>
      {input}
    </>
  );
});
export default FormInput;
