# System Design Capstone

## Questions and Answers API & Database

<br>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#contributors">Contributors</a></li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stack">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#module-break-down">Module Break Down</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>
<br>

# Overview

Our team was "hired" to build out the API to support the Front End Capstone "Project Catwalk". Each member was tasked with developing one of the three API services.

### Tech Stack

- [Jest](https://jestjs.io)
- [Express](https://expressjs.com/)
- [Webpack](https://webpack.js.org/)

<!-- CONTACT -->

### Cory Ellerbroek - cory.ellerbroek@gmail.com

<img src="READMEimages/Cory-Headshot.jpeg" alt="Photo of Cory Ellerbroek" width="80" height="80">

[![linkedin-shield]][cory-linkedin]
[![github-shield]][cory-github]

[Project Repo](https://github.com/LrBrK33/hr-atx58-fec-havarti)

<a href="#product-overview">My Module: Product Overview Documentation</a>

<br>

# Contributors

# API Endpoints

## List Questions

Endpoint: `/qa/:product_id`

Retrieves a list of questions for a particular product. This list does not include any reported questions.

### <strong>Parameters</strong>

> <strong>product_id</strong><br>
> integer - Specifies the product for which to retrieve questions.<br><br> ><strong>page</strong><br>
> integer - Selects the page of results to return. Default 1.<br><br> ><strong>count</strong><br>
> integer - Specifies how many results per page to return. Default 5.

Response Status: `200 OK`

<br>

## Answers List

Returns answers for a given question. This list does not include any reported answers.

Endpoint: `/qa/questions/:question_id/answers`

### <strong>Parameters</strong>

> <strong>question_id</strong><br>
> integer - Required ID of the question for which answers are needed<br>

### <strong>Query Parameters</strong>

> page
> integer - Selects the page of results to return. Default 1.
> count
> integer - Specifies how many results per page to return. Default 5.

Response Status: `200 OK`

## Add a Question

Adds a question for the given product

POST /qa

Body Parameters

body text - Text of question being asked
name text - Username for question asker
email text - Email address for question asker
product_id - integer Required ID of the Product for which the question is posted

Response

Status: 201 CREATED

## Add an Answer

Adds an answer for the given question

POST /qa/:question_id/answers

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

<!-- Contributor Links -->

[cory-linkedin]: https://www.linkedin.com/in/coryellerbroek/
[cory-github]: https://github.com/LrBrK33
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-grey?style=for-the-badge&logo=linkedin
[github-shield]: https://img.shields.io/badge/-GitHub-grey?style=for-the-badge&logo=github
