const express = require("express");
const pool = require("./db");

const cors = require("cors");

const app = express();

const port = 5000;

app.use(cors());

app.get("/employees", async (req, res) => {
  try {
    const employeesData = await pool.query(
      ` SELECT employee.id, employee.name, employee.age, 
             address.state, address.city, address.houseno
      FROM employee
      JOIN address ON employee.address_id = address.id`
    );
    res.json(employeesData?.rows);
  } catch (error) {
    console.log("error", error);
  }
});

app.listen(port, () => {
  console.log("listning on port", port);
});
