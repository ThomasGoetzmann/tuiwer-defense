#!/usr/bin/env python3
"""Serve the course on localhost and keep progress in course/.progress.json (git-ignored)."""
import json
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
STORE = ROOT / ".progress.json"
LESSON = re.compile(r"^\d+\.\d+$")


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def _json(self, status, body):
        data = json.dumps(body).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path == "/api/progress":
            try:
                done = json.loads(STORE.read_text())["done"]
            except (OSError, ValueError, KeyError):
                done = []
            return self._json(200, {"done": done})
        return super().do_GET()

    def do_POST(self):
        if self.path != "/api/progress":
            return self._json(404, {"error": "not found"})
        try:
            size = int(self.headers.get("Content-Length", 0))
            done = json.loads(self.rfile.read(min(size, 65536)))["done"]
            if not all(isinstance(x, str) and LESSON.match(x) for x in done):
                raise ValueError
        except (ValueError, KeyError, TypeError):
            return self._json(400, {"error": "expected {\"done\": [\"0.1\", ...]}"})
        STORE.write_text(json.dumps({"done": sorted(set(done))}, indent=2) + "\n")
        return self._json(200, {"ok": True})


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8000), Handler)
    print("Course on http://localhost:8000 (progress file: course/.progress.json)")
    server.serve_forever()
