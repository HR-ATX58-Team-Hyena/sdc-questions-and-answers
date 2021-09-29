const { Client } = require("pg");
const fs = require("fs");
const fastcsv = require("fast-csv");

const client = new Client({
  host: "localhost",
  user: "postgres",
  database: "q_a",
  password: "password",
  port: 5432,
});
