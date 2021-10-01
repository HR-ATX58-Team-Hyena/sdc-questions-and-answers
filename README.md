# Questions and Answers API

Questions and Answers service for Project Catwalk

## List Questions

GET /qa/questions

Retrieves a list of questions for a particular product. This list does not include any reported questions.

Parameters

product_id
integer - Specifies the product for which to retrieve questions.

page
integer - Selects the page of results to return. Default 1.

count
integer - Specifies how many results per page to return. Default 5.

Response

Status: 200 OK

## Answers List

Returns answers for a given question. This list does not include any reported answers.

GET /qa/questions/:question_id/answers

Parameters

question_id
integer - Required ID of the question for which answers are needed

Query Parameters

page
integer - Selects the page of results to return. Default 1.

count
integer - Specifies how many results per page to return. Default 5.

Response

Status: 200 OK

## Add a Question

Adds a question for the given product

POST /qa/questions

Body Parameters

body text - Text of question being asked
name text - Username for question asker
email text - Email address for question asker
product_id - integer Required ID of the Product for which the question is posted

Response

Status: 201 CREATED

## Add an Answer

Adds an answer for the given question

POST /qa/questions/:question_id/answers

Parameters

question_id - integer Required ID of the question to post the answer for

Body Parameters

body text- Text of question being asked
name text - Username for question asker
email text - Email address for question asker
photos [text] - An array of urls corresponding to images to display

Response

Status: 201 CREATED

## Mark Question as Helpful

Updates a question to show it was found helpful.

PUT /qa/questions/:question_id/helpful

Parameters

question_id - integer Required ID of the question to update

Response

Status: 204 NO CONTENT

## Report Question

Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.

PUT /qa/questions/:question_id/report

Parameters

Parameter Type Description
question_id integer Required ID of the question to update
Response

Status: 204 NO CONTENT

## Mark Answer as Helpful

Updates an answer to show it was found helpful.

PUT /qa/answers/:answer_id/helpful

Parameters

answer_id - integer Required ID of the answer to update
Response

Status: 204 NO CONTENT

## Report Answer

Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.

PUT /qa/answers/:answer_id/report

Parameters

answer_id - integer Required ID of the answer to update
Response

Status: 204 NO CONTENT
