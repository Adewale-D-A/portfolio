import React from "react";
import Typical from "react-typical";
import "./css/Introduction.css";
import adewale from "../staticIMG/image2.png";
import certification from "../staticIMG/Certification.jpg";

export const Introduction = () => {
  return (
    <>
      <div className="intro-content">
        <div className="header-content">
          <div>
            <img src={adewale} alt="img" className="image" />
          </div>
        </div>
        <div className="typical-content">
          <div>
            <div className="cerfication-cont">
              <div>
                <img src={certification} alt="img" className="cetificate" />
              </div>
              <div>
                <img src={certification} alt="img" className="cetificate" />
              </div>
              <div>
                <img src={certification} alt="img" className="cetificate" />
              </div>
            </div>
            <div>
              <p>
                I am
                <Typical
                  loop={Infinity}
                  wrapper="b"
                  steps={[
                    " Front End Web Developer",
                    5000,
                    " a Cloud Developer",
                    5000,
                    " Software Engineer",
                    5000,
                    " UI Designer",
                    5000,
                  ]}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduction;
