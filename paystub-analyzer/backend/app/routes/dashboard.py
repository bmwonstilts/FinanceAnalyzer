# backend/app/routes/dashboard.py
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import db, Transaction, Paystub
from sqlalchemy import func
from datetime import datetime, timedelta

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/summary', methods=['GET'])
@jwt_required()
def get_dashboard_summary():
    current_user_id = get_jwt_identity()
    
    # Get date range for last 6 months
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=180)
    
    # Calculate totals
    income_total = db.session.query(func.sum(Paystub.income_amount))\
        .filter(Paystub.user_id == current_user_id)\
        .scalar() or 0
        
    expenses_total = db.session.query(func.sum(Transaction.amount))\
        .filter(Transaction.user_id == current_user_id)\
        .filter(Transaction.amount < 0)\
        .scalar() or 0
        
    # Get monthly data
    monthly_data = db.session.query(
        func.date_trunc('month', Transaction.date).label('month'),
        func.sum(Transaction.amount).label('amount')
    ).filter(
        Transaction.user_id == current_user_id,
        Transaction.date >= start_date
    ).group_by('month').all()
    
    # Get category breakdown
    category_breakdown = db.session.query(
        Transaction.category,
        func.sum(Transaction.amount).label('amount')
    ).filter(
        Transaction.user_id == current_user_id,
        Transaction.amount < 0
    ).group_by(Transaction.category).all()
    
    return jsonify({
        'totalIncome': abs(income_total),
        'totalExpenses': abs(expenses_total),
        'netSavings': income_total + expenses_total,
        'monthlyData': [
            {
                'month': data.month.strftime('%Y-%m'),
                'amount': abs(data.amount)
            } for data in monthly_data
        ],
        'categoryBreakdown': [
            {
                'name': cat.category,
                'amount': abs(cat.amount)
            } for cat in category_breakdown
        ]
    })

@dashboard_bp.route('/trends', methods=['GET'])
@jwt_required()
def get_spending_trends():
    current_user_id = get_jwt_identity()
    
    # Calculate month-over-month changes
    current_month = datetime.utcnow().replace(day=1)
    last_month = current_month - timedelta(days=1)
    
    current_spending = db.session.query(func.sum(Transaction.amount))\
        .filter(Transaction.user_id == current_user_id)\
        .filter(Transaction.date >= current_month)\
        .scalar() or 0
        
    last_month_spending = db.session.query(func.sum(Transaction.amount))\
        .filter(Transaction.user_id == current_user_id)\
        .filter(Transaction.date >= last_month)\
        .filter(Transaction.date < current_month)\
        .scalar() or 0
    
    return jsonify({
        'currentMonthSpending': abs(current_spending),
        'lastMonthSpending': abs(last_month_spending),
        'percentageChange': (
            ((current_spending - last_month_spending) / last_month_spending * 100)
            if last_month_spending != 0 else 0
        )
    })