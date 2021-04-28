# 🎶👫Beats by friends/with friends👫🎶

Welcome to beats by friends, a web application which makes it possible to create beats with your friends. Samples get added to a loop that keeps repeating over and over. This way you can create a simple beat together with your friends. 

![Beats by friendz](https://user-images.githubusercontent.com/33430669/116426681-9e79f500-a843-11eb-9454-a3832aceb5a7.jpg)


## 👨‍💻Installation👩‍💻

To install this project you will need a version of npm and node. 

The command for installing this project is:

```bash
npm install
```

For running the project in production mode use the following command:

```bash
npm run start
```

For running the project in development mode (using nodemon for server restart on save) use the following command:

```bash
npm run dev
```

## Data lifecycle

![image](https://user-images.githubusercontent.com/33430669/116135716-b92c5c80-a6d1-11eb-9311-a0baa93c951f.png)

## Features

### 🔃Music loop🔃
- Music loop of 4/4 rythm
- Remove things from loop
- Let people work together on a piece
- Add bpm/tempo modifier

### 🎸Jam room🎸
- Create jam room
- Join jam room

## 📃Research📃

- Look at [tone.js](https://tonejs.github.io/)

## 🔗Sockets and realtime🔗

Before starting this project, my knowledge on sockets did not exist. The flow of working with sockets is something to get used to since there is a lot of back and forth logic  that goes into using these. For sockets I used the package: [socket io](https://socket.io/). A socket is basically the bridge that connects the server and the client in real time which then allows users to send updates on the client to the server and the server to send updates to all the connected clients. 

## 💾Mongodb + mongoose💾

This application also makes use of mongoose and mongodb to store the data of the jam rooms. I would've liked to do more with mongo db for example, using GridFS for storing music samples and the beats created in a room. 

## 📃Resources📃

- [Piano song recorder by youtuber: WebDevSimplified](https://github1s.com/WebDevSimplified/Piano-Song-Recorder/blob/HEAD/public/styles.css)
- [Create a guitar recorder](https://bobrov.dev/blog/web-audio-for-electric-guitar-how-to-connect-instrument/)
- [How to record and play in javascript](https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b)
