import connection from "../database.js";

async function insertTransaction (value, type, user) {
  const result = await connection.query(
    `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
    [user, value, type]
  );
  return result.rowCount;
}

async function fetchUserTransactions(user){
  const userEvents = await connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [user]
  );
  return userEvents.rows;
}

export {
    insertTransaction,
    fetchUserTransactions,
}