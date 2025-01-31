from pymongo import MongoClient
from config import MONGO_URI, DATABASE_NAME

# Initialize MongoDB connection
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

def get_collection(collection_name):
    return db[collection_name]
