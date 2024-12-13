from pymongo import MongoClient
import json
from config import MONGO_URI, DATABASE_NAME, COLLECTION_NAME

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

# Load data from JSON file
with open('jsondata.json', 'r') as file:
    data = json.load(file)
    if isinstance(data, list):
        collection.insert_many(data)
    else:
        collection.insert_one(data)

print("Data imported successfully!")

