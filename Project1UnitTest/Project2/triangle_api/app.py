from flask import Flask, request, jsonify
from flask_cors import CORS
from triangle_model import Triangle, InvalidTriangleException
import json
import os

app = Flask(__name__)
CORS(app)

# In-memory database for triangles
triangles_db = {}
next_id = 1

# Path to persist data in JSON file
DATA_FILE = "triangles_data.json"

def load_data():
    """Load triangles from file"""
    global triangles_db, next_id
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
            triangles_db = data.get('triangles', {})
            next_id = data.get('next_id', 1)

def save_data():
    """Save triangles to file"""
    with open(DATA_FILE, 'w') as f:
        json.dump({'triangles': triangles_db, 'next_id': next_id}, f, indent=2)

# Load data on startup
load_data()

# ============= GET ENDPOINTS =============

@app.route('/api/triangles', methods=['GET'])
def get_all_triangles():
    """Get all triangles"""
    triangles_list = []
    for tid, data in triangles_db.items():
        triangles_list.append({
            'id': tid,
            'side_a': data['side_a'],
            'side_b': data['side_b'],
            'side_c': data['side_c'],
            'type': data['type'],
            'is_valid': data['is_valid']
        })
    
    return jsonify({
        'success': True,
        'count': len(triangles_list),
        'triangles': triangles_list
    }), 200

@app.route('/api/triangles/<triangle_id>', methods=['GET'])
def get_triangle(triangle_id):
    """Get a specific triangle by ID"""
    if triangle_id not in triangles_db:
        return jsonify({
            'success': False,
            'error': f'Triangle with ID {triangle_id} not found'
        }), 404
    
    data = triangles_db[triangle_id]
    return jsonify({
        'success': True,
        'id': triangle_id,
        'side_a': data['side_a'],
        'side_b': data['side_b'],
        'side_c': data['side_c'],
        'type': data['type'],
        'is_valid': data['is_valid']
    }), 200

# ============= POST ENDPOINTS =============

@app.route('/api/triangles', methods=['POST'])
def create_triangle():
    """Create a new triangle"""
    global next_id
    
    try:
        # Validate request data
        content_type = request.headers.get('Content-Type', '')
        if 'application/json' not in content_type:
            return jsonify({
                'success': False,
                'error': 'Content-Type must be application/json'
            }), 400
        
        try:
            data = request.get_json(force=True, silent=False)
        except Exception as json_error:
            return jsonify({
                'success': False,
                'error': f'Invalid JSON in request body: {str(json_error)}'
            }), 400
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'Request body must contain JSON'
            }), 400
        
        # Check required fields - THIS IS BODY VALIDATION, NOT ROUTING
        required_fields = ['side_a', 'side_b', 'side_c']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({
                'success': False,
                'error': f'Missing required fields: {missing_fields}. Need all of: {required_fields}'
            }), 400
        
        # Validate data types
        try:
            side_a = float(data['side_a'])
            side_b = float(data['side_b'])
            side_c = float(data['side_c'])
        except (TypeError, ValueError):
            return jsonify({
                'success': False,
                'error': 'Sides must be numeric values'
            }), 400
        
        # Create triangle and validate
        triangle = Triangle(side_a, side_b, side_c)
        is_valid = triangle.is_valid()
        
        # Get type if valid
        triangle_type = None
        if is_valid:
            try:
                triangle_type = triangle.get_type()
            except InvalidTriangleException:
                is_valid = False
        
        # Store in database
        triangle_id = str(next_id)
        next_id += 1
        
        triangles_db[triangle_id] = {
            'side_a': side_a,
            'side_b': side_b,
            'side_c': side_c,
            'type': triangle_type,
            'is_valid': is_valid
        }
        
        save_data()
        
        return jsonify({
            'success': True,
            'message': 'Triangle created successfully',
            'id': triangle_id,
            'side_a': side_a,
            'side_b': side_b,
            'side_c': side_c,
            'type': triangle_type,
            'is_valid': is_valid
        }), 201
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============= PUT ENDPOINTS =============

@app.route('/api/triangles/<triangle_id>', methods=['PUT'])
def update_triangle(triangle_id):
    """Update an existing triangle"""
    try:
        if triangle_id not in triangles_db:
            return jsonify({
                'success': False,
                'error': f'Triangle with ID {triangle_id} not found'
            }), 404
        
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'error': 'Request body must be JSON'
            }), 400
        
        # Get values (use existing if not provided)
        old_data = triangles_db[triangle_id]
        side_a = data.get('side_a', old_data['side_a'])
        side_b = data.get('side_b', old_data['side_b'])
        side_c = data.get('side_c', old_data['side_c'])
        
        # Validate data types
        try:
            side_a = float(side_a)
            side_b = float(side_b)
            side_c = float(side_c)
        except (TypeError, ValueError):
            return jsonify({
                'success': False,
                'error': 'Sides must be numeric values'
            }), 400
        
        # Validate triangle
        triangle = Triangle(side_a, side_b, side_c)
        is_valid = triangle.is_valid()
        
        triangle_type = None
        if is_valid:
            try:
                triangle_type = triangle.get_type()
            except InvalidTriangleException:
                is_valid = False
        
        # Update database
        triangles_db[triangle_id] = {
            'side_a': side_a,
            'side_b': side_b,
            'side_c': side_c,
            'type': triangle_type,
            'is_valid': is_valid
        }
        
        save_data()
        
        return jsonify({
            'success': True,
            'message': 'Triangle updated successfully',
            'id': triangle_id,
            'side_a': side_a,
            'side_b': side_b,
            'side_c': side_c,
            'type': triangle_type,
            'is_valid': is_valid
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ============= DELETE ENDPOINTS =============

@app.route('/api/triangles/<triangle_id>', methods=['DELETE'])
def delete_triangle(triangle_id):
    """Delete a triangle"""
    if triangle_id not in triangles_db:
        return jsonify({
            'success': False,
            'error': f'Triangle with ID {triangle_id} not found'
        }), 404
    
    deleted = triangles_db.pop(triangle_id)
    save_data()
    
    return jsonify({
        'success': True,
        'message': 'Triangle deleted successfully',
        'deleted': {
            'id': triangle_id,
            'side_a': deleted['side_a'],
            'side_b': deleted['side_b'],
            'side_c': deleted['side_c']
        }
    }), 200

# ============= HEALTH CHECK =============

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'API is running',
        'total_triangles': len(triangles_db)
    }), 200

# ============= ERROR HANDLERS =============

@app.before_request
def log_request_info():
    """Log incoming request for debugging"""
    print(f"[REQUEST] {request.method} {request.path}")
    if request.method == 'POST':
        print(f"[CONTENT-TYPE] {request.headers.get('Content-Type', 'Not set')}")

@app.errorhandler(400)
def bad_request(e):
    """Handle 400 Bad Request"""
    return jsonify({
        'success': False,
        'error': f'Bad Request: {str(e)}'
    }), 400

@app.errorhandler(415)  # Unsupported Media Type
def unsupported_media_type(e):
    """Handle unsupported media type"""
    return jsonify({
        'success': False,
        'error': 'Content-Type must be application/json'
    }), 415

@app.errorhandler(404)
def not_found(e):
    """Handle 404 errors"""
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404

@app.errorhandler(405)
def method_not_allowed(e):
    """Handle 405 errors"""
    return jsonify({
        'success': False,
        'error': 'Method not allowed'
    }), 405

if __name__ == '__main__':
    app.run(debug=True, port=5000)
