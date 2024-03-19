import {
  integer,
  pgTable,
  serial,
  varchar,
} from "https://cdn.jsdelivr.net/npm/drizzle-orm@0.30.3/pg-core/index.js";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  age: integer("age"),
});
