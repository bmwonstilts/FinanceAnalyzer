# backend/app/models.py
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    paystubs = db.relationship('Paystub', backref='user', lazy=True)
    bank_statements = db.relationship('BankStatement', backref='user', lazy=True)
    transactions = db.relationship('Transaction', backref='user', lazy=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
class Paystub(db.Model):
    __tablename__ = 'paystubs'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    file_path = db.Column(db.String(256), nullable=False)
    income_amount = db.Column(db.Float, nullable=False)
    pay_date = db.Column(db.Date, nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Additional fields for detailed income breakdown
    gross_pay = db.Column(db.Float)
    net_pay = db.Column(db.Float)
    deductions = db.Column(db.Float)
    taxes = db.Column(db.Float)

class BankStatement(db.Model):
    __tablename__ = 'bank_statements'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    file_path = db.Column(db.String(256), nullable=False)
    statement_date = db.Column(db.Date, nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    transactions = db.relationship('Transaction', backref='statement', lazy=True)

class Transaction(db.Model):
    __tablename__ = 'transactions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    statement_id = db.Column(db.Integer, db.ForeignKey('bank_statements.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(256))
    category = db.Column(db.String(50))
    transaction_type = db.Column(db.String(20))  # 'debit' or 'credit'
    is_recurring = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date.isoformat(),
            'amount': self.amount,
            'description': self.description,
            'category': self.category,
            'transaction_type': self.transaction_type,
            'is_recurring': self.is_recurring
        }