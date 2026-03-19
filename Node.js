// server.js
const express = require("express");
const app = express();

let sessions = {};

app.get("/start", (req,res)=>{
  let token = Math.random().toString(36).substring(2);

  sessions[token] = {
    start: Date.now(),
    verified: false
  };

  res.json({token});
});

app.get("/verify", (req,res)=>{
  let token = req.query.token;

  if(!sessions[token]){
    return res.json({ok:false});
  }

  let diff = (Date.now() - sessions[token].start)/1000;

  if(diff >= 2){
    sessions[token].verified = true;
    return res.json({ok:true});
  }

  res.json({ok:false});
});

app.listen(3000);
