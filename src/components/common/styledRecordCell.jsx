import styles from "./styledRecordCell.module.css";

function StyledRecordCell(probs) {
  return <div className={styles.recordDate}>{probs.children}</div>;
}
export default StyledRecordCell;
