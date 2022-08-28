// MODULES

const express = require("express");
const app = express();
const fs = require("fs"); //FILE SYSTEM
const port = 3000;

app.use(express.json());

// ROUTES

const students = JSON.parse(fs.readFileSync(`${__dirname}/data/students.json`));

const getAllStudents = (req, res) => {
  res.status(200).json({
    status: "success",
    results: students.length,
    data: {
      students,
    },
  });
};

const getStudent = (req, res) => {
  /*   const file = __dirname + "/data/students.json";
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    res.setHeader("content-type", "application/json");
    res.send(data);
  });
}; */
  res.status(200).json({
    status: "success",
    results: students.length,
    data: {
      students,
    },
  });
};

const getId = (req, res) => {
  const id = req.params.id;
  const file = __dirname + "/data/students.json";
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    const students = JSON.parse(data); //creating object
    res.setHeader("content-type", "application/json");
    const student = students.find((student) => student.id == id);
    /*  console.log(students[0]);
    console.log(typeof id); */

    res.send(student);
  });
};

const getStatus = (req, res) => {
  /* const status = req.params.status; */
  const active = students.find((el) => el.status === true);
  const finished = students.find((el) => el.status === false);

  if (req.params.status === true) {
    return res.status(200).json({
      status: active,
      message: "Student is active",
    });
  } else {
    return res.status(200).json({
      status: finished,
      message: "Student has finished",
    });
  }
};

const createStudent = (req, res) => {
  const newStudent = students[students.lenght + 1];
  /* const newName = Object.assign({ name: newName }, req.body); */

  students.push(newStudent);

  fs.writeFile(
    `${__dirname}/data/students.json`,
    JSON.stringify(students),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          newStudent,
        },
      });
      res.send(student);
    }
  );
};

// HANDLERS

app.get("/", getAllStudents);
app.get("/api/students", getStudent);
app.get("/api/students/:id", getId);
app.get("/api/students/:status", getStatus);
app.post("/api/students", createStudent);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
