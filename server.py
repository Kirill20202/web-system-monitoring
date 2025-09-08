<<<<<<< HEAD
from flask import Flask, jsonify
import subprocess
import os

app = Flask(__name__, static_folder='static')
=======
from flask import Flask, jsonify, send_from_directory
import subprocess
import os

app = Flask(__name__, static_folder='static', static_url_path='')
>>>>>>> b15bdcc (redact)

BIN_DIR = "./bin"

@app.route('/api/uptime')
def get_uptime():
<<<<<<< HEAD
    try:
        result = subprocess.check_output([os.path.join(BIN_DIR, "sys_uptime")], text=True)
=======
    bin_path = os.path.join(BIN_DIR, "sys_uptime")
    try:
        if not os.path.exists(bin_path):
            return jsonify({"error": "Binary not found. Run 'make build' first."}), 500
        result = subprocess.check_output([bin_path], text=True)
>>>>>>> b15bdcc (redact)
        return jsonify({"uptime": result.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def index():
<<<<<<< HEAD
    return app.send_static_file('index.html')
=======
    return send_from_directory('static', 'index.html')

# Это нужно, чтобы Flask отдавал CSS/JS из /static/
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)
>>>>>>> b15bdcc (redact)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)