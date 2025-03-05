const bcrypt = require('bcrypt');
const saltRounds = 10;

async function encryptPassword(password) {
    let encpassword = await bcrypt.hash(password, saltRounds);
    return encpassword;
}
async function matchPassword(password, encpassword) {
    let res = await bcrypt.compare(password, encpassword);
    return res;
}
module.exports = { encryptPassword, matchPassword };