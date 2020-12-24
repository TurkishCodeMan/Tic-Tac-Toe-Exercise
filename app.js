const express=require("express");
const app=express();
const http = require("http").createServer(app)

const socketApi = require("./socket");

socketApi.io.attach(http);

http.listen(3000,(err)=>{
    if (err) throw err;

    console.log("Listening on port 3000");
})