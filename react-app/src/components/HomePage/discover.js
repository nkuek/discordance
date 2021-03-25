import React from 'react';

import { useHistory } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SchoolIcon from '@material-ui/icons/School';
import RadioOutlinedIcon from '@material-ui/icons/RadioOutlined';
import ImportantDevicesOutlinedIcon from '@material-ui/icons/ImportantDevicesOutlined';
import Divider from '@material-ui/core/Divider';

import './Homepage.css';

function Discover() {
    const history = useHistory();

    function homeButton() {
        history.push('/');
    }
    function gameButton() {
        history.push('/gaming');
    }

    function musicButton() {
        history.push('/music');
    }

    function eduButton() {
        history.push('/education');
    }

    function techButton() {
        history.push('/science&tech');
    }

    function enterButton() {
        history.push('/entertainment');
    }

    return (
        <>
            <div className="categories-main-container">
                <h1 className="discover-title"> Discover </h1>
                <Divider light />
                <div className="categories-button__home">
                    <IconButton
                        className="home-icon categories"
                        onClick={homeButton}
                        fontSize="small"
                    >
                        <HomeIcon />
                        <td>Home</td>
                    </IconButton>
                </div>
                <div className="categories-button__gaming">
                    <IconButton
                        className="home-icon categories"
                        onClick={gameButton}
                        fontSize="small"
                    >
                        <SportsEsportsIcon />
                        <td>Gaming</td>
                    </IconButton>
                </div>
                <div className="categories-button__music">
                    <IconButton
                        className="home-icon categories"
                        onClick={musicButton}
                        fontSize="small"
                    >
                        <MusicNoteIcon />

                        <td>Music</td>
                    </IconButton>
                </div>
                <div className="categories-button__education">
                    <IconButton
                        className="home-icon categories"
                        onClick={eduButton}
                        fontSize="small"
                    >
                        <SchoolIcon />

                        <td>Education</td>
                    </IconButton>
                </div>
                <div className="categories-button__tech">
                    <IconButton
                        className="home-icon categories"
                        onClick={techButton}
                        fontSize="small"
                    >
                        <ImportantDevicesOutlinedIcon />

                        <td>Science&Tech</td>
                    </IconButton>
                </div>
                <div className="categories-button__enter">
                    <IconButton
                        className="home-icon categories"
                        onClick={enterButton}
                        fontSize="small"
                    >
                        <RadioOutlinedIcon />
                        <td>Entertainment</td>
                    </IconButton>
                </div>
            </div>
        </>
    );
}

export default Discover;
