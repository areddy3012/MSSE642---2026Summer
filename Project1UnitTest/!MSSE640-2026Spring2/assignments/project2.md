
# Project 2: Integration Testing with Postman

**Revised: 3/21/26**

---

## General Instructions

### Introduction

This assignment allows you to apply the concepts of this class using an tool for working with APIs, which represent the integration interfaces for a distributed software. Our focus in this assignment will be "Integration Testing." We will access API endpoints and examine the data that is returned. This is a very common methodology to perform integration testing.

### Focus on understanding the following:

- All the possible interfaces (endpoints).
- Verbs are used to access the URIs.
- The expected result for success?
- The possible failure scenarios.

### Prerequisite

- Postman installed on your PC

### Group Work

This is a group collaboration assignment. You will need to choose a partner for this assignment. If you would like to work individually, you can do that too. If you work as a group, but both names on your assignment. Let me know your groups in Slack.

---

## Part 1: Research on APIs and Integration Testing with PostMan

Research the following topics as part of the writeup that will be included in your deliverable.

- **Describe the basic functionality of HTTP.** Include details about:
  - Clients
  - Servers
  - Requests
  - Responses
  - Headers vs. Body
  - Status codes
  - HTTP Verbs: GET, POST, PUT, DELETE
  - A description of why HTTP is "stateless" and what that means.

- **Describe the role of APIs in modern applications.** What are Open APIs and why are they important? Find one application of a modern use of Open APIs and describe how they are used. Include your sources.

- **Describe Cross-Origin Resource Sharing (CORS).**

- **Describe how API's are secured and what you need to do to access a secure API.**

- **List 5 Public Open APIs that you can use to get data.**

---

## Part 2: Postman Video Demo or Test document with Screen Shots

You are encouraged to create a video using video capture tool (PowerPoint, Camtasia, etc.) that will demo the following functionality in Postman. In addition to a video, submit a writeup and screen shots in Markdown and post the writeup in your personal GitHub repo for the class.

- You can use a public API of your choice, but you are encouraged to code an API yourself to represent the Triangle program.
- You can use AI tools to code your own API.
- Flask/Python is recommended.
- If you get stuck ask for help in Slack.
- You do not have to code a Front End yet, but if you Vibe Code the API it will be easy to do both the UI and the API.
- The API should return JSON data.
- If you are coding by hand or using one of AI assistants to help you generate code, try coding an API backend on your PC and limit the testing to your local PC to start. If you know how to deploy, you can take it there as well.

### Perform the following in Postman

1. Create a collection
2. Create a test GET request to perform a listing of the items in a database (you can truncate this as needed for your presentation).
3. Create an Environment for your Collection.
4. Refactor your Request to include environment variables for the base url for the API, hint {{url}}
5. Create at 5 to 10 additional requests including GET requests and at least one POST request.

### Cover the following points

1. Explain if data is persisted in the API that you chose after you perform CRUD (Create, Retrieve, Update, Delete) operations via a POST request.
2. Show examples of data returned for the requests (at least three).
3. Show the data that is returned for an error, hint, search for a user that does not exist.

---

## Extra Credit

- Use a Linux machine, a Mac, or Git Bash on a Windows PC to perform 3 Requests using the curl command. Does Curl have any advantages over Postman?

### Example

```
gran@HPPAVILION-1 MINGW64 /
$ which curl
/mingw64/bin/curl

gran@HPPAVILION-1 MINGW64 /
$ curl https://jsonmonk.com/api/v1/users?page=1
```

---

## Rubric Summary

| CRITERIA | QUESTIONS TO ADDRESS |
|---|---|
| **Introduction** | Provide an overview of the project. If you worked as a team, include all team members in your document. |
| **Cover the following points in Part 1** | Functionality of HTTP, role of APIs, CORS, public APIs, security. |
| **Video demo and screen shots of Part 2 in your markdown document.** | Demonstrate all of the points listed in Part 2. |
| **Conclusion and Recommendations** | Summary of what you learned about integration testing and APIs. |

---

**Submit your Project #2 in markdown format in your Git Hub Repo.**
