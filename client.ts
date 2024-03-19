import { drizzle } from "https://cdn.jsdelivr.net/npm/drizzle-orm@0.30.3/postgres-js/index.js";
import postgres from "https://deno.land/x/postgresjs@v3.4.3/mod.js";

const queryClient = postgres({
  database: "orm-test",
  host: "localhost",
  user: "postgres",
  password: "postgres",
  port: 5432,
  max: 10,
});

export const db = drizzle(queryClient);
