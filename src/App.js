import { React, useState, useEffect } from "react";
import { LandingPage } from "./pages/LandingPage";
import "./App.css";

function App() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 4000);
  }, []);
  if (loader) {
    return (
      <>
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <LandingPage />
        </div>
      </>
    );
  }
}

export default App;
