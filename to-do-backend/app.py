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
    global TODOS
    data = request.get_json()

    if data["id"] in [todo["id"] for todo in TODOS]:
        TODOS = [({"id": data["id"], "taskTitle": data["taskTitle"], "done": data["done"]} if todo["id"] == data["id"] else todo) for todo in TODOS]
    else:
        TODOS.append(data)

    return {"success": True, "addedTitle": data["taskTitle"], "addedId": data["id"]}

@app.route("/todos/del", methods=["DELETE"])
def delTODO():
    global TODOS
    id = request.args.get("id", default=1, type=int)
    TODOS = [todo for todo in TODOS if todo["id"] != id]
    return {"success": True, "deletedId": id}


@app.route("/todos/done", methods=["PATCH"])
def toggleDoneTODO():
    global TODOS
    id = request.args.get("id", default=1, type=int)
    # print(id)
    TODOS = [
        {**todo, "done": not todo["done"]} 
        if todo["id"] == id else todo 
        for todo in TODOS
        ]
    return {"success": True, "toggledId": id}