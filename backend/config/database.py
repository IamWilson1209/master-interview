from pymongo import MongoClient

client = MongoClient("mongodb+srv://zenfonlee:qaz777777@cluster0.57xtvzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client.todo_db

collection_name = db["todo_collection"]