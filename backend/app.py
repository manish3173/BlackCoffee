from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB URI if running remotely
db = client['visualization_dashboard']  # Database name
collection = db['data']  # Collection name

# Endpoint to fetch all data with optional filters
@app.route('/api/data', methods=['GET'])
def get_data():
    filters = {}
    
    # Add filters from query parameters
    if 'end_year' in request.args and request.args['end_year']:
        filters['end_year'] = request.args['end_year']
    if 'topic' in request.args and request.args['topic']:
        filters['topic'] = {"$regex": request.args['topic'], "$options": "i"}  # Case-insensitive search
    if 'sector' in request.args and request.args['sector']:
        filters['sector'] = {"$regex": request.args['sector'], "$options": "i"}
    if 'region' in request.args and request.args['region']:
        filters['region'] = {"$regex": request.args['region'], "$options": "i"}
    if 'pestle' in request.args and request.args['pestle']:
        filters['pestle'] = {"$regex": request.args['pestle'], "$options": "i"}
    if 'source' in request.args and request.args['source']:
        filters['source'] = {"$regex": request.args['source'], "$options": "i"}

    # Fetch data from MongoDB
    data = list(collection.find(filters, {"_id": 0}))  # Exclude the MongoDB-specific _id field

    return jsonify(data)

# Endpoint to add data (Optional, for initial setup or testing)
@app.route('/api/data', methods=['POST'])
def add_data():
    new_data = request.json
    if isinstance(new_data, list):
        collection.insert_many(new_data)
    else:
        collection.insert_one(new_data)
    return jsonify({"message": "Data added successfully!"}), 201

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
