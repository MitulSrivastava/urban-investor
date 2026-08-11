import http.server
import socketserver
import os
import sys

# Default port is 3000, can be overridden by passing an argument (e.g., python3 server.py 8080)
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000

class CleanURLRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Translate the requested path to a local file system path
        path = self.translate_path(self.path)
        
        # If the requested path is not a file/directory, but path.html exists, serve the .html file instead
        if not os.path.exists(path) and os.path.exists(path + ".html"):
            self.path += ".html"
            
        return super().do_GET()

# Set up the server
with socketserver.TCPServer(("", PORT), CleanURLRequestHandler) as httpd:
    print(f"🚀 Local Development Server running!")
    print(f"👉 Local URL: http://localhost:{PORT}")
    print(f"✅ Clean URLs (like /about instead of /about.html) are fully supported.")
    print(f"Press Ctrl+C to stop the server.")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
