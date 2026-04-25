# Project 2: Part 2 - Postman API Integration Testing

## Overview

This section documents my API testing workflow using Postman with a locally-hosted Flask/Python Triangle API. The API supports full CRUD operations (Create, Read, Update, Delete) and returns JSON responses for all endpoints. All requests are organized within a Postman Collection with Environment variables for easy portability.

---

## 1. Triangle API Endpoints

The Triangle API exposes the following endpoints:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/triangles | List all triangles |
| GET | /api/triangles/{id} | Retrieve a specific triangle by ID |
| POST | /api/triangles | Create a new triangle |
| PUT | /api/triangles/{id} | Update an existing triangle |
| DELETE | /api/triangles/{id} | Delete a triangle |
| GET | /api/health | Health check endpoint |

All endpoints are located at the base URL: `http://localhost:5000`

---

## 2. Creating a Postman Collection

I created a Postman Collection named **"Triangle API"** to organize all API requests.

**Steps taken:**
1. Opened Postman
2. Clicked **Create** → **Collection**
3. Named it "Triangle API"
4. All subsequent requests were added to this collection

![Postman Collection](./Part2_Screenshots/01_postman_collection.png)

---

## 3. Creating a Postman Environment

I created an Environment named **"Triangle API Dev"** with the following variable:

| Variable Name | Value |
|---------------|-------|
| base_url | http://localhost:5000/api |

This environment variable allows all requests to reference `{{base_url}}` instead of hardcoding the full URL.

![Environment Configuration](./Part2_Screenshots/02_environment_configuration.png)

---

## 4. API Requests (10 Total)

### 4.1 GET Requests

#### Request 1: Health Check
- **Name:** Health Check
- **Method:** GET
- **URL:** `{{base_url}}/health`
- **Purpose:** Verify the API is running and check total triangle count

**Response (200 OK):**
```json
{
  "status": "API is running",
  "total_triangles": 5
}
```

![Health Check Request](./Part2_Screenshots/03_health_check.png)

---

#### Request 2: Get All Triangles
- **Name:** Get All Triangles
- **Method:** GET
- **URL:** `{{base_url}}/triangles`
- **Purpose:** Retrieve all triangles stored in the database

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "triangles": [
    {
      "id": "1",
      "side_a": 3,
      "side_b": 4,
      "side_c": 5,
      "type": "Scalene",
      "is_valid": true
    },
    {
      "id": "2",
      "side_a": 5,
      "side_b": 5,
      "side_c": 5,
      "type": "Equilateral",
      "is_valid": true
    },
    {
      "id": "3",
      "side_a": 2,
      "side_b": 2,
      "side_c": 4,
      "type": "Isosceles",
      "is_valid": true
    }
  ]
}
```

![Get All Triangles Response](./Part2_Screenshots/04_get_all_triangles.png)

---

#### Request 3: Get Specific Triangle
- **Name:** Get Triangle by ID
- **Method:** GET
- **URL:** `{{base_url}}/triangles/1`
- **Purpose:** Retrieve a single triangle by its ID

**Response (200 OK):**
```json
{
  "success": true,
  "id": "1",
  "side_a": 3,
  "side_b": 4,
  "side_c": 5,
  "type": "Scalene",
  "is_valid": true
}
```

![Get Specific Triangle](./Part2_Screenshots/05_get_specific_triangle.png)

---

#### Request 4: Invalid Triangle ID (Error Handling)
- **Name:** Get Invalid Triangle (Error Test)
- **Method:** GET
- **URL:** `{{base_url}}/triangles/999`
- **Purpose:** Test error handling when requesting a non-existent triangle

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Triangle with ID 999 not found"
}
```

![404 Error Response](./Part2_Screenshots/06_error_404.png)

---

### 4.2 POST Request (Create)

