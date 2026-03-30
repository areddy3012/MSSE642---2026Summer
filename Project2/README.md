# Project 2: Integration Testing with Postman

## Table of Contents
- [Part 1: API & HTTP Research](./Part1_API_Research/APIs_and_Integration_Testing.md)
- [Part 2: Postman API Testing Demo](./Part2_Postman_Testing.md)
- [Screenshots](./Part2_Screenshots/)

---

## Submission Checklist
- [x] Part 1: API/HTTP research in markdown
- [x] Part 2: Postman collection and environment
- [x] Screenshots of all required requests and responses
- [x] Markdown documentation for all steps
- [x] GitHub repo structure matches assignment

---

## How to Run the Triangle API

1. Install Python (if not already installed)
2. Open PowerShell and run:
   ```powershell
   cd Project2/triangle_api
   py -m pip install -r requirements.txt
   py app.py
   ```
3. The API will run at `http://localhost:5000/api`

---

## How to Test with Postman

1. Set `base_url` environment variable to `http://localhost:5000/api`
2. Import all requests as shown in [Part2_Postman_Testing.md](./Part2_Postman_Testing.md)
3. Add screenshots to [Part2_Screenshots/](./Part2_Screenshots/)

---

## Grading Rubric Reference
- [x] Introduction
- [x] HTTP, API, CORS, Security, Public APIs
- [x] Postman collection, environment, 5-10 requests
- [x] Data persistence, error handling, 3+ response examples
- [x] Screenshots and/or video
- [x] Conclusion and recommendations
