DROP DATABASE IF EXISTS imdb;
CREATE DATABASE imdb;

\c imdb


CREATE TABLE genre (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL
);

CREATE TABLE rating (
  id SERIAL PRIMARY KEY NOT NULL,
  stars INT,
  movies_id INT
);

CREATE TABLE movies
(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR NOT NULL,
  genre_id INT REFERENCES genre(id),
  img_url VARCHAR NOT NULL
);

CREATE TABLE comments(
  id SERIAL PRIMARY KEY NOT NULL,
  comments VARCHAR NOT NULL,
  movies_id INT REFERENCES movies(id)
);


