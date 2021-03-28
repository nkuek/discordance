import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import './Developers.css';

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
                            <img
                                className="developer__image"
                                src="https://discordance.s3.amazonaws.com/e900e53e5c504fc69df4c2ed3220fdc7.jpeg"
                            />
                        </div>
                        <h2>Nick Kuek</h2>
                        <h5>Full-stack Web Developer</h5>
                        <div className="link__logo">
                            <div className="link__logo1">
                                <a
                                    href="https://www.linkedin.com/in/nick-kuek"
                                    target="_blank"
                                >
                                    <LinkedInIcon style={{ color: 'white' }} />
                                </a>
                            </div>
                            <div className="link__logo2">
                                <a
                                    href="https://github.com/nkuek"
                                    target="_blank"
                                >
                                    <GitHubIcon style={{ color: 'white' }} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="developer__image--outerContainer">
                        <div className="developer__image--container">
                            <img
                                className="developer__image"
                                src="https://discordance.s3.amazonaws.com/00dc996ee8384106907332019151024b.png"
                            />
                        </div>
                        <h2>Hussein Eid</h2>
                        <h5>Full-stack Web Developer</h5>
                        <div className="link__logo">
                            <div className="link__logo1">
                                <a
                                    href="https://www.linkedin.com/in/hussein-eid/"
                                    target="_blank"
                                >
                                    <LinkedInIcon style={{ color: 'white' }} />
                                </a>
                            </div>
                            <div className="link__logo2">
                                <a
                                    href="https://github.com/husseineid-mocha"
                                    target="_blank"
                                >
                                    <GitHubIcon style={{ color: 'white' }} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="developer__image--outerContainer">
                        <div className="developer__image--container">
                            <img
                                className="developer__image"
                                src="https://discordance.s3.amazonaws.com/8f1011ba09c645e0a2aac70e92831bef.jpeg"
                            />
                        </div>
                        <h2>Leonardo Hernandez</h2>
                        <h5>Full-stack Web Developer</h5>
                        <div className="link__logo">
                            <div className="link__logo1">
                                <a
                                    href="https://www.linkedin.com/in/leorem/"
                                    target="_blank"
                                >
                                    <LinkedInIcon style={{ color: 'white' }} />
                                </a>
                            </div>
                            <div className="link__logo2">
                                <a
                                    href="https://github.com/leoworkcp"
                                    target="_blank"
                                >
                                    <GitHubIcon style={{ color: 'white' }} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="developer__image--outerContainer">
                        <div className="developer__image--container">
                            <img
                                className="developer__image"
                                src="https://discordance.s3.amazonaws.com/76fd8921297b4c05b0560b365495ee2f.jpeg"
                            />
                        </div>
                        <h2>Yassine Cherradi</h2>
                        <h5>Full-stack Web Developer</h5>
                        <div className="link__logo">
                            <div className="link__logo1">
                                <a
                                    href="https://www.linkedin.com/in/yassine-cherradi-035784101/"
                                    target="_blank"
                                >
                                    <LinkedInIcon style={{ color: 'white' }} />
                                </a>
                            </div>
                            <div className="link__logo2">
                                <a
                                    href="https://github.com/ycherradi/"
                                    target="_blank"
                                >
                                    <GitHubIcon style={{ color: 'white' }} />
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
