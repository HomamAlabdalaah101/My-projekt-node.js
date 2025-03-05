const sqlite3 = require('sqlite3');
const sqlwrap = require('sqlite');
const dbpath = "database.db";
// you would have to import / invoke this in another file
async function openDb() {
  let db = await sqlwrap.open({
    filename: dbpath,
    driver: sqlite3.Database
  });
  return db;
}
async function initDB() {
  await createUserTable();
  await createDestinationsTable();
  await createCommentsTable();
}
async function createUserTable() {
  let db = await openDb();
  let query = `CREATE TABLE Persons (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name varchar(500) NOT NULL,
    username varchar(500) NOT NULL,
    email varchar(500) NOT NULL,
    password varchat(500) NOT NULL,
    type varchar(100) NULL
);`;
  await db.exec(query);
  await db.close();
}
async function createDestinationsTable() {
  let db = await openDb();
  let query = `CREATE TABLE Destinations (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name varchar(1000) NOT NULL,
    country varchar(500) NOT NULL,
    description varchar(1000) NOT NULL,
    image varchar(500) NOT NULL
);`;
  await db.exec(query);
  await db.close();
}
async function createCommentsTable() {
  let db = await openDb();
  let query = `CREATE TABLE Comments (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    comment varchar(1000) NOT NULL,
    userId INTEGER NOT NULL,
    destinationId INTEGER NOT NULL
);`;
  await db.exec(query);
  await db.close();
}
module.exports = {
  openDb,
  initDB
};