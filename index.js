// implement your API here

const express = require('express'); //1) importing express

const Users = require('./data/db') //4)<<< We'll use Hubs to get access to the database

const server = express(); //2)created server 

  
server.use(express.json());

//just a check. 
server.get("/", (req, res) => {
  res.send("Hello world, watch me learn!"); //response to send back to client
});

//1) 
server.post("/api/users", (req, res) => {
  const usersInfo = req.body
  const {name, bio} = req.body

  if(!name || !bio){
    Users.insert(usersInfo).then(users=> {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    })
  } else{
    Users.insert(usersInfo).then(users=>{
      res.status(201).json(users)
    }).catch(error=>{
      res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
  }
  
})

//2) 
server.get("/api/users", (req, res) => {
  Users.find() // find method will returns a list of users. this will return a promise so we then need .then() and .catch()
    .then(users => {
      // should return list of hubs
      res.status(200).json(users); // the client will react to HTTP status code added to .status()
      //.json will convert of try to convert the data passed to JSON
      //tells the client we're sending JSON through a HTTP Header
    })
    .catch(error => {
      res.status(500).json({ message: "errors list in users" });
      // going to return 500 status and return json message
    });
});
//get user by id
//3) 
server.get("/api/users/:id", (req, res) =>{
  const {id} = req.params
  console.log(res)
  if(!id){
    Users.findById(id)
    .then(userIds => {
      res
        .status(404)
        .json({
          message: "The user with the specified ID does not exist."
        });
    })
  } else{
    Users.findById(id)
    .then(usersIds=> {
      res.status(201).json(usersIds);
    })
  }
})

//4)
server.delete("/api/users/:id", (req, res) => {
  const {id}= req.params
  if(!id){
    Users.remove(id).then( usersId => {
      res.status(404).json({ message: "The user with the specified ID does not exist."})
    })
  } else{
    Users.remove(id).then( usersId => {
      res.status(200).json(usersId)
    }).catch(error => {
      res.status(500).json({ error: "The user could not be removed" })
    })
  } 
})

//5)
server.put("/api/users/:id", (req, res) => {
  const {id} = req.params
  const user = req.body
  const {name, bio} = req.body
  if(!id){
    Users.update(id, user).then(usersID =>{
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    })
  }else if(!name || !bio){
    Users.update(id, user).then(usersID =>{
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    })}else{
      Users.update(id, user).then(usersID => {
        res.status(200).json(usersID)
      }).catch(error =>{
        res.status(500).json({ error: "The user information could not be modified." })
      })
    }

}) 

const port= 8001; //3)server will listen on this port
server.listen(port, ()=> console.log('\n, hey beautiful, api is running\n'));
