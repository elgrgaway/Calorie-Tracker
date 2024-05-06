/* eslint-disable */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { TrackerPage } from "./pages/TrackerPage";
import LayoutPage from "./pages/LayoutPage";
import { ErrorPage } from "./pages/ErrorPage";
import { Detailpage } from "./pages/DetailPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <TrackerPage />,
      },
      // {
      //   path: "Tracker-page/:recordId",
      //   element: <Detailpage />,
      // },
    ],
  },
]);
function App(errorElement) {
  return <RouterProvider router={router} />;
}

export default App;
