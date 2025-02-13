# backend/app/middleware/cors.py
from flask import request, current_app

def cors_middleware():
    def middleware():
        if request.method == 'OPTIONS':
            headers = {
                'Access-Control-Allow-Origin': current_app.config['CORS_ORIGIN'],
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '3600'
            }
            return '', 204, headers
            
        @request.after_this_request
        def after_request(response):
            response.headers['Access-Control-Allow-Origin'] = current_app.config['CORS_ORIGIN']
            return response
            
    return middleware