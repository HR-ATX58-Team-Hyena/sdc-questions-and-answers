\c q_a

\COPY answers (id, question_id, body, epoch_date, answerer_name, answerer_email, reported, helpfulness) from '/Users/coryellerbroek/Desktop/HackReactor/sdc-questions-and-answers/datasets/sample_answers.csv' DELIMITER ',' CSV HEADER;

UPDATE answers SET date = to_timestamp(floor(epoch_date / 1000));

ALTER TABLE answers DROP COLUMN epoch_date;