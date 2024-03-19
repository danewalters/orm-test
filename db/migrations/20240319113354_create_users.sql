-- migrate:up
CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY NOT NULL,
    name varchar(256),
    age integer
);

-- migrate:down
DROP TABLE users;
