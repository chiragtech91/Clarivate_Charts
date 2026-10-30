import json
from http.server import BaseHTTPRequestHandler

from backend.data import load_medicine_data


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        response_body = json.dumps(load_medicine_data()).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(response_body)))
        self.end_headers()
        self.wfile.write(response_body)
