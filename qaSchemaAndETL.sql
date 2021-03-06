DROP DATABASE IF EXISTS q_a;

CREATE DATABASE q_a;

\c q_a;

-- ---
-- Table 'questions'
-- ---

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  epoch_date BIGINT NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported INTEGER NOT NULL DEFAULT 0,
  question_helpfulness INTEGER NOT NULL DEFAULT 0,
  question_date TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
);

-- ---
-- Table 'answers'
-- ---

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  answer_id SERIAL NOT NULL PRIMARY KEY,
  question_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  epoch_date BIGINT NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported INTEGER NOT NULL DEFAULT 0,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  date TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
);

-- ---
-- Table 'photos'
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL NOT NULL PRIMARY KEY,
  answer_id INTEGER NOT NULL,
  url VARCHAR(500) NOT NULL
  );

-- ---
-- Foreign Keys
-- ---

ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (question_id) ON DELETE CASCADE;
ALTER TABLE photos ADD FOREIGN KEY (answer_id) REFERENCES answers (answer_id) ON DELETE CASCADE;

-- ---
-- ETL Questions
-- ---

\COPY questions (question_id, product_id, question_body, epoch_date, asker_name, asker_email, reported, question_helpfulness) from '/Users/coryellerbroek/Desktop/HackReactor/sdc-questions-and-answers/datasets/questions.csv' DELIMITER ',' CSV HEADER;

UPDATE questions SET question_date = to_timestamp(floor(epoch_date / 1000));
ALTER TABLE questions DROP COLUMN epoch_date;
SELECT setval(pg_get_serial_sequence('questions', 'question_id'), max(question_id)) FROM questions;

CREATE INDEX question_helpfulness_index ON questions (question_helpfulness);
CREATE INDEX product_id_questions_index ON questions (product_id);

-- ---
-- ETL Answers
-- ---

\COPY answers (answer_id, question_id, body, epoch_date, answerer_name, answerer_email, reported, helpfulness) from '/Users/coryellerbroek/Desktop/HackReactor/sdc-questions-and-answers/datasets/answers.csv' DELIMITER ',' CSV HEADER;

UPDATE answers SET date = to_timestamp(floor(epoch_date / 1000));
ALTER TABLE answers DROP COLUMN epoch_date;
SELECT setval(pg_get_serial_sequence('answers', 'answer_id'), max(answer_id)) FROM answers;

CREATE INDEX answer_helpfulness_index ON answers (helpfulness);
CREATE INDEX question_id_answers_index ON answers (question_id);

-- ---
-- ETL Photos
-- ---

\COPY photos (id, answer_id, url) from '/Users/coryellerbroek/Desktop/HackReactor/sdc-questions-and-answers/datasets/answers_photos.csv' DELIMITER ',' CSV HEADER;

SELECT setval(pg_get_serial_sequence('photos', 'id'), max(id)) FROM photos;

CREATE INDEX answer_id_photos_index ON photos (answer_id);

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
