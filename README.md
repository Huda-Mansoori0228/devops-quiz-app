# DevOps Quiz App

A simple static web application to practice DevOps concepts. This project demonstrates collaboration using Git and GitHub, with separate feature branches for question bank and UI development.

---

## Features

- Load DevOps quiz questions from a JSON file (`data/questions.json`)
- Select a topic to filter questions
- Display one question at a time
- Select an answer and get **immediate feedback**
- View explanations for each answer
- Fully static, no backend required
- Easy to add new questions in JSON format

---

## Question Bank

All questions are stored in `data/questions.json`. Each question follows this format:

```json
{
  "id": "Q1",
  "topic": "Continuous Integration",
  "question": "What is the primary goal of Continuous Integration?",
  "options": [
    "Automatically deploy to production",
    "Frequently integrate code changes into a shared repository",
    "Eliminate the need for testing",
    "Remove the need for branches"
  ],
  "answerIndex": 1,
  "explanation": "Continuous Integration aims to detect integration issues early."
}
