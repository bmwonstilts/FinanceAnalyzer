# backend/app/middleware/request_logger.py
import time
from flask import request, g
import logging

logger = logging.getLogger(__name__)

def request_logger():
    def middleware():
        g.start_time = time.time()
        
        @request.after_this_request
        def after_request(response):
            if request.path.startswith('/static'):
                return response
                
            total_time = time.time() - g.start_time
            log_data = {
                'method': request.method,
                'path': request.path,
                'status': response.status_code,
                'duration': f'{total_time:.2f}s',
                'ip': request.remote_addr,
            }
            
            logger.info(f"Request completed: {log_data}")
            return response
            
    return middleware