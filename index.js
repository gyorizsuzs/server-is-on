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

/* const getStatus = (req, res) => { */
/* const status = req.params.status; */
/*   const active = students.find((el) => el.status === true);
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
}; */

const getStatus = (req, res) => {
  let status;
  if (req.params.status === "active") {
    status = true;
  } else if (req.params.status === "finished") {
    status = false;
  } else {
    res.send("Status is not found!");
    return null;
  }
  const file = __dirname + "/data/students.json";
  fs.readFile(file, (err, data) => {
    const students = JSON.parse(data);
    res.setHeader("content-type", "application/json");
    if (err) throw err;
    const isActive = students.filter((student) => {
      return student.status === status;
    });
    res.send(isActive);
  });
};

const createStudent = (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    status: true,
  };
  /* const newName = Object.assign({ name: newStudent }, req.body); */

  students.push(newStudent);

  fs.writeFile(
    `${__dirname}/data/students.json`,
    JSON.stringify(students),
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send({
          status: "created",
        });
      }
    }
  );
};

// HANDLERS

app.get("/", getAllStudents);
app.get("/api/students", getStudent);
app.get("/api/students/:id", getId);
app.get("/api/status/:status", getStatus);
app.post("/api/students", createStudent);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
