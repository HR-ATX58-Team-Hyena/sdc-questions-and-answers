const { Client } = require("pg");
const fs = require("fs");
const fastcsv = require("fast-csv");
const config = require("./config.js");

const client = new Client(config);
