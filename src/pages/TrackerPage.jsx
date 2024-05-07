/* eslint-disable */

import { useState, useEffect } from "react";
import CaloriesRecordEdit from "../components/edit/CaloriesRecordEdit";
import ListingSection from "../components/calorieRecordSection/ListingSection";
import styles from "./TrackerPage.module.css";
import AppContextProvider from "../AppContext.jsx";

const RECORDS_KEY = "records";

export function TrackerPage() {
  const [records, setRecords] = useState([]);

  const save = () => {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  };
  const loadRecords = () => {
    const data = localStorage.getItem(RECORDS_KEY);
    if (data) {
      setRecords(
        JSON.parse(data).map((record) => ({
          ...record,
          date: new Date(record.date),
          calories: Number(record.calories),
        }))
      );
    } else {
      setRecords([]);
    }
  };
  useEffect(() => {
    if (!records) {
      loadRecords();
    } else {
      save();
    }
  }, [records]);

  const formSubmitHandler = (record) => {
    const formattedRecords = {
      ...record,
      date: record.date,
      id: crypto.randomUUID(),
    };
    setRecords((previousRecords) => [formattedRecords, ...previousRecords]);
  };
  const yearDate = new Date().getFullYear();

  return (
    <>
      <div className="app">
        <h1 className={styles.title}>
          Calorie Tracker
          <img src="calories.png" alt="" />
        </h1>
        <CaloriesRecordEdit formSubmit={formSubmitHandler} />
        {records && <ListingSection allRecords={records} />}
        <footer className={styles.footer}>
          <p>copyright &copy; {yearDate} by Ahmed Elgrgawi</p>
          <div>
            <a href="https://github.com/elgrgaway">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://www.linkedin.com/in/ahmed-elgrgaway/">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
