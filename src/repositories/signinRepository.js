import connection from "../database.js";

async function fetchUserData(email, password) {
    const user = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
      );
    return user.rows[0];
}

export {
    fetchUserData,
}