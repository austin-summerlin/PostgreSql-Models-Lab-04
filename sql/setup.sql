DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS people;

CREATE TABLE dogs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  type TEXT NOT NULL
);

CREATE TABLE people (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  born TEXT NOT NULL,
  died TEXT NOT NULL
);

