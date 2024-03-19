import { users } from "./schema.ts";
import { eq } from "https://cdn.jsdelivr.net/npm/drizzle-orm@0.30.3/sql/index.js";
import { Hono } from "https://deno.land/x/hono@v4.1.2/mod.ts";
import { db } from "./client.ts";

const app = new Hono();

app.post("/users", async (c) => {
  const { name, age } = await c.req.parseBody();
  const insertResult = await db.insert(users).values({ name, age }).returning({
    insertedId: users.id,
  }).execute();
  return c.json({ message: "User created", user: insertResult });
});

app.get("/users", async (c) => {
  const allUsers = await db.select().from(users).execute();
  return c.json({ users: allUsers });
});

app.put("/users/:id", async (c) => {
  const userId = Number(c.req.param("id"));
  const { name, age } = await c.req.parseBody();
  const updateResult = await db.update(users).set({
    name: name,
    age: age,
  }).where(eq(users.id, userId)).returning({
    putId: users.id,
  })
    .execute();
  return c.json({ message: "User updated", user: updateResult });
});

app.delete("/users/:id", async (c) => {
  const userId = Number(c.req.param("id"));
  const deleteResult = await db.delete(users).where(eq(users.id, userId))
    .returning({ deletedId: users.id })
    .execute();
  return c.json({ message: "User deleted", result: deleteResult });
});

Deno.serve(app.fetch);
