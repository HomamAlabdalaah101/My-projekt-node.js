const getDb = require('../Config/dbconfig').openDb;
const dbQueries = require("./QueriesService");
const USERTBL = "Comments";
async function SaveComment(data) {
    let db = await getDb();
    let { sql, params } = dbQueries.createInsertQuery(USERTBL, data);
    await db.run(sql, params);
    await db.close();
}
async function GetAllCommentsOfADestination(destinationId) {
    let db = await getDb();
    let cms = await db.all(`SELECT cm.comment,pr.name,cm.id  FROM ${USERTBL} AS cm  INNER JOIN Persons AS pr ON cm.userId=pr.id where destinationId=?`, [destinationId]);
    await db.close();
    return cms;
}
async function GetAllComments() {
    let db = await getDb();
    let cms = await db.all(`SELECT cm.comment,pr.name,cm.id  FROM ${USERTBL} AS cm  INNER JOIN Persons AS pr ON cm.userId=pr.id `);
    await db.close();
    return cms;
}
async function DeleteComment(id) {
    let db = await getDb();
    await db.run(`DELETE FROM ${USERTBL} WHERE id=?`, [id]);
    await db.close();
}

module.exports = {
    SaveComment,
    DeleteComment,
    GetAllCommentsOfADestination,
    GetAllComments
};
