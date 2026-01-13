# Professional Portfolio & Admin CMS 🚀

This project is a high-performance, full-stack personal portfolio platform. It combines a beautiful, animated frontend for visitors with a powerful, secure Admin Dashboard for managing content.

## 📖 Table of Contents
1. [Prerequisites](#-prerequisites)
2. [Step-by-Step Installation](#-step-by-step-installation)
3. [Features & Functionality](#-features--functionality)
4. [Technology Stack](#-technology-stack)
5. [Docker & Database Management](#-docker--database-management)
6. [Security & Authentication](#-security--authentication)

---

## 📋 Prerequisites
Before you begin, ensure you have the following installed:
- **Docker Desktop**: [Download here](https://www.docker.com/products/docker-desktop/) (Essential for running the database and backend).
- **Node.js**: (Version 20+ if running without Docker).
- **Git**: To clone and manage your code.

---

## 🛠 Step-by-Step Installation

### 1. Clone the Project
Open your terminal and run:
```bash
git clone https://github.com/DDHDDHD3/portfolio.git
cd portfolio
```

### 2. Launching with Docker (Recommended)
This is the easiest way to start. It handles the Database, Backend, and Frontend automatically:
```bash
docker compose up --build
```
*Wait for the logs to show "Successfully connected to PostgreSQL database!"*

### 3. Accessing the Application
- **Personal Portfolio**: [http://localhost:4200](http://localhost:4200)
- **Admin Dashboard**: [http://localhost:4200/#/admin](http://localhost:4200/#/admin)
- **Backend API**: [http://localhost:3000](http://localhost:3000)

---

## ✨ Features & Functionality

### 📱 Main Portfolio (Public)
- **Home**: Featuring a floating hero section and your professional mission.
- **About**: A premium resume-style layout that is print-ready (Save as PDF).
- **Skills**: Interactive cards showcasing your tech stack and expertise.
- **Projects**: A dynamic showcase of your work with high-quality image support.
- **Contact**: A functional form that sends messages directly to your dashboard.

### 🔐 Admin Dashboard (Private)
- **Content Control**: Edit your name, role, email, and mission statement instantly.
- **Project Manager**: Add new projects with a built-in image uploader (supports up to 50MB).
- **Skills Manager**: Organise your professional traits into categories.
- **Inbox**: Monitor and manage messages from visitors, with direct "Reply via Email" links.

---

## ⚙️ Technology Stack

- **Frontend**: Angular 18 (Standalone Components, Signals for performance).
- **Backend**: Node.js & Express.js (REST API).
- **Database**: PostgreSQL (Structured data storage).
- **Containerization**: Docker (Consistent environments).
- **Styling**: Tailwind CSS (Modern, utility-first design).
- **Security**: JWT (JSON Web Tokens) with a 10-minute session expiry.

---

## 🗄 Docker & Database Management

### Database Credentials (Default)
- **Host**: `localhost` (Internal Docker name: `postgres`)
- **Port**: `5432`
- **Username**: `postgres`
- **Password**: `postgres_secure_password`
- **Database**: `portfolio_db`

### Admin Login
- **Username**: `admin`
- **Password**: `admin_secure_password`

### Common Docker Commands
- **Stop**: `docker compose down`
- **View Logs**: `docker compose logs -f`
- **Reset Database**: `docker compose down -v` (Warning: This deletes all data!)

---

## 🧪 Troubleshooting: Port 5432 Conflict
If you see an error like `Port 5432 is already allocated`, it means another PostgreSQL instance is running. 
1. Run `docker ps` to see what is running.
2. If `portfolio-postgres` is running, you can connect to it directly!
3. If you want to run a different tutorial, stop the existing one with `docker stop portfolio-postgres`.

---

Developed with ❤️ by **Abdullahi Muse Isse**
