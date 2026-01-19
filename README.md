
<div align="center">

# 🚀 Professional Portfolio & Admin CMS

### A High-Performance, Full-Stack Personal Brand Platform

[![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[View Demo](http://localhost:4200) • [Report Bug](https://github.com/DDHDDHD3/portfolio/issues) • [Request Feature](https://github.com/DDHDDHD3/portfolio/issues)

</div>

---

## 📖 Overview

This project is a sophisticated **Personal Portfolio Platform** that combines a stunning, animated frontend for visitors with a powerful **Admin Dashboard** for complete content management.

It features a **Hybrid Docker Setup** that allows you to connect a locally running backend to a cloud-based **Neon PostgreSQL** database, giving you the best of both worlds: local development speed with persistent online data storage.

---

## ✨ Key Features

### 📱 **Stunning Portfolio (Public)**
*   **Hero Section**: Captivating introduction with your specialized role.
*   **About Me**: A professional, print-ready resume layout with a specific **"Download PDF"** feature that generates a pixel-perfect A4 document.
*   **Skills Showcase**: Interactive cards to highlight your technical and soft skills.
*   **Project Gallery**: Dynamic grid displaying your work with high-res imagery.
*   **Contact Form**: Direct messaging system integrated with the admin inbox.

### 🔐 **Admin Dashboard (Private)**
*   **Content CMS**: Instantly update your bio, contact info, and mission statement.
*   **Project Management**: Add, edit, or delete portfolio projects with image uploads (up to 50MB).
*   **Skills Control**: Manage your skill sets and categories seamlessly.
*   **Inbox System**: Read and respond to visitor messages directly from the dashboard.

---

## 🚀 Quick Start Guide

### Prerequisites
*   **Docker Desktop** (Required for Backend & Database)
*   **Node.js 20+** (Required for Frontend)

### 1. Installation
Clone the repository:
```bash
git clone https://github.com/DDHDDHD3/portfolio.git
cd portfolio
```

### 2. Start the Backend (Docker)
We use Docker to run the backend API and local database services.

```bash
docker compose up -d backend
```

> **Note**: By default, this project is configured to connect to a **Local PostgreSQL Database** (`postgres` container).
> *   **Local DB**: `postgres` service matches the backend configuration.
> *   **Admin Panel**: Access `pgadmin` at [http://localhost:5051](http://localhost:5051).

### 3. Start the Frontend (Angular)
For the best development experience, run the frontend locally:
```bash
npm install
ng serve
```

### 4. Visit the App
*   **Portfolio**: [http://localhost:4200](http://localhost:4200)
*   **Admin Panel**: [http://localhost:4200/#/admin](http://localhost:4200/#/admin)
*   **API Health**: [http://localhost:3000/health](http://localhost:3000/health)

---

## 📄 Advanced Features

### 🖨️ PDF Resume Generation
The application includes a custom-built PDF engine using `jspdf`. It doesn't just take a screenshot; it **draws** a vector-based, selectable PDF document ensuring your resume looks sharp at any zoom level.

*   **Location**: `src/pages/about/about.component.ts`
*   **Trigger**: "Download PDF" button on the About page.
*   **Output**: A single-page, professional A4 PDF.

### ☁️ Cloud Database (Neon)
You can easily switch between a **Local Docker Database** and a **Neon Cloud Database**.

**To switch to Cloud DB:**
1.  Open `docker-compose.yml`.
2.  Uncomment the `DATABASE_URL` line for the Neon connection.
3.  Comment out the local `DATABASE_URL`.
4.  Restart the backend: `docker compose up -d backend`.

---

## 🛠️ Technology Stack

| Layer | Technology | Key Features |
| :--- | :--- | :--- |
| **Frontend** | Angular 18 | Standalone Components, Signal-based State Management |
| **Backend** | Node.js / Express | RESTful API, 50MB Payload limit for images |
| **Database** | PostgreSQL 15 | Relational data integrity, running on Docker or Neon |
| **Styling** | Tailwind CSS 3.4 | Utility-first, Responsive Design, Dark Mode support |
| **Auth** | JWT / Bcrypt | Secure stateless authentication with 10m expiry |

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

<div align="center">

**Developed with ❤️ by Abdullahi Muse Isse**

[LinkedIn](https://linkedin.com) • [GitHub](https://github.com/DDHDDHD3) • [Email](mailto:abdallaise877@gmail.com)

</div>
