import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./Developers.css";
import husseinpic from "./husseinpic.jpeg";
import leopic from "./leopic.jpeg";
import nickpic from "./nickpic.jpg";
import yassinepic from "./yassinepic.jpeg";
const Developers = () => {
  return (
    <div>
      <div className="developer__title">
        <h1>Developers</h1>
      </div>
      <div className="developers__page--container">
        <div>
          <div className="developer__image--outerContainer">
            <div className="developer__image--container">
              <img className="developer__image" src={nickpic} />
            </div>
            <h2>Nick Kuek</h2>
            <h5>Full-stack Web Developer</h5>
            <div className="link__logo">
              <div className="link__logo1">
                <a href="https://www.linkedin.com/in/nick-kuek" target="_blank">
                  <LinkedInIcon style={{ color: "white" }} />
                </a>
              </div>
              <div className="link__logo2">
                <a href="https://github.com/nkuek" target="_blank">
                  <GitHubIcon style={{ color: "white" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="developer__image--outerContainer">
            <div className="developer__image--container">
              <img className="developer__image" src={husseinpic} />
            </div>
            <h2>Hussein Eid</h2>
            <h5>Full-stack Web Developer</h5>
            <div className="link__logo">
              <div className="link__logo1">
                <a
                  href="https://www.linkedin.com/in/hussein-eid/"
                  target="_blank"
                >
                  <LinkedInIcon style={{ color: "white" }} />
                </a>
              </div>
              <div className="link__logo2">
                <a href="https://github.com/husseineid-mocha" target="_blank">
                  <GitHubIcon style={{ color: "white" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="developer__image--outerContainer">
            <div className="developer__image--container">
              <img className="developer__image" src={leopic} />
            </div>
            <h2>Leonardo Hernandez</h2>
            <h5>Full-stack Web Developer</h5>
            <div className="link__logo">
              <div className="link__logo1">
                <a href="https://www.linkedin.com/in/leorem/" target="_blank">
                  <LinkedInIcon style={{ color: "white" }} />
                </a>
              </div>
              <div className="link__logo2">
                <a href="https://github.com/leoworkcp" target="_blank">
                  <GitHubIcon style={{ color: "white" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="developer__image--outerContainer">
            <div className="developer__image--container">
              <img className="developer__image" src={yassinepic} />
            </div>
            <h2>Yassine Cherradi</h2>
            <h5>Full-stack Web Developer</h5>
            <div className="link__logo">
              <div className="link__logo1">
                <a
                  href="https://www.linkedin.com/in/yassine-cherradi-035784101/"
                  target="_blank"
                >
                  <LinkedInIcon style={{ color: "white" }} />
                </a>
              </div>
              <div className="link__logo2">
                <a href="https://github.com/ycherradi/" target="_blank">
                  <GitHubIcon style={{ color: "white" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
