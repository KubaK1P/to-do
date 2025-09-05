from flask import Flask, request
from flask_cors import CORS, cross_origin

TODOS = [{"id": 1, "taskTitle": "Learn Reactenen", "done": True}]

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@cross_origin
@app.route("/todos")
def todos():
    return TODOS

@app.route("/todos/add", methods=["POST"])
def addTODO():
    data = request.get_json()
    TODOS.append(data)
    return "string"

@app.route("/todos/del", methods=["DELETE"])
def delTODO():
    global TODOS
    id = request.args.get("id", default=1, type=int)
    TODOS = [todo for todo in TODOS if todo["id"] != id]
    return "OK"
