const express = require('express');
const app = express();
const fs = require("fs"); //FILE SYSTEM
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World! It\'s Codecool!')
});

app.get('/api/students', (req, res) => { //a megadott json filet akarjuk vele beolvastatni a bongeszoben
    const file = __dirname + "/data/students.json";
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        res.setHeader("content-type", "application/json");
        res.send(data);
      });      
});

app.get('/api/students/:id', (req, res) => {
  const id = req.params.id;
  const file = __dirname + "/data/students.json";
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    const students = JSON.parse(data); //creating object
    res.setHeader("content-type", "application/json");
    const student = students.find(student => student.id == id); 
    console.log(students[0]);
    console.log(typeof id);

    res.send(student);
  }); 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});