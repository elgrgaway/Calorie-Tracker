import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css";
export function ErrorPage() {
  const REDIRECT_COUNT = 10;
  const [counter, setCounter] = useState(REDIRECT_COUNT);
  const intervalHandler = useRef();
  const navigation = useNavigate();
  useEffect(() => {
    if (!counter) {
      clearInterval(intervalHandler.current);
      navigation("/");
    }
  }, [navigation, counter]);
  useEffect(() => {
    intervalHandler.current = setInterval(() => {
      setCounter((c) => c - 1);
    }, 1000);
    return () => clearInterval(intervalHandler.current);
  }, []);
  return (
    <>
      <h1>Something went wrong...</h1>
      <Link to="/">Go back</Link>
      <div className={styles.counter}>
        <p>{counter}</p>
      </div>
      <div className={styles.loader}>
        <span className={styles.loader__element}></span>
        <span className={styles.loader__element}></span>
        <span className={styles.loader__element}></span>
      </div>
    </>
  );
}
