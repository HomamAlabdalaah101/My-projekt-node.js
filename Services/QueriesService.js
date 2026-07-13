// Baut parametrisierte Queries (Platzhalter "?") statt Werte in den SQL-String
// zu interpolieren -> verhindert SQL-Injection über Nutzereingaben.
function createInsertQuery(tableName, data) {
  let cols = [];
  let placeholders = [];
  let params = [];
  for (const key in data) {
    if ((data.hasOwnProperty(key) && data[key]) || (typeof data[key] == "boolean")) {
      cols.push(key);
      placeholders.push("?");
      params.push(data[key]);
    }
  }
  return {
    sql: `INSERT INTO ${tableName} (${cols.join(",")}) VALUES (${placeholders.join(",")})`,
    params
  };
}
function createUpdateQuery(tableName, data) {
  let setClauses = [];
  let params = [];
  for (const key in data) {
    if ((data.hasOwnProperty(key) && data[key] && key != "_id" && key != "id") || (typeof data[key] == "boolean")) {
      setClauses.push(`${key}=?`);
      params.push(data[key]);
    }
  }
  const id = data.id || data._id;
  params.push(id);
  return {
    sql: `UPDATE ${tableName} SET ${setClauses.join(",")} WHERE id=?`,
    params
  };
}
module.exports = {
  createInsertQuery,
  createUpdateQuery
};
