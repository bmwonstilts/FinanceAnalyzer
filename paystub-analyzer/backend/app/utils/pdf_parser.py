# backend/app/utils/pdf_parser.py
import pdfplumber
import re
from datetime import datetime
from typing import Dict, Any, Optional

class PDFParser:
    def __init__(self, file_path: str):
        self.file_path = file_path
    
    def parse_paystub(self) -> Dict[str, Any]:
        """
        Extract relevant information from a paystub PDF.
        Returns a dictionary containing income details.
        """
        try:
            with pdfplumber.open(self.file_path) as pdf:
                text = ''
                for page in pdf.pages:
                    text += page.extract_text()
                
                # Extract amounts using regex
                gross_pay = self._extract_amount(text, r'Gross\s+Pay[:\s]+\$?([\d,]+\.\d{2})')
                net_pay = self._extract_amount(text, r'Net\s+Pay[:\s]+\$?([\d,]+\.\d{2})')
                
                # Extract date
                pay_date = self._extract_date(text)
                
                return {
                    'gross_pay': gross_pay,
                    'net_pay': net_pay,
                    'pay_date': pay_date,
                    'success': True
                }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def parse_bank_statement(self) -> Dict[str, Any]:
        """
        Extract transactions from a bank statement PDF.
        Returns a dictionary containing transaction details.
        """
        try:
            transactions = []
            with pdfplumber.open(self.file_path) as pdf:
                for page in pdf.pages:
                    text = page.extract_text()
                    # Find transaction rows using regex
                    transaction_pattern = r'(\d{2}/\d{2}/\d{4})\s+(.*?)\s+(\-?\$[\d,]+\.\d{2})'
                    matches = re.finditer(transaction_pattern, text)
                    
                    for match in matches:
                        date_str, description, amount_str = match.groups()
                        amount = float(amount_str.replace('$', '').replace(',', ''))
                        
                        transactions.append({
                            'date': datetime.strptime(date_str, '%m/%d/%Y').date(),
                            'description': description.strip(),
                            'amount': amount
                        })
            
            return {
                'transactions': transactions,
                'success': True
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def _extract_amount(self, text: str, pattern: str) -> Optional[float]:
        """Helper method to extract amount using regex pattern."""
        match = re.search(pattern, text)
        if match:
            amount_str = match.group(1).replace(',', '')
            return float(amount_str)
        return None
    
    def _extract_date(self, text: str) -> Optional[datetime.date]:
        """Helper method to extract date from text."""
        date_pattern = r'Pay\s+Date[:\s]+(\d{2}/\d{2}/\d{4})'
        match = re.search(date_pattern, text)
        if match:
            date_str = match.group(1)
            return datetime.strptime(date_str, '%m/%d/%Y').date()
        return None