\# 💄 Makeup E-commerce Store



A complete makeup e-commerce platform with Django backend and React frontend.



\## 📁 Project Structure

makeup-ecommerce/

├── backend/ # Django REST API

│ ├── makeup/ # Django project

│ ├── products/ # Products app

│ ├── manage.py

│ └── requirements.txt

├── frontend/ # React application

│ ├── public/

│ ├── src/

│ │ ├── components/

│ │ ├── pages/

│ │ ├── context/

│ │ ├── services/

│ │ ├── App.js

│ │ └── index.js

│ ├── package.json

│ └── package-lock.json

├── .gitignore

└── README.md





\## 🚀 Quick Start



\### Backend Setup

```bash

cd backend

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver



\## Frontend Setup

cd frontend

npm install

npm start



\## Features

Product listing with filters

Shopping cart

User authentication

Checkout process

Responsive design



\## Tech Stack

Backend: Django, Django REST Framework

Frontend: React, Bootstrap

Database: SQLite

Authentication: JWT



\## Contact

Your Name - your.email@example.com



\# \*\* .gitignore



```gitignore

\# Django

\*.pyc

\*\_\_pycache\_\_/

\*.sqlite3

\*.log

venv/

.env

.env.local



\# Node/React

node\_modules/

npm-debug.log\*

build/

dist/



\# React Specific

frontend/build/

frontend/.env



\# Django Specific

backend/db.sqlite3

backend/\_\_pycache\_\_/



\# IDE

.vscode/

.idea/



\# OS

.DS\_Store

Thumbs.db



\# Environment variables

.env

.env.local



\# Media files

media/

uploads/





