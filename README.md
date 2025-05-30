# 🧩 Employee Management System — Spring Boot + React + Vite

A full-stack **CRUD** application to manage employee data, featuring a modern frontend built with **React + Vite + Tailwind CSS**, and a secure backend powered by **Spring Boot**, **Spring Security**, and **JPA**. Includes support for **file uploads**, **filters**, and **search**.

---

## 🚀 Tech Stack

### 🔧 Backend (Java + Spring Boot)
- Spring Boot (REST APIs)
- Spring Data JPA
- Spring Security (Basic Authentication)
- H2 (file-based) / MySQL
- File Upload (PDFs)

### 🎨 Frontend (React + Vite)
- React with Vite
- Tailwind CSS
- Axios (API integration)
- React Router DOM (Client-side routing)

---

## ✅ Features

### 🔐 Authentication
- Basic HTTP Authentication  
  `Username: admin` | `Password: password`

### 👨‍💼 Employee Management
- Auto-generated Employee ID (`EMP001`, `EMP002`, ...)
- Auto-generated Login ID (`jDoe`, `jDoe123`, etc.)
- Date of Birth validation (must be over 18 years)
- Resume upload in PDF (10KB–1MB)
- CRUD: Create, Read, Update, Delete employees

### 🔍 Search & Filters
- Filter by: Name, Employee ID, Login ID, DOB range, Department
- Paginated results (5 per page)
- Responsive grid layout with view/edit/delete actions

---

## 🛠️ Getting Started

### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run


Or import into STS / IntelliJ and run EmployeeAppApplication.

Ensure backend runs at http://localhost:8080


### 💻 Frontend Setup (Vite + React)

cd frontend
npm install
npm run dev

Then visit: http://localhost:5173

📁 Folder Structure

springboot-react-vite-employee-crud-app/
├── backend/
│   ├── src/main/java/com/employee/app/...
│   └── application.properties
├── frontend/
│   ├── src/pages/...
│   ├── services/api.js
│   └── index.css


🧪 Test Support
Basic test stub included in backend:

EmployeeServiceTest.java

✍️ Author
Made with ❤️ by Smile-Khan

📝 License
This project is for educational/demo purposes. Feel free to fork and use.