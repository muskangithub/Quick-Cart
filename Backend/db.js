const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "muskan",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "quickcart",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
});

// const createTables = async () => {
//   try {
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS address (
//         id SERIAL PRIMARY KEY,
//         state VARCHAR(100) NOT NULL,
//         city VARCHAR(100) NOT NULL,
//         houseno VARCHAR(50) NOT NULL
//       );

//       CREATE TABLE IF NOT EXISTS employee (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         age INT NOT NULL,
//         address_id INT UNIQUE REFERENCES address(id) ON DELETE CASCADE
//       );
//     `);
//     console.log("Tables created successfully!");
//   } catch (err) {
//     console.error("Error creating tables:", err);
//   } finally {
//     pool.end();
//   }
// };

// createTables();

// const insertData = async () => {
//   try {
//     // Insert data into address table
//     const addressResult = await pool.query(`
//       INSERT INTO address (state, city, houseno)
//       VALUES
//       ('California', 'Los Angeles', '123A'),
//       ('Texas', 'Houston', '456B'),
//       ('New York', 'New York City', '789C')
//       RETURNING id;
//     `);

//     const addressIds = addressResult.rows.map((row) => row.id);

//     // Insert data into employee table
//     await pool.query(`
//       INSERT INTO employee (name, age, address_id)
//       VALUES
//       ('Alice Johnson', 30, ${addressIds[0]}),
//       ('Bob Smith', 25, ${addressIds[1]}),
//       ('Charlie Brown', 28, ${addressIds[2]});
//     `);

//     console.log("Data inserted successfully!");
//   } catch (err) {
//     console.error("Error inserting data:", err);
//   } finally {
//     pool.end();
//   }
// };

// insertData();

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Database connection error", err));

module.exports = pool;
