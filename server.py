from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/')
def home():
    # Load data from the JSON file
    with open('data.json', 'r') as file:
        data = json.load(file)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
