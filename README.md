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

**To Database**

**From Database**

**To Server**
- Room creation request


**From Server**
- Room gets created
- share Button generated server side with room id

**To client**

**from client**

- Create room input
- input share button (main url with room id to clipboard)
- 




- User comes on website

- Room is created with id
- Share id with friend
- Friend joins beatroom
- User
- 

[insert dataflow img]

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