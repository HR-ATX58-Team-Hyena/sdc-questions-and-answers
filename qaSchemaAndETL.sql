-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;
DROP DATABASE IF EXISTS q_a;

CREATE DATABASE q_a;

\c q_a;

-- ---
-- Table 'product_index'
--
-- ---

DROP TABLE IF EXISTS product_index;

-- CREATE TABLE product_index (
--   id SERIAL PRIMARY KEY
-- );

-- ---
-- Table 'questions'
--
-- ---

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  question_id SERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(1000) NULL,
  epoch_date BIGINT NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported INTEGER DEFAULT 0,
  question_helpfulness INTEGER NOT NULL DEFAULT 0,
  question_date TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
);

-- ---
-- Table 'answers'
--
-- ---

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER,
  body VARCHAR(1000),
  epoch_date BIGINT NOT NULL,
  answerer_name VARCHAR(60),
  answerer_email VARCHAR(60),
  reported INTEGER DEFAULT 0,
  helpfulness INTEGER DEFAULT 0,
  date TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER,
  url VARCHAR(500)
  );

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE questions ADD FOREIGN KEY (product_id) REFERENCES product_index (id);
ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (question_id) ON DELETE CASCADE;
ALTER TABLE photos ADD FOREIGN KEY (answer_id) REFERENCES answers (id) ON DELETE CASCADE;

-- ---
-- ETL Questions
-- ---

\COPY questions (question_id, product_id, question_body, epoch_date, asker_name, asker_email, reported, question_helpfulness) from '/Users/coryellerbroek/Desktop/HackReactor/sdc-questions-and-answers/datasets/sample_questions.csv' DELIMITER ',' CSV HEADER;

UPDATE questions SET question_date = to_timestamp(floor(epoch_date / 1000));

ALTER TABLE questions DROP COLUMN epoch_date;

CREATE INDEX question_helpfulness_index ON questions (question_helpfulness);

-- ---
-- ETL Answers
-- ---

\COPY answers (id, question_id, body, epoch_date, answerer_name, answerer_email, reported, helpfulness) from '/Users/coryellerbroek/Desktop/HackReactor/sdc-questions-and-answers/datasets/sample_answers.csv' DELIMITER ',' CSV HEADER;

UPDATE answers SET date = to_timestamp(floor(epoch_date / 1000));

ALTER TABLE answers DROP COLUMN epoch_date;

CREATE INDEX answer_helpfulness_index ON answers (helpfulness);

-- ---
-- ETL Photos
-- ---

\COPY photos (id, answer_id, url) from '/Users/coryellerbroek/Desktop/HackReactor/sdc-questions-and-answers/datasets/sample_answers_photos.csv' DELIMITER ',' CSV HEADER;


-- ---
-- Top 4 Questions
-- ---
-- CREATE TABLE top_4_questions (
--     id SERIAL NOT NULL PRIMARY KEY,
--   product_id INTEGER NOT NULL,
--   question_body VARCHAR(1000) NULL,
--   epoch_date BIGINT NOT NULL,
--   asker_name VARCHAR(60) NOT NULL,
--   asker_email VARCHAR(60) NOT NULL,
--   reported INTEGER DEFAULT 0,
--   question_helpfulness INTEGER NOT NULL DEFAULT 0,
--   date TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
-- );


-- ---
-- Table Properties
-- ---

-- ALTER TABLE questions ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE answers ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE product_index ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO questions (question_id,product_id,email,question_body,question_date,asker_name,question_helpfulness,reported) VALUES
-- ('','','','','','','','');
-- INSERT INTO answers (answer_id,question_id,email,body,date,answerer_name,helpfulness) VALUES
-- ('','','','','','','');
-- INSERT INTO photos (photo_id,answer_id,url) VALUES
-- ('','','');
-- INSERT INTO product_index (product_id) VALUES
-- ('');