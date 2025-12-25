# Digital Maintenance Logbook for Labs (SmartLabTracker)

A full-stack web application designed to **digitize and streamline laboratory equipment maintenance**.
This system replaces traditional paper-based logbooks with a **secure, role-based, and centralized digital platform** for managing lab machines, maintenance logs, and reports.

---

## 🚀 Project Overview

In many educational institutions, laboratory maintenance records are still managed manually, leading to:

* Data loss and inconsistency
* Delayed issue resolution
* Lack of transparency and accountability

**Digital Maintenance Logbook for Labs** solves these problems by providing a modern web-based solution where all maintenance activities are tracked in real time with proper access control.

---

## 🛠️ Tech Stack

### Frontend

* Angular (v19)
* TypeScript
* HTML5, CSS3
* Bootstrap 5
* Axios
* QR Code libraries (`html5-qrcode`, `qrcode`)

### Backend

* Spring Boot
* Java 17
* Spring Security
* JWT Authentication
* RESTful APIs

### Database

* MySQL
* JPA / Hibernate

### Tools

* Git & GitHub
* Maven
* VS Code
* Eclipse / STS
* Postman

---

## 👥 User Roles

* **Admin**

  * Manage users and roles
  * Manage all devices
  * View and generate reports

* **HOD**

  * Monitor department devices
  * Review maintenance logs

* **Faculty**

  * Add and update maintenance logs
  * View assigned lab devices

* **Student**

  * View device and maintenance information

---

## ✨ Key Features

* 🔐 JWT-based authentication & role-based access control
* 🖥️ Separate dashboards for Admin, HOD, Faculty, and Student
* 🧾 Add, view, update, and delete laboratory devices
* 🛠️ Maintenance log tracking with real-time updates
* 📄 PDF report generation for devices and maintenance logs
* 🔍 Search and filter functionality
* 📱 Responsive UI (desktop, tablet, mobile)
* 🔗 QR code support for quick device identification
* 🗄️ Secure MySQL database integration

---

## 🏗️ Project Structure

```
digital-maintenance-logbook/
│
├── frontend/   # Angular frontend
├── backend/    # Spring Boot backend
└── README.md
```

---

## ⚙️ How to Run the Project Locally

### Prerequisites

* Node.js & npm
* Angular CLI
* Java 17
* Maven
* MySQL

---

### 1️⃣ Backend Setup

1. Create a MySQL database:

```sql
CREATE DATABASE maintenance_logbook;
```

2. Configure local secrets in:

```
backend/src/main/resources/application-local.properties
```

3. Run the backend:

```bash
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8080
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend runs at:

```
http://localhost:4200
```

---

## 🔒 Security Notes

* Sensitive data such as database credentials and JWT secrets are **not committed** to GitHub
* Environment-based configuration is used for both frontend and backend
* Backend secrets are managed using Spring profiles

---

## 📈 Future Enhancements

* 🔔 Automated maintenance reminders and notifications
* 📊 Analytics dashboard for equipment performance
* 🤖 AI/ML-based predictive maintenance
* 📱 Mobile application integration
* ☁️ Cloud deployment (AWS / Azure / GCP)

---

## 🎓 Academic Context

This project was developed as part of a **B.Tech Computer Science & Engineering** curriculum and demonstrates:

* Full-stack web development
* Secure authentication using JWT
* Role-based access control
* Database design and integration
* Real-world problem-solving skills

---

## 👨‍💻 Authors

* Sameer Jadhav
* Project Team – *SmartLabTracker*

---

## 📌 License

This project is intended for **educational purposes only**.
