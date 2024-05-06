import { createContext, useState } from "react";
import { getDateFromString } from "./utils";
export const AppContext = createContext({
  currentDate: new Date(),
  setCurrentDate: (val) => {},
  totalCalories: 0,
  setTotalCalories: (val) => {},
  currentDateStr: "",
  isDateValid: false,
});
function AppContextProvider(props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { children } = props;
  const updateCurrentDate = (val) => {
    setCurrentDate(getDateFromString(val));
  };
  // const currentDateStr = !!currentDate
  //   ? currentDate.toISOString().split("T")[0]
  //   : "";
  const currentDateStr = !!currentDate
    ? currentDate.getFullYear() +
      "-" +
      ("0" + (currentDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + currentDate.getDate()).slice(-2)
    : "";

  return (
    <AppContext.Provider
      value={{
        currentDate,
        setCurrentDate: updateCurrentDate,
        currentDateStr,
        isDateValid: !!currentDateStr,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default AppContextProvider;
