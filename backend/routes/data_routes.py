from flask import Blueprint, request, jsonify
from models.database.py import get_collection
from config import COLLECTION_NAME

data_routes = Blueprint('data_routes', __name__)

# Get the MongoDB collection
collection = get_collection(COLLECTION_NAME)

@data_routes.route('/api/data', methods=['GET'])
def get_data():
    filters = {}

    # Extract filters from request args
    if 'end_year' in request.args and request.args['end_year']:
        filters['end_year'] = request.args['end_year']
    if 'topic' in request.args and request.args['topic']:
        filters['topic'] = {"$regex": request.args['topic'], "$options": "i"}
    if 'sector' in request.args and request.args['sector']:
        filters['sector'] = {"$regex": request.args['sector'], "$options": "i"}
    if 'region' in request.args and request.args['region']:
        filters['region'] = {"$regex": request.args['region'], "$options": "i"}
    if 'pestle' in request.args and request.args['pestle']:
        filters['pestle'] = {"$regex": request.args['pestle'], "$options": "i"}
    if 'source' in request.args and request.args['source']:
        filters['source'] = {"$regex": request.args['source'], "$options": "i"}

    # Fetch data from MongoDB
    data = list(collection.find(filters, {"_id": 0}))
    return jsonify(data)

@data_routes.route('/api/data', methods=['POST'])
def add_data():
    new_data = request.json
    if isinstance(new_data, list):
        collection.insert_many(new_data)
    else:
        collection.insert_one(new_data)
    return jsonify({"message": "Data added successfully!"}), 201
