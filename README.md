# 🧪 Diagnostic Center Management System

A full‑stack **Diagnostic Center Management System** that allows users to book diagnostic tests using OTP‑based authentication and enables administrators to manage the entire platform through a powerful admin panel.

This project is designed to handle real‑world diagnostic center workflows such as test bookings, sample collection options, appointment management, and secure report downloads.

---

## 🚀 Features

### 👤 User Features

* **Phone Number OTP Authentication**

  * Secure login using OTP verification
  * JWT‑based authentication stored in HTTP‑only cookies

* **Book Diagnostic Tests**

  * Choose between **Home Sample Collection** or **Diagnostic Center Visit**
  * Select preferred **date & time slot**

* **Tests & Packages**

  * Browse individual tests and bundled packages
  * View detailed information and pricing

* **Appointment Management**

  * Each appointment generates a **unique appointment ID**
  * Used to map and retrieve diagnostic reports

* **Download Diagnostic Reports**

  * Search reports using the **unique appointment ID**
  * Secure report download functionality (Cloudinary-hosted PDFs)

* **Gallery & Information Pages**

  * Diagnostic center gallery
  * Informational sections for better user experience

---

### 🛠️ Admin Panel Features

* **User Management**

  * Add, edit, and delete users

* **Appointment Management**

  * Create, update, and delete appointments
  * Assign time slots and sample collection type

* **Test & Package Management**

  * Add, edit, and delete diagnostic tests
  * Manage test packages

* **Report Management**

  * Upload and delete diagnostic reports (stored securely as PDFs in Cloudinary)
  * Link reports using the **unique appointment ID**

* **Full Website Control**

  * Centralized admin dashboard for complete system management

---

## 🔐 Authentication & Security

* OTP‑based login via phone number
* JWT tokens stored securely in **HTTP‑only cookies**
* Role‑based access control (User / Admin)
* Protected routes for admin operations

---

## 🧱 Tech Stack

### Frontend

* React.js
* React Router
* Context API / State Management
* Modern UI & responsive design

### Backend

* Node.js
* Express.js
* JWT Authentication
* OTP Verification System

### Database

* MongoDB

### Other Tools & Services

* RESTful APIs
* Secure Cookie Handling
* **Cloudinary** for secure storage of diagnostic reports (PDFs)
* File upload & download with access control

---

## 🧩 System Workflow

1. User logs in using phone number OTP
2. JWT token is generated and stored in cookies
3. User books a test and selects:

   * Sample collection type
   * Date & time slot
4. System generates a **unique appointment ID**
5. Admin uploads diagnostic report mapped to the appointment ID
6. User searches, views, and downloads the report securely

---

## ⚙️ Environment Variables

Create a `.env` file in the server directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

---

## ▶️ Getting Started

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 👨‍💻 Author

**Daniyal**
Full‑Stack Developer (MERN)

---

⭐ If you find this project useful, consider giving it a star!
