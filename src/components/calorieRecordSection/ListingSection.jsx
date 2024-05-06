/* eslint-disable */
import { useState, useEffect, useContext } from "react";
import styles from "./ListingSection.module.css";
import RecordList from "./RecordList";
import { AppContext } from "../../AppContext";
function ListingSection(props) {
  const { allRecords } = props;
  // const [user, setUser] = useState({});
  // import {currentDate,setCurrentDate} from ""
  const { currentDate, currentDateStr, setCurrentDate } =
    useContext(AppContext);
  function filterHandler(event) {
    setCurrentDate(event.target.value);
    // console.log(event.target.value);
    // console.log(currentDate.toISOString().split("T")[0]);
  }
  const dateFilter = (record) => {
    return (
      record.date.getDate() === currentDate.getDate() &&
      record.date.getFullYear() === currentDate.getFullYear() &&
      record.date.getMonth() === currentDate.getMonth()
    );
  };

  return (
    <div className={styles["filter-section"]}>
      <label className={styles["filter-label"]} htmlFor="filter-input">
        Select Date:
      </label>
      <input
        className={styles["filter-input"]}
        type="date"
        name="filter"
        id="filter-input"
        value={currentDateStr}
        onChange={filterHandler}
      />
      {/* <div>
        <p>firstname: {user.firstName}</p>
        <p>lastname: {user.lastName}</p>
        <p>id: {user.id}</p>
      </div> */}
      <RecordList records={allRecords.filter(dateFilter)} />
    </div>
  );
}
export default ListingSection;
