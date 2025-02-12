# Paystub and Bank Statement Analyzer

A self-hostable web application for uploading paystubs and bank statements, categorizing transactions, and tracking income.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Frontend Components](#frontend-components)
7. [Data Analysis Workflow](#data-analysis-workflow)
8. [File Storage](#file-storage)
9. [Authentication](#authentication)
10. [Deployment](#deployment)
11. [Development Milestones](#development-milestones)
12. [Future Enhancements](#future-enhancements)

---

## Project Overview
The goal of this project is to build a self-hostable web application that allows users to:
- Upload paystubs (PDF) and bank statements (CSV/PDF).
- Automatically extract and analyze transaction data.
- Categorize transactions (e.g., groceries, rent, utilities).
- Track income and expenses over time.
- Visualize data through charts and dashboards.

---

## Tech Stack
### Backend
- **Framework**: Flask (Python)
- **Database**: PostgreSQL
- **File Storage**: Local storage (or AWS S3 for cloud)
- **Data Analysis**: Pandas, NumPy
- **Authentication**: JWT (JSON Web Tokens)

### Frontend
- **Framework**: React.js
- **Charting**: Chart.js
- **Styling**: Tailwind CSS or Bootstrap

### Deployment
- **Hosting**: Self-hosted on a VPS (e.g., DigitalOcean, Linode)
- **Containerization**: Docker
- **Web Server**: Nginx
- **SSL**: Let’s Encrypt

---

## Features
### Core Features
1. **User Authentication**:
   - Sign up, log in, and manage user accounts.
2. **File Upload**:
   - Upload paystubs (PDF) and bank statements (CSV/PDF).
3. **Data Extraction**:
   - Extract data from PDFs (OCR) and parse CSV files.
4. **Transaction Categorization**:
   - Automatically categorize transactions using predefined rules.
5. **Income Tracking**:
   - Track income from paystubs and match it with bank deposits.
6. **Dashboard**:
   - Visualize income, expenses, and savings using charts.
7. **Export Data**:
   - Export analyzed data as CSV or Excel.

### Stretch Features
- Machine learning for transaction categorization.
- Email/SMS notifications for unusual spending.
- Multi-user support with role-based access.

---

## Database Schema
### Tables
1. **Users**
   - `id`: Primary Key
   - `username`: Unique username
   - `email`: Unique email
   - `password_hash`: Hashed password
   - `created_at`: Timestamp

2. **Paystubs**
   - `id`: Primary Key
   - `user_id`: Foreign Key (Users)
   - `file_path`: Path to uploaded paystub
   - `income_amount`: Extracted income amount
   - `uploaded_at`: Timestamp

3. **Bank Statements**
   - `id`: Primary Key
   - `user_id`: Foreign Key (Users)
   - `file_path`: Path to uploaded statement
   - `uploaded_at`: Timestamp

4. **Transactions**
   - `id`: Primary Key
   - `user_id`: Foreign Key (Users)
   - `date`: Transaction date
   - `amount`: Transaction amount
   - `category`: Transaction category (e.g., groceries, rent)
   - `description`: Transaction description
   - `statement_id`: Foreign Key (Bank Statements)

---

## API Endpoints
### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in and receive a JWT token.

### File Upload
- `POST /api/upload/paystub`: Upload a paystub (PDF).
- `POST /api/upload/statement`: Upload a bank statement (CSV/PDF).

### Data Analysis
- `GET /api/transactions`: Get all transactions for the logged-in user.
- `POST /api/transactions/categorize`: Categorize transactions.

### Dashboard
- `GET /api/dashboard/summary`: Get income, expenses, and savings summary.
- `GET /api/dashboard/charts`: Get data for charts.

---

## Frontend Components
### Pages
1. **Login/Signup Page**:
   - Forms for user authentication.
2. **Dashboard Page**:
   - Charts and summaries for income and expenses.
3. **Upload Page**:
   - Forms for uploading paystubs and bank statements.
4. **Transactions Page**:
   - Table of categorized transactions.
5. **Export Page**:
   - Options to export data as CSV or Excel.

### Components
- **Navbar**: Navigation bar with links to all pages.
- **FileUploadForm**: Form for uploading files.
- **TransactionTable**: Table to display transactions.
- **ChartComponent**: Reusable chart component (e.g., bar chart, pie chart).

---

## Data Analysis Workflow
1. **Paystub Processing**:
   - Extract text from PDF using OCR.
   - Parse income amount and date.
2. **Bank Statement Processing**:
   - Parse CSV or extract data from PDF.
   - Categorize transactions using predefined rules.
3. **Data Aggregation**:
   - Calculate total income, expenses, and savings.
   - Generate insights (e.g., spending trends).

---

## File Storage
- Store uploaded files in a dedicated directory (e.g., `uploads/`).
- Use unique filenames to avoid conflicts.
- Optionally, integrate with AWS S3 for cloud storage.

---

## Authentication
- Use JWT for stateless authentication.
- Store JWT in HTTP-only cookies for security.
- Implement middleware to protect routes.

---

## Deployment
1. **Set Up VPS**:
   - Create a VPS instance (e.g., DigitalOcean).
   - Install Docker and Docker Compose.
2. **Dockerize App**:
   - Create `Dockerfile` for backend and frontend.
   - Use `docker-compose.yml` to manage services (app, database, Nginx).
3. **Configure Nginx**:
   - Set up reverse proxy for the app.
   - Configure SSL using Let’s Encrypt.
4. **Deploy**:
   - Push code to Git repository.
   - Pull code on VPS and start Docker containers.

---

## Development Milestones
### Phase 1: Backend
- Set up Flask backend.
- Implement user authentication.
- Create file upload endpoints.

### Phase 2: Frontend
- Build React frontend.
- Implement file upload UI.
- Create dashboard and transaction pages.

### Phase 3: Data Analysis
- Implement paystub and bank statement processing.
- Categorize transactions.
- Generate insights and charts.

### Phase 4: Deployment
- Dockerize the app.
- Deploy to VPS.
- Configure Nginx and SSL.

---

## Future Enhancements
- Add machine learning for transaction categorization.
- Implement email/SMS notifications.
- Build a mobile app using React Native.
- Add multi-user support with role-based access.

---

## Git Repository Structure
paystub-analyzer/
├── backend/
│ ├── app/
│ │ ├── init.py
│ │ ├── models.py
│ │ ├── routes.py
│ │ └── utils.py
│ ├── requirements.txt
│ └── Dockerfile
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ └── Dockerfile
├── docker-compose.yml
├── README.md
└── .gitignore

---

## Getting Started
1. Clone the repository.
2. Set up the backend and frontend as described in the README.
3. Start developing features based on the milestones.

---

## Contributing
- Fork the repository.
- Create a new branch for your feature.
- Submit a pull request with detailed descriptions.

---

## License
MIT License
