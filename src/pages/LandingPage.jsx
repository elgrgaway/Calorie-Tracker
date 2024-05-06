import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <>
      <p>Welcome to Calorie Tracker App</p>
      {/* <a href="/Tracker-page">Get Started 😁</a> */}
      <Link to="/Tracker-page">Get Started 😁</Link>
    </>
  );
}
