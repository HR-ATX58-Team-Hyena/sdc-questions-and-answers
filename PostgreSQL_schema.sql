-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

CREATE DATABASE q_a;

\c q_a;

-- ---
-- Table 'product_index'
--
-- ---
DROP TABLE IF EXISTS product_index;

CREATE TABLE product_index (
  id SERIAL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'questions'
--
-- ---

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  id SERIAL,
  product_id INTEGER NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written TIMESTAMP ,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported INTEGER NOT NULL DEFAULT 0,
  helpful INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table 'answers'
--
-- ---

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id SERIAL,
  question_id INTEGER,
  body VARCHAR(1000),
  date_written TIMESTAMP,
  answerer_name VARCHAR(60),
  answerer_email VARCHAR(60),
  reported BOOLEAN,
  helpful INTEGER DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL,
  answer_id INTEGER,
  url VARCHAR(500),
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE questions ADD FOREIGN KEY (product_id) REFERENCES product_index (id);
ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (id);
ALTER TABLE photos ADD FOREIGN KEY (answer_id) REFERENCES answers (id);

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