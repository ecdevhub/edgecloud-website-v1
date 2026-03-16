import { getDb, schema } from "@/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const { authors } = schema;
const JWT_SECRET = process.env.JWT_SECRET || "edgecloud-dev-secret-change-in-production";
const COOKIE_NAME = "ec_admin_token";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export function signToken(user: AdminUser) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AdminUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminUser;
  } catch {
    return null;
  }
}

/** Server-side: get current user from cookie */
export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

/** Login — returns token or null */
export async function loginUser(email: string, password: string): Promise<{ token: string; user: AdminUser } | null> {
  const db = getDb();
  const result = await db.select().from(authors).where(eq(authors.email, email)).limit(1);
  const author = result[0];
  if (!author) return null;

  const valid = await verifyPassword(password, author.password);
  if (!valid) return null;

  const user: AdminUser = { id: author.id, name: author.name, email: author.email, role: author.role };
  const token = signToken(user);
  return { token, user };
}

export { COOKIE_NAME };
