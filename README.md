
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://discordanc3.herokuapp.com/discover">
    <img src="./site-images/logo.png" alt="Logo" style="background-color:white">
  </a>

  <h3 align="center">Discordanc3</h3>

  <p align="center">
    Discordance is a clone of Discord. Whether you’re part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Discordance makes it easy to talk every day and hang out more often. Discordance servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
    <br />
    <a href="https://github.com/nkuek/discordance"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="hhttps://discordanc3.herokuapp.com/discover">View Site</a>
    ·
    <a href="https://github.com/nkuek/discordance/issues">Report Bug</a>
    ·
    <a href="https://github.com/nkuek/discordance/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[Click here to view Discordanc3 live on the web!](https://discordanc3.herokuapp.com/discover)
<br>
</br>
![homepage-screenshot](site-images/homepage.png)

## Overall Structure

### Back End
The app was built using Flask, SQLAlchemy, Python, and Sockets(python-socketio) on the back end with a PostgreSQL database. The backend structure is RESTful API. Model associations are used to minimize database queries to the backend, assuring speed and reliability.

### Front End
The front end is built with React and Javascript while utilizing Redux architecture, producing a lightning-fast user interface and calling upon dynamically rendered components.

### Built With

* [React](https://reactjs.org/)
* [JavaScript](https://www.javascript.com/)
* [Python](https://docs.python.org/3/)
* [Redux](https://redux.js.org/)
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
* [PostgreSQL](https://www.postgresql.org/docs/current/)
bcryptjs)
* [SocketIO](https://python-socketio.readthedocs.io/en/latest/)
* [CSS](http://www.css3.info/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Here is everything we need you to do to get started with Discordanc3.

### Installation

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/nkuek/discordance.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


<!-- USAGE EXAMPLES -->
## Usage
### An easy-to-use login with a pre-configured Demo User.
![Login](site-images/login.png)
### Search Servers by Category through the search bar on the top middle or the discover section on the left side.
![Search for Servers](site-images/category.png)
### Create Servers.
![Servers](site-images/createServer.png)
### Edit or Delete Servers.
![Servers](site-images/editServers.png)
### Create Channels.
![My Channels](site-images/channelCreation.png)
### Edit or Delete Channels.
![My Channels](site-images/editChannel.png)
### Edit Profile Image.
![My Profile Image](site-images/editprofileimage.png)
### Edit or Delete chat messages.
![Chat](site-images/editChat.png)
### Like chat messages.
![Chat](site-images/likeChat.png)
### Add Emojies.
![Chat](site-images/emojies.png)


## Obstacles

### Python-SocketIO
Discordanc3 utilizes Python-SocketIO to keep a running server between the back-end and front-end so chat messages can update live for all chat users.

### AWS
Discordanc3 utilizes AWS to allow users to upload server and profile images.

<!-- ROADMAP -->
## Roadmap

See the [Project Wiki](https://github.com/nkuek/discordance/wiki) for more details about Discordanc3.

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- CONTACT -->
## Contact & Acknowledgements


* Yassine Cherradi - [LinkedIn](https://www.linkedin.com/in/yassine-cherradi-035784101/) - [GitHub](https://github.com/ycherradi)

* Nick Kuek - [LinkedIn]() - [GitHub](https://github.com/nkuek)

* Hussein Eid - [LinkedIn]() - [GitHub](https://github.com/husseineid-mocha)

* Leonardo Hernandez - [LinkedIn]() - [GitHub](https://github.com/leoworkcp)


Project Link: [https://github.com/nkuek/discordance](https://github.com/nkuek/discordance)


<!-- ACKNOWLEDGEMENTS -->