#### Request 5: Create Triangle
- **Name:** Create Triangle
- **Method:** POST
- **URL:** `{{base_url}}/triangles`
- **Headers:** `Content-Type: application/json`
- **Body (Raw JSON):**
```json
{
  "side_a": 7,
  "side_b": 7,
  "side_c": 3
}
```
- **Purpose:** Add a new triangle to the database

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Triangle created successfully",
  "id": "4",
  "side_a": 7,
  "side_b": 7,
  "side_c": 3,
  "type": "Isosceles",
  "is_valid": true
}
```

![Create Triangle Request](./Part2_Screenshots/07_create_triangle.png)

---

#### Request 6: Create Invalid Triangle (Error Handling)
- **Name:** Create Invalid Triangle
- **Method:** POST
- **URL:** `{{base_url}}/triangles`
- **Headers:** `Content-Type: application/json`
- **Body (Raw JSON):**
```json
{
  "side_a": 1,
  "side_b": 2,
  "side_c": 10
}
```
- **Purpose:** Test validation when creating an invalid triangle

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Triangle created successfully",
  "id": "5",
  "side_a": 1,
  "side_b": 2,
  "side_c": 10,
  "type": null,
  "is_valid": false
}
```

**Note:** The API accepts the triangle but marks it as invalid (violates triangle inequality theorem).

![Invalid Triangle Response](./Part2_Screenshots/08_invalid_triangle.png)

---

#### Request 7: Create with Missing Fields (Error Handling)
- **Name:** Create Triangle - Missing Fields
- **Method:** POST
- **URL:** `{{base_url}}/triangles`
- **Headers:** `Content-Type: application/json`
- **Body (Raw JSON):**
```json
{
  "side_a": 5,
  "side_b": 5
}
```
- **Purpose:** Test validation when required fields are missing

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Missing required fields. Need: ['side_a', 'side_b', 'side_c']"
}
```

![Missing Fields Error](./Part2_Screenshots/09_missing_fields_error.png)

---

### 4.3 PUT Request (Update)

#### Request 8: Update Triangle
- **Name:** Update Triangle
- **Method:** PUT
- **URL:** `{{base_url}}/triangles/1`
- **Headers:** `Content-Type: application/json`
- **Body (Raw JSON):**
```json
{
  "side_a": 10,
  "side_b": 10,
  "side_c": 10
}
```
- **Purpose:** Update an existing triangle's dimensions

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Triangle updated successfully",
  "id": "1",
  "side_a": 10,
  "side_b": 10,
  "side_c": 10,
  "type": "Equilateral",
  "is_valid": true
}
```

![Update Triangle Request](./Part2_Screenshots/10_update_triangle.png)

---

### 4.4 DELETE Request

#### Request 9: Delete Triangle
- **Name:** Delete Triangle
- **Method:** DELETE
- **URL:** `{{base_url}}/triangles/1`
- **Purpose:** Remove a triangle from the database

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Triangle deleted successfully",
  "deleted": {
    "id": "1",
    "side_a": 10,
    "side_b": 10,
    "side_c": 10
  }
}
```

![Delete Triangle Request](./Part2_Screenshots/11_delete_triangle.png)

---

#### Request 10: Delete Non-Existent Triangle (Error Handling)
- **Name:** Delete Invalid Triangle
- **Method:** DELETE
- **URL:** `{{base_url}}/triangles/999`
- **Purpose:** Test error handling when deleting a non-existent triangle

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Triangle with ID 999 not found"
}
```

![Delete Error Response](./Part2_Screenshots/12_delete_error.png)

---

## 5. Data Persistence Testing

### Testing Workflow:

1. **Create triangles** using POST requests (Requests 5 & 6)
2. **Verify data persists** by running GET all triangles (Request 2)
3. **Update a triangle** using PUT request (Request 8)
4. **Verify update persisted** by running GET specific triangle (Request 3)
5. **Delete a triangle** using DELETE request (Request 9)
6. **Verify deletion** by running GET all triangles again (Request 2)

### Data Persistence Results:

✅ **Data Persists After CRUD Operations**

The Triangle API uses a JSON file (`triangles_data.json`) for data storage. This means:
- Data created via POST requests persists between API calls
- Updated data via PUT requests is immediately reflected in subsequent GET requests
- Deleted data via DELETE requests is removed and no longer appears in GET all triangles

**Evidence:**
- After creating 5 triangles, GET all triangles returned all 5
- After updating triangle ID 1, GET specific triangle showed the new values
- After deleting triangle ID 1, GET all triangles no longer includes it

![Data Persistence Workflow](./Part2_Screenshots/13_data_persistence.png)

---

## 6. Key JSON Response Examples

### Example 1: Valid Scalene Triangle
```json
{
  "success": true,
  "id": "1",
  "side_a": 3,
  "side_b": 4,
  "side_c": 5,
  "type": "Scalene",
  "is_valid": true
}
```

