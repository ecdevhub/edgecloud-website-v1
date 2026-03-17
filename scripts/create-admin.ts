/**
 * Run: npx ts-node --project tsconfig.json scripts/create-admin.ts
 * Creates the initial admin user for the EdgeCloud blog.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import * as readline from "readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q: string) => new Promise<string>((r) => rl.question(q, r));

async function main() {
  console.log("\n🔧 EdgeCloud Admin Setup\n");

  const name = await ask("Admin name:     ");
  const email = await ask("Admin email:    ");
  const password = await ask("Admin password: ");

  if (!name || !email || !password) {
    console.error("All fields required.");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "edgecloud_blog",
  });

  const [result]: any = await conn.execute(
    "INSERT INTO authors (name, email, password, role) VALUES (?, ?, ?, 'admin') ON DUPLICATE KEY UPDATE name=VALUES(name), password=VALUES(password), role='admin'",
    [name.trim(), email.trim().toLowerCase(), hash],
  );

  await conn.end();
  rl.close();

  console.log(`\n✅ Admin user created successfully!`);
  console.log(`   Name:  ${name}`);
  console.log(`   Email: ${email}`);
  console.log(`   Login: http://localhost:3000/admin/login\n`);
}

main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
