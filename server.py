from flask import Flask, jsonify, send_from_directory
import subprocess
import os

app = Flask(__name__, static_folder='static', static_url_path='')

BIN_DIR = "./bin"

@app.route('/api/uptime')
def get_uptime():
    bin_path = os.path.join(BIN_DIR, "sys_uptime")
    try:
        if not os.path.exists(bin_path):
            return jsonify({"error": "Binary not found. Run 'make build' first."}), 500
        result = subprocess.check_output([bin_path], text=True)
        return jsonify({"uptime": result.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

# Это нужно, чтобы Flask отдавал CSS/JS из /static/
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)