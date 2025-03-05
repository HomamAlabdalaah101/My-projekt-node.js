const getDb = require('../Config/dbconfig').openDb;
const dbQueries = require("./QueriesService");
const encService = require('./EncryptionService');
const USERTBL = "Persons";
async function SaveUser(data) {
    let db = await getDb();
    let pw = await encService.encryptPassword(data.password);
    let obj = {
        username: data.username,
        password: pw,
        name:data.name,
        email: data.email
    };
    let query = dbQueries.createInsertQuery(USERTBL, obj);
    console.log(query);
    await db.run(query);
    await db.close();
}
async function AuthUser(username) {
    try {
        let db = await getDb();
        let user = await db.get(`SELECT * FROM ${USERTBL} WHERE username='${username}';`);
        await db.close();
        return user;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
async function GetAllUsers() {
    let db = await getDb();
    let users = await db.all(`SELECT * FROM ${USERTBL}`);
    await db.close();
    return users;
}

async function DeleteUser(id) {
    let db = await getDb();
    await db.run(`DELETE FROM ${USERTBL} WHERE id=${id}`);
    await db.close();
}
async function UpdateUser(data) {
    let db = await getDb();
    let query = dbQueries.createUpdateQuery(USERTBL, data);
    console.log(query);
    await db.run(query);
    await db.close();
}
async function CheckIfUsernameExists(username) {
    try {
        let db = await getDb();
        let item = await db.get(`SELECT * FROM ${USERTBL} WHERE username='${username}';`);
        await db.close();
        if (item) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.log(err);
        return true;
    }
}
async function GetUserById(id) {
    try {
        let db = await getDb();
        let user = await db.get(`SELECT * FROM ${USERTBL} WHERE id=${id};`);
        await db.close();
        return user;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
module.exports = {
    SaveUser,
    AuthUser,
    CheckIfUsernameExists,
    UpdateUser,
    DeleteUser,
    GetAllUsers,
    GetUserById
};