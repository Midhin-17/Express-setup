console.log("express setup");

const express = require('express')
const app = express()
const PORT= 4000;

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(4000,() => console.log(` Listening on the ${PORT}`));