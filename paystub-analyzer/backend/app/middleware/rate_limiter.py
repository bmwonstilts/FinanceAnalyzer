# backend/app/middleware/rate_limiter.py
from flask import request, jsonify
from functools import wraps
import time
from collections import defaultdict

class RateLimiter:
    def __init__(self, requests_per_minute=60):
        self.requests_per_minute = requests_per_minute
        self.requests = defaultdict(list)
    
    def is_rate_limited(self, ip):
        now = time.time()
        minute_ago = now - 60
        
        # Remove old requests
        self.requests[ip] = [req_time for req_time in self.requests[ip] 
                           if req_time > minute_ago]
        
        # Check if rate limit is exceeded
        if len(self.requests[ip]) >= self.requests_per_minute:
            return True
        
        # Add new request
        self.requests[ip].append(now)
        return False

rate_limiter = RateLimiter()

def rate_limit():
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            if rate_limiter.is_rate_limited(request.remote_addr):
                return jsonify({
                    "error": "Too many requests",
                    "message": "Please try again later"
                }), 429
            return f(*args, **kwargs)
        return wrapped
    return decorator