from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message from the backend"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    if body is None:
        return jsonify({"msg": "Body is required"}), 400
    if 'email' not in body:
        return jsonify({"msg": "Email is required"}), 400
    if 'password' not in body:
        return jsonify({"msg": "Password is required"}), 400

    existing_user = User.query.filter_by(email=body['email']).first()
    if existing_user:
        return jsonify({"msg": "User already exists"}), 400

    new_user = User()
    new_user.email = body['email']
    new_user.password = body['password']
    new_user.is_active = True
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "User created successfully", "user": new_user.serialize()}), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if body is None:
        return jsonify({"msg": "Body is required"}), 400
    
    user = User.query.filter_by(email=body['email']).first()
    if user is None or user.password != body['password']:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "msg": "Login successful",
        "token": access_token,
        "user": user.serialize()
    }), 200
    
