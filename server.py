from flask import Flask, jsonify
import subprocess
import os

app = Flask(__name__, static_folder='static')

BIN_DIR = "./bin"

@app.route('/api/uptime')
def get_uptime():
    try:
        result = subprocess.check_output([os.path.join(BIN_DIR, "sys_uptime")], text=True)
        return jsonify({"uptime": result.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)