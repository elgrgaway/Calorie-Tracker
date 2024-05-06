import styles from "./CaloresRecordDate.module.css";
import StyledRecordCell from "../common/styledRecordCell";
function CaloresRecordDate(probs) {
  const day = probs.date.getDate();
  const month = probs.date.toLocaleString("defalut", { month: "long" });
  const year = probs.date.getFullYear();
  return (
    <StyledRecordCell>
      <div className={styles.recordMonth}>{month}</div>
      <div className={styles.recordDay}>{day}</div>
      <div className={styles.recordYear}>{year}</div>
    </StyledRecordCell>
  );
}
export default CaloresRecordDate;
