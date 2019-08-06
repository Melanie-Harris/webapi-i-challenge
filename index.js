// implement your API here

const express = require('express'); //importing express

const Hubs = require('./data/hubs-model.js') //<<< We'll use Hubs to get access to the database

const server = express(); //created server 

  
server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello web 20.75"); //response to send back to client
});

server.get("/hubs", (req, res) => {
  Hubs.find() // find method will returnalist of hubs. this will return a promise so we then need .then() and .catch()
    .then(hubs => {
      // should return list of hubs
      res.status(200).json(hubs); // the client will react to HTTP status code added to .status()
      //.json will convert of try to convert the data passed to JSON
      //tells the client we're sending JSON through a HTTP Header
    })
    .catch(error => {
      res.status(500).json({ message: "errors list in hubs" });
      // going to return 500 status and return json message
    });
});

const port= 8001; //server will listen on this port
server.listen(port, ()=> console.log('\n, hey beautiful, api is running\n'));
