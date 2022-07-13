import { React } from "react";
import "./css/LandingPage.css";
import { NavBar } from "../components/nav-bar";
import { Introduction } from "../components/Introduction";
import { PersonalAchievements } from "../components/PersonalAchievements";
import { Tools } from "../components/Tools";
import { BriefIntro } from "../components/briefIntro";
import { MyWorks } from "../components/myWorks";
import { MyUIWorks } from "../components/myWorksUI";
import { AboutMe } from "../components/aboutMe";
import { ContactMe } from "../components/contactMe";
import { WallOfGraphics } from "../components/WallOfGraphics";
export const LandingPage = () => {
  return (
    <>
      <div className="components-merge">
        <div className="top-content">
          <div className="nav-contents">
            <NavBar />
          </div>
          <div className="intro-contnts">
            <Introduction />
          </div>
          <div className="brief-intro">
            <BriefIntro />
          </div>
        </div>
        <div className="works-one">
          <MyWorks />
        </div>
        <div className="works-two">
          <MyUIWorks />
        </div>
        <div className="about-me">
          <AboutMe />
        </div>
        <div className="contact-info">
          <ContactMe />
        </div>
        <div className="graphics-wall">
          <WallOfGraphics />
        </div>
        <div className="achieve-contnts">
          <PersonalAchievements />
        </div>
        <div className="tools-used">
          <Tools />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
