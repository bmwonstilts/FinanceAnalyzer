# backend/app/middleware/auth.py
from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from ..models import User

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            user = User.query.get(user_id)
            
            if not user or not user.is_admin:
                return jsonify({"msg": "Admin access required"}), 403
            
            return fn(*args, **kwargs)
        return decorator
    return wrapper

# backend/app/middleware/error_handler.py
from flask import jsonify
from werkzeug.exceptions import HTTPException
import traceback

def register_error_handlers(app):
    @app.errorhandler(HTTPException)
    def handle_http_error(error):
        response = {
            "error": {
                "code": error.code,
                "name": error.name,
                "description": error.description,
            }
        }
        return jsonify(response), error.code

    @app.errorhandler(Exception)
    def handle_generic_error(error):
        # Log the full error traceback
        app.logger.error(f"Unhandled exception: {traceback.format_exc()}")
        
        response = {
            "error": {
                "code": 500,
                "name": "Internal Server Error",
                "description": str(error) if app.debug else "An unexpected error occurred",
            }
        }
        return jsonify(response), 500