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

@app.route('/api/loadavg')
def get_loadavg():
    bin_path = os.path.join(BIN_DIR, "sys_loadavg")
    try:
        if not os.path.exists(bin_path):
            return jsonify({"error": "Binary not found. Run 'make build' first."}), 500
        result = subprocess.check_output([bin_path], text=True)
        loads = result.strip().split(", ")
        return jsonify({
            "load1": loads[0],
            "load5": loads[1],
            "load15": loads[2]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/meminfo')
def get_meminfo():
    bin_path = os.path.join(BIN_DIR, "sys_meminfo")
    try:
        if not os.path.exists(bin_path):
            return jsonify({"error": "Meminfo binary not found. Run 'make build'."}), 500
        result = subprocess.check_output([bin_path], text=True).strip()
        parts = result.split()
        if len(parts) != 3:
            return jsonify({"error": "Invalid output format"}), 500
        return jsonify({
            "mem_total_mb": int(parts[0]),
            "mem_free_mb": int(parts[1]),
            "mem_available_mb": int(parts[2])
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/top')
def get_top():
    bin_path = os.path.join(BIN_DIR, "sys_top")
    try:
        if not os.path.exists(bin_path):
            return jsonify({"error": "Top binary not found. Run 'make build'."}), 500
        result = subprocess.check_output([bin_path], text=True)
        # Разбиваем на строки
        lines = result.strip().split('\n')
        return jsonify({"processes": lines})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Это нужно, чтобы Flask отдавал CSS/JS из /static/
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)