# Triangle API

A Flask-based REST API for triangle classification and CRUD operations. Used for integration testing with Postman.

## Setup Instructions

### 1. Install Python Dependencies

Open PowerShell in the `triangle_api` directory and run:

```powershell
pip install -r requirements.txt
```

### 2. Run the API Server

```powershell
python app.py
```

You should see output like:
```
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
- **GET** `/health`
  - Returns: API status and total triangle count

### GET Operations

#### Get All Triangles
- **GET** `/triangles`
- **Response (200):**
```json
{
  "success": true,
  "count": 2,
  "triangles": [
    {
      "id": "1",
      "side_a": 3,
      "side_b": 4,
      "side_c": 5,
      "type": "Scalene",
      "is_valid": true
    }
  ]
}
```

#### Get Specific Triangle
- **GET** `/triangles/{id}`
- **Response (200):**
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
- **Response (404):** Triangle not found

### POST Operations

#### Create Triangle
- **POST** `/triangles`
- **Request Body:**
```json
{
  "side_a": 5,
  "side_b": 5,
  "side_c": 5
}
```
- **Response (201):**
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
- **Response (400):** Missing fields or invalid data types
```json
{
  "success": false,
  "error": "Missing required fields. Need: ['side_a', 'side_b', 'side_c']"
}
```

### PUT Operations

#### Update Triangle
- **PUT** `/triangles/{id}`
- **Request Body:** (any combination of fields)
```json
{
  "side_a": 6,
  "side_b": 6,
  "side_c": 6
}
```
- **Response (200):**
```json
{
  "success": true,
  "message": "Triangle updated successfully",
  "id": "2",
  "side_a": 6,
  "side_b": 6,
  "side_c": 6,
  "type": "Equilateral",
  "is_valid": true
}
```
- **Response (404):** Triangle not found

### DELETE Operations

#### Delete Triangle
- **DELETE** `/triangles/{id}`
- **Response (200):**
```json
{
  "success": true,
  "message": "Triangle deleted successfully",
  "deleted": {
    "id": "1",
    "side_a": 3,
    "side_b": 4,
    "side_c": 5
  }
}
```
- **Response (404):** Triangle not found

## Triangle Validation Rules

- **Valid Triangles:** All sides > 0 and triangle inequality theorem holds (sum of any two sides > third side)
- **Triangle Types:**
  - **Equilateral:** All three sides equal
  - **Isosceles:** Two sides equal
  - **Scalene:** All sides different

## Data Persistence

Triangles are automatically saved to `triangles_data.json` in the `triangle_api` directory. Data persists between API restarts.

## Testing with curl

```bash
# Health check
curl http://localhost:5000/api/health

# Create triangle
curl -X POST http://localhost:5000/api/triangles \
  -H "Content-Type: application/json" \
  -d "{\"side_a\": 3, \"side_b\": 4, \"side_c\": 5}"

# Get all triangles
curl http://localhost:5000/api/triangles

# Get specific triangle
curl http://localhost:5000/api/triangles/1

# Update triangle
curl -X PUT http://localhost:5000/api/triangles/1 \
  -H "Content-Type: application/json" \
  -d "{\"side_a\": 5, \"side_b\": 5, \"side_c\": 5}"

# Delete triangle
curl -X DELETE http://localhost:5000/api/triangles/1
```

## Next Steps

1. Install dependencies: `pip install -r requirements.txt`
2. Run the API: `python app.py`
3. Import endpoints into Postman
4. Create Postman collection with environment variables
5. Test all CRUD operations
6. Document API responses and error handling
