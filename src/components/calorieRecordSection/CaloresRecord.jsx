/* eslint-disable */

import { useState, useEffect } from "react";
import styles from "./caloresRecord.module.css";
import CaloresRecordDate from "./CaloresRecordDate";
import StyledRecordCell from "../common/styledRecordCell";
function CaloresRecord(props) {
  useEffect(() => {
    props.addCalories((prevTotal) => prevTotal + props.calories);

    return () => {
      props.addCalories((prevTotal) => prevTotal - props.calories);
    };
  }, []);

  return (
    <ul className={styles.record}>
      <li>
        <CaloresRecordDate date={props.date} />
      </li>
      <li className={styles.middle}>{props.meal}</li>
      <li className={styles.middle}>{props.content}</li>
      <li className={styles["record-calories"]}>
        <StyledRecordCell>{props.calories}</StyledRecordCell>
      </li>
    </ul>
  );
}
export default CaloresRecord;
