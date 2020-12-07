from flask import Flask, request, jsonify
# from flask_cors import CORS
import json

app = Flask(__name__)

# CORS(app)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
@app.route("/api/todo/", methods=["POST", "GET"])

def todo():
    print("todo called")
    if request.method == "GET":
        with open("task.json", "r") as reader:
            data = json.load(reader)
            print(data)
            # reader.close
            # print("hello")
            return jsonify(data),200
    return "<h1>Bad request</h1>",400


@app.route("/api/update/", methods=["POST", "GET"])

def update():
    if request.method == "POST":
        data = request.json
        print(data)
        with open("task.json", "w") as writer:
            json.dump(data, writer)
            # writer.close
    return "<h1>Updated</h1>",200


if __name__ == "__main__":
    app.run()
