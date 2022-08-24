const express = require('express');
const app = express();
const fs = require("fs"); //FILE SYSTEM
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World! It\'s Codecool!')
});

app.get('/students', (req, res) => { //a megadott json filet akarjuk vele beolvastatni a bongeszoben
    const file = __dirname + "/data/students.json";
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        res.setHeader("content-type", "application/json");
        res.send(data);
      });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});