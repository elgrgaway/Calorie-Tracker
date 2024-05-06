/* eslint-disable */
import styles from "./RecordList.module.css";
// import styled from "styled-components";
import CaloresRecord from "./CaloresRecord";
import { Link } from "react-router-dom";
// const List = styled.ul`
//     list-style: none;
//     padding: 0;
//     border: 1px solid #ccc;
//     border-radius: 10px;
//   }
//   & li {
//     margin: 10px;
//   }

//   `;
import { useState } from "react";

function RecordList(props) {
  const [totalCalories, setTotalCalories] = useState(0);

  const list = props.records?.length ? (
    <ul className={styles["record-list"]}>
      {props.records.map((record) => (
        <li key={record.id}>
          {/* <Link to={`/Tracker-page/${record.id}`}> */}
          <CaloresRecord
            date={record.date}
            meal={record.meal}
            content={record.content}
            calories={record.calories}
            id= {record.id}
            addCalories={setTotalCalories}
          />
          {/* </Link> */}
        </li>
      ))}
    </ul>
  ) : (
    <div className={styles["false-state"]}>No records found for this date</div>
  );
  return (
    <>
      {list}
      <p className={styles.total}>Total calories : {totalCalories}</p>
    </>
  );
}
export default RecordList;
