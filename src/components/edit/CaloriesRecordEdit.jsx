/* eslint-disable */
import "animate.css";

import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";
import styles from "./CaloriesRecordEdit.module.css";
import Modal from "react-modal"; // Importing react-modal
import { AppContext } from "../../AppContext";
import { getDateFromString } from "../../utils";
import FormInput from "../common/FormInput";
import { useMemo } from "react";
Modal.setAppElement("#root"); // Set the root element for accessibility

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content", // Full width
    borderRadius: "10px",
    backgroundColor: "var(--color-light)",
    border: "1px solid var(--color-normal)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    // transition: "0.3s all",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: "1000",
  },
};
const DEFALUT_VALUE = {
  meal: true,
  content: false,
  calories: true,
};
// function formReducer(state, action) {
//   const { key, value, auxValue } = action;

//   let valid = false;
//   switch (key) {
//     case "date":
//     case "meal":
//       return {
//         ...state,
//         meal: value,
//       };
//     case "content":
//       valid =
//         (value === "sport" && auxValue < 0) ||
//         (value !== "sport" && auxValue >= 0);
//       return {
//         ...state,
//         content: !!value,
//         calories: valid,
//       };

//     case "calories":
//       (auxValue === "sport" && value < 0) ||
//         (auxValue !== "sport" && value >= 0);
//       return {
//         ...state,
//         calories: valid,
//       };
//     default:
//       return {
//         ...state,
//         meal: !!value,
//       };
//   }
// }
function formReducer(state, action) {
  const { key, value, auxValue } = action;

  switch (key) {
    case "date":
    case "meal":
      return {
        ...state,
        [key]: value,
      };
    case "content":
      const validContent =
        (value === "sport" && auxValue < 0) ||
        (value !== "sport" && auxValue >= 0);
      return {
        ...state,
        [key]: !!value,
        calories: validContent,
      };
    case "calories":
      const validCalories =
        (auxValue === "sport" && value < 0) ||
        (auxValue !== "sport" && value >= 0);
      return {
        ...state,
        [key]: validCalories,
      };
    default:
      return state;
  }
}

function CaloriesRecordEdit(props) {
  const contentRef = useRef();
  const caloriesRef = useRef();
  const mealRef = useRef();
  // const [recordMeal, setRecordMeal] = useState(DEFALUT_VALUE);

  // const [isFormValid, setIsFormValid] = useState(false);
  const { currentDate, currentDateStr, isDateValid, setCurrentDate } =
    useContext(AppContext);
  // const [isDateValid, setIsDateValid] = useState(false);
  // const [isCaloriesValid, setIsCaloriesValid] = useState(true);
  // const [isContentValid, setIsContentValid] = useState(false);
  const [formState, dispatchFn] = useReducer(formReducer, DEFALUT_VALUE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { content: isContentValid, calories: isCaloriesValid } = formState;
  const isFormValid = useMemo(() => {
    return isDateValid && isContentValid && isCaloriesValid;
  }, [isDateValid, isContentValid, isCaloriesValid]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const [clicked, setClicked] = useState(0);
  const onDateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };
  const onMealChangeHandler = (event) => {
    dispatchFn({
      key: "meal",
      value: event.target.value,
    });

    // setRecordMeal({ ...recordMeal, meal: event.target.value });
  };
  const onContentBlurHandler = (event) => {
    dispatchFn({
      key: "content",
      value: event.target.value,
      auxValue: Number(caloriesRef.current.value),
    });

    // setRecordMeal({ ...recordMeal, content: event.target.value });
    // setIsContentValid(!!event.target.value);
  };
  const onCaloriesBlurHandler = (event) => {
    dispatchFn({
      key: "calories",
      value: Number(event.target.value),
      auxValue: contentRef.current.value,
    });

    // setRecordMeal({ ...recordMeal, calories: Number(event.target.value) });
    // setIsCaloriesValid(
    //   (!!event.target.value >= 0 && recordMeal.content !== "sport") ||
    //     (!!event.target.value < 0 && recordMeal.content === "sport")
    // );
  };
  const modalButtonsHandler = () => {
    // dispatchFn(DEFALUT_VALUE);

    closeModal();
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.formSubmit({
      date: currentDate,
      meal: mealRef.current.value,
      content: contentRef.current.value,
      calories: Number(caloriesRef.current.value),
    });

    modalButtonsHandler();
  };
  const options = (
    <>
      <option value="Breakfast">Breakfast</option>
      <option value="Lunch">Lunch</option>
      <option value="Dinner">Dinner</option>
      <option value="Snack">Snack</option>
    </>
  );
  return (
    <>
      <Modal
        style={modalStyles}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        <form className={styles.form} onSubmit={onSubmitHandler}>
          {/* <div>
        thats for button i commented
        <label>you clicked me {clicked} times</label>
      </div> */}
          <FormInput
            label="Date"
            type="date"
            id="date"
            isValid={isDateValid}
            value={currentDateStr}
            onChange={onDateChangeHandler}
          />
          <FormInput
            label="Meal"
            type="select"
            id="meal"
            children={options}
            ref={mealRef}
            onChange={onMealChangeHandler}
          />

          <FormInput
            label="Content"
            type="text"
            id="content"
            isValid={isContentValid}
            ref={contentRef}
            onBlur={onContentBlurHandler}
          />

          <FormInput
            label="Calories"
            type="number"
            id="calories"
            isValid={isCaloriesValid}
            ref={caloriesRef}
            onBlur={onCaloriesBlurHandler}
          />

          <footer>
            <button disabled={!isFormValid}>Add Record</button>
            <button
              className={styles["cancel-button"]}
              type="button"
              onClick={modalButtonsHandler}
            >
              Cancel
            </button>
          </footer>
          {/* <Button setClicked={setClicked} /> */}
        </form>
      </Modal>
      <button
        className={`${styles["track-button"]} animate__animated animate__wobble`}
        onClick={openModal}
      >
        Track food
      </button>
    </>
  );
}
export default CaloriesRecordEdit;
