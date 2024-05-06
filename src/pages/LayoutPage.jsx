import { Outlet } from "react-router-dom";
import styles from "./LayoutPage.module.css";
import AppContextProvider from "../AppContext";

function LayoutPage() {
  return (
    <AppContextProvider>
      <div className={styles.layout}>
        {/* <SideNav /> */}
        <div className={styles["content-wrapper"]}>
          <Outlet />
        </div>
      </div>
    </AppContextProvider>
  );
}
export default LayoutPage;
