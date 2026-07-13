const getDb = require('../Config/dbconfig').openDb;
const dbQueries = require("./QueriesService");
const USERTBL = "Destinations";
async function SaveDestination(data, image) {
    let db = await getDb();
    let obj = {
        name: data.name,
        country: data.country,
        image: image,
        description: data.description,
    };
    let { sql, params } = dbQueries.createInsertQuery(USERTBL, obj);
    await db.run(sql, params);
    await db.close();
}
async function GetSingleDestination(id) {
    try {
        let db = await getDb();
        let des = await db.get(`SELECT * FROM ${USERTBL} WHERE id=?;`, [id]);
        await db.close();
        return des;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
async function GetAllDestinations() {
    let db = await getDb();
    let des = await db.all(`SELECT * FROM ${USERTBL}`);
    await db.close();
    return des;
}
async function DeleteDestination(id) {
    let db = await getDb();
    await db.run(`DELETE FROM ${USERTBL} WHERE id=?`, [id]);
    await db.close();
}
async function UpdateDestination(data, image) {
    let obj = {
        id: data.id,
        name: data.name,
        country: data.country,
        description: data.description
    };
    if (image) {
        obj.image = image;
    }
    let db = await getDb();
    let { sql, params } = dbQueries.createUpdateQuery(USERTBL, obj);
    await db.run(sql, params);
    await db.close();
}
module.exports = {
    SaveDestination,
    GetSingleDestination,
    UpdateDestination,
    DeleteDestination,
    GetAllDestinations
};
