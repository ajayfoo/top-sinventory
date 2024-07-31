import "dotenv/config";
import pg from "pg";

const db = new pg.Pool({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
});

export default db;
