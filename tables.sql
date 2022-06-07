CREATE TABLE users(
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL
);

CREATE TABLE urls(
    id serial PRIMARY KEY,
    "userId" integer NOT NULL REFERENCES users(id),
    original text NOT NULL,
    shortened text UNIQUE NOT NULL,
    views integer NOT NULL DEFAULT 0
);