
---

# Waitlist App 🚀 (hands on next js)

A simple, aesthetic waitlist application built with Django Ninja API (backend) and Shadcn UI in Next.js (frontend). This project marks my journey from Django’s Jinja templates to the power of Next.js, driven by the beautiful Shadcn UI.

## 🖥️ Tech Stack

- **Backend**: Django Ninja API
- **Frontend**: Next.js + Shadcn UI
- **Database**: Neon Serverless PostgreSQL
- **Deployment**: Hosted on Railway

## ✨ Features

1. **User Registration**: Allow users to join a waitlist with essential details.
2. **View Waitlist**: Admin access to see the list of registered users.
3. **Aesthetic UI**: Leveraging Shadcn’s beautiful components for a smooth, modern user experience.

## 📚 Motivation

The major motivation behind using Shadcn UI is its aesthetic appeal, making it far more enjoyable to design interfaces. Transitioning from Django’s Jinja templates to Next.js has been an exciting challenge, and Shadcn UI has made it well worth the effort.

## 🛠️ Setup

### 1. **Clone the repository**:
   ```bash
   git clone https://github.com/ARYANK-08/django-nextjs.git
   cd src
   ```

### 2. **Backend Setup** (Django):
   - **Configure Neon PostgreSQL**:
     - Sign up at [Neon](https://neon.tech/) and create a new project.
     - Get your PostgreSQL connection URL from Neon and add it to your Django settings:
       ```python
       DATABASES = {
           'default': {
               'ENGINE': 'django.db.backends.postgresql',
               'NAME': 'your_database_name',
               'USER': 'your_username',
               'PASSWORD': 'your_password',
               'HOST': 'your_neon_host',
               'PORT': 'your_neon_port',
           }
       }
       ```
   - **Install dependencies and run migrations**:
     ```bash
     cd backend
     python -m venv env
     source env/bin/activate
     pip install -r requirements.txt
     python manage.py migrate
     python manage.py runserver
     ```

### 3. **Frontend Setup** (Next.js):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🚀 Deployment

### **Backend on Railway**:
   - Sign up at [Railway](https://railway.app/) and create a new project.
   - Connect your GitHub repository and add your Django app.
   - Add environment variables for Django (e.g., `DATABASE_URL` for Neon PostgreSQL and `SECRET_KEY`).
   - Deploy your app, and Railway will manage the hosting and scaling.

### **Frontend on Vercel** (or continue with Railway):
   - If preferred, deploy the Next.js frontend on [Vercel](https://vercel.com/) for streamlined deployment.
   - Vercel offers automatic Next.js optimizations and deploys directly from GitHub.

## 🖼️ UI Preview

Shadcn UI in action gives a modern, polished feel to the waitlist application. Run both servers locally and visit `localhost:3000` to preview, or check out the live site on Vercel.

---
