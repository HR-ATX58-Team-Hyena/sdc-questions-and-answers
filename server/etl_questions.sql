\c q_a

\COPY questions (id, product_id, body, epoch_date, asker_name, asker_email, reported, helpful) from '/Users/coryellerbroek/Desktop/HackReactor/sdc-questions-and-answers/datasets/sample_questions.csv' DELIMITER ',' CSV HEADER;

UPDATE questions SET date = to_timestamp(floor(epoch_date / 1000));

ALTER TABLE questions DROP COLUMN epoch_date;