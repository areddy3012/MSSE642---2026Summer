# Part 1: Research on APIs and Integration Testing with Postman

## 1. Basic Functionality of HTTP

### Clients & Servers

- **Client**: The software that initiates a request (browser, mobile app, Postman)
- **Server**: The system that receives the request, processes it, and returns a response

HTTP follows a client–server model, where the client opens a connection, sends a request, and waits for a response.

### Requests

An HTTP request contains:

- **Start line**: method, target URL, HTTP version
- **Headers**: metadata like Accept, Authorization
- **Optional body**: data sent with POST/PUT

### Responses

A response contains:

- **Status line**: HTTP version + status code
- **Headers**: metadata about the response
- **Optional body**: HTML, JSON, etc.

### Headers vs. Body

- **Headers**: Metadata about the request/response (content type, caching, auth)
- **Body**: The actual data being sent (JSON, HTML, files)

### Status Codes

Common categories:

- **2xx** – Success (200 OK)
- **3xx** – Redirects
- **4xx** – Client errors (404 Not Found)
- **5xx** – Server errors

### HTTP Verbs

| Verb | Purpose |
|------|---------|
| **GET** | Retrieve data |
| **POST** | Create or submit data |
| **PUT** | Replace a resource |
| **DELETE** | Remove a resource |

### Why HTTP Is Stateless

HTTP is stateless because each request is independent; the server does not remember previous interactions. State must be added manually using cookies, tokens, or sessions.

---

## 2. Role of APIs in Modern Applications

APIs allow different systems, services, or applications to communicate over HTTP. They enable:

- Mobile apps to fetch data
- Web apps to interact with servers
- Integrations between companies
- Microservices to communicate

### Open APIs

Open APIs (public APIs):

- Are publicly accessible
- Allow developers to integrate external data/services
- Encourage innovation and interoperability

### Modern Example of Open API Use: Google Maps API

The Google Maps API is used by ride-sharing apps, delivery apps, and travel sites to:

- Embed maps
- Calculate routes
- Estimate travel times

---

## 3. Cross-Origin Resource Sharing (CORS)

CORS is a browser security mechanism that controls whether a web page can make requests to a different domain.

**Example:**
```
example.com → requests → api.otherdomain.com
```

The server must explicitly allow this using headers like:

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`

CORS prevents malicious cross-site requests.

---

## 4. How APIs Are Secured

### Common API Security Methods

- **API Keys** – simple identification
- **OAuth 2.0** – delegated authorization (Google, Facebook login)
- **Bearer Tokens / JWT** – stateless authentication
- **Basic Auth** – username/password (less common today)
- **HTTPS** – encrypts all traffic

### Accessing a Secure API

To access a secure API, you typically:

1. Obtain credentials (API key, token, OAuth client ID)
2. Include them in headers (e.g., `Authorization: Bearer <token>`)
3. Follow the provider's authentication flow

---

## 5. Five Public Open APIs

Here are five widely used open APIs:

1. **OpenWeatherMap API** – weather data
2. **NASA Open APIs** – space imagery, astronomy data
3. **PokéAPI** – Pokémon data
4. **The Cat API** – random cat images
5. **REST Countries API** – country information

---

## References

- Fielding, R. T., & Reschke, J. (2014). *Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content*. Internet Engineering Task Force (IETF). https://www.rfc-editor.org/rfc/rfc7231

- Mozilla Developer Network (MDN). (n.d.). *HTTP Overview*. https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview

- Mozilla Developer Network (MDN). (n.d.). *Cross-Origin Resource Sharing (CORS)*. https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

---

**Note:** Part 2 (Postman Testing) with sample requests, screenshots, and testing methods coming soon.
