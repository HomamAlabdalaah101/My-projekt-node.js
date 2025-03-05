function createInsertQuery(tableName, data) {
  let cols = "(";
  let vals = "(";
  for (const key in data) {
    if ((data.hasOwnProperty(key) && data[key]) || (typeof data[key] == "boolean")) {
      const value = data[key];
      cols += `${key},`;
      let type = typeof value;
      if (type == "string") {
        vals += `'${value}',`;
      }
      else {
        vals += `${value},`;

      }
    }
  }
  cols = cols.substring(0, cols.length - 1);
  vals = vals.substring(0, vals.length - 1);
  cols += ")";
  vals += ")";
  return `INSERT INTO ${tableName} ${cols} VALUES ${vals}`;
}
function createUpdateQuery(tableName, data) {
  let updateCols = "";
  for (const key in data) {
    if ((data.hasOwnProperty(key) && data[key] && key != "_id" && key != "id") || (typeof data[key] == "boolean")) {
      updateCols += `${key}=`;
      const value = data[key];
      let type = typeof value;
      if (type == "string") {
        updateCols += `'${value}',`;
      }
      else {
        updateCols += `${value},`;
      }
    }
  }
  updateCols = updateCols.substring(0, updateCols.length - 1);
  if (data.id) {
    return `UPDATE ${tableName} SET ${updateCols} WHERE id=${data.id}`;

  }
  return `UPDATE ${tableName} SET ${updateCols} WHERE id=${data._id}`;
}
module.exports = {
  createInsertQuery,
  createUpdateQuery
};