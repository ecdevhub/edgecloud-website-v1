import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pool: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "edgecloud_blog",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      timezone: "+00:00",
    });
  }
  return pool;
}

export function getDb() {
  if (!db) {
    db = drizzle(getPool(), { schema, mode: "default" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return db as ReturnType<typeof drizzle> & { [K: string]: any };
}

export { schema };
export default getDb;