### Example 2: Valid Equilateral Triangle
```json
{
  "success": true,
  "message": "Triangle created successfully",
  "id": "2",
  "side_a": 5,
  "side_b": 5,
  "side_c": 5,
  "type": "Equilateral",
  "is_valid": true
}
```

### Example 3: Invalid Triangle (Violates Triangle Inequality)
```json
{
  "success": true,
  "id": "5",
  "side_a": 1,
  "side_b": 2,
  "side_c": 10,
  "type": null,
  "is_valid": false
}
```

![Response Examples Montage](./Part2_Screenshots/14_response_examples.png)

---

## 7. Error Handling Demonstration

The API implements comprehensive error handling for various scenarios:

### Error 1: Triangle Not Found (404)
**Request:** `GET {{base_url}}/triangles/999`

**Response:**
```json
{
  "success": false,
  "error": "Triangle with ID 999 not found"
}
```

### Error 2: Missing Required Fields (400)
**Request:** `POST {{base_url}}/triangles` with incomplete body

**Response:**
```json
{
  "success": false,
  "error": "Missing required fields. Need: ['side_a', 'side_b', 'side_c']"
}
```

### Error 3: Invalid Data Types (400)
**Request:** `POST {{base_url}}/triangles` with non-numeric values

**Response:**
```json
{
  "success": false,
  "error": "Sides must be numeric values"
}
```

![Error Responses](./Part2_Screenshots/15_error_responses.png)

---

## 8. Extra Credit: curl Commands (Git Bash on Windows)

I tested three API endpoints using curl commands in Git Bash to compare with Postman.

### Command 1: Health Check
```bash
curl http://localhost:5000/api/health
```

### Command 2: Get All Triangles
```bash
curl http://localhost:5000/api/triangles
```

### Command 3: Create Triangle
```bash
curl -X POST http://localhost:5000/api/triangles \
  -H "Content-Type: application/json" \
  -d '{"side_a": 3, "side_b": 4, "side_c": 5}'
```

**Screenshot:**
![Git Bash curl Commands](./Part2_Screenshots/16_curl_commands.png)

### curl vs Postman Comparison

| Feature         | curl         | Postman      |
|-----------------|--------------|--------------|
| UI/UX           | CLI only     | Graphical    |
| Scriptable      | Yes          | Limited      |
| Automation      | Easy         | Possible     |
| Learning curve  | Steep        | Easy         |
| Collaboration   | No           | Yes          |

**Summary:**  
- curl is great for automation, scripting, and quick tests.  
- Postman is better for learning, documentation, and team collaboration.

---

## 9. Observations & Learnings

### Triangle Classification Logic
The API correctly implements triangle classification:
- **Equilateral:** All three sides equal (e.g., 5, 5, 5)
- **Isosceles:** Two sides equal (e.g., 7, 7, 3)
- **Scalene:** All sides different (e.g., 3, 4, 5)

### Validation Logic
The API validates triangles using the **Triangle Inequality Theorem**:
- Sum of any two sides must be greater than the third side
- All sides must be positive
- Triangles violating this are marked as `is_valid: false`

### Data Storage
- The API persists data to `triangles_data.json`
- Data survives API restarts (unlike in-memory storage)
- Each triangle is assigned a unique auto-incrementing ID

---

## 10. Conclusion

Through this integration testing project, I learned:

1. **API Design:** How to structure RESTful endpoints and return consistent JSON responses
2. **Postman Workflow:** Creating collections, environments, and managing requests efficiently
3. **CRUD Operations:** Testing Create, Read, Update, Delete operations on a real API
4. **Error Handling:** Validating error responses and ensuring data integrity
5. **Data Persistence:** Understanding how data survives across multiple API calls
6. **curl Commands:** Using command-line tools for API testing and automation
7. **Integration Testing:** Verifying that API components work together correctly

This project reinforced the importance of comprehensive testing, proper error handling, and clear API documentation for integration testing success. Both Postman and curl proved to be valuable tools for different testing scenarios.

---

## 11. Recommendations

1. **API Documentation:** Add OpenAPI/Swagger documentation to the API for easier onboarding
2. **Validation:** Enhance validation with more descriptive error messages
3. **Testing:** Implement automated tests using Postman's testing framework
4. **Monitoring:** Add logging to track all API calls and responses
5. **Security:** Implement authentication (API keys, JWT) for production use

