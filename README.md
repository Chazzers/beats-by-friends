# Beats by friends/with friends

Welcome to beats by friends, a web application which makes it possible to create beats with your friends. Samples get added to a loop that keeps repeating over and over. This way you can create a simple beat together with your friends. 

[instert img]

## Installation

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


1. User creates a room
2. Post room to database

Join a room
Load
1. Find all rooms on home
2. Click on join room
3. Enter username
4. Socket connects to room
5. on connection server will emit event to get room id
6. client gets room id from url
7. emits the room id to the server
8. When the room id has been received the server will send the bpm, the users and all checked checkboxes to the connected clients
Click audioCheckbox
1. When an audio checkbox is checked send the checked checkbox to the surver
2. The current room in the database will be updated with the checked checkbox
3. The room's checkboxes are sent to all the connected clients


## Features

**Samples**
- Upload samples
- Send your sample to server
- Save uploaded samples in database or on server...

**Beats**
- Save created beat

### Real Time (sockets)

**Music loop**
- Music loop of 4/4 rythm
- Remove things from loop
- Let people work together on a piece
- Add bpm/tempo modifier

**Jam room**
- Create jam room
- Join jam room

#### Real time Optional

- Sample creation tool
- Send your sample to server realtime through your mic
- Freestyle with an instrument realtime through your mic
	- Through amp or whatever... (need some research on this probably)
	- Record button etc.

## Research

- Look at [tone.js](https://tonejs.github.io/)


## Resources

- [Piano song recorder by youtuber: WebDevSimplified](https://github1s.com/WebDevSimplified/Piano-Song-Recorder/blob/HEAD/public/styles.css)
- [Create a guitar recorder](https://bobrov.dev/blog/web-audio-for-electric-guitar-how-to-connect-instrument/)
- [How to record and play in javascript](https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b)
