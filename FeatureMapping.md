# 📌 Feature Implementation Map for Digital Wallet Backend

This document maps each **core feature**, **constraint**, and **bonus challenge** from the assignment to specific locations in your backend code.

---

## ✅ Core Features

### 1. User Authentication & Session Management

| Feature                                                         | Implemented In                          |
|----------------------------------------------------------------|------------------------------------------|
| Secure user registration and login with bcrypt                 | `controllers/authController.js`          |
| JWT access and refresh token generation                        | `controllers/authController.js`          |
| Auth middleware to protect sensitive endpoints                 | `middleware/authMiddleware.js`           |
| Routes for login, logout, refresh                              | `routes/authRoutes.js`                   |

---

### 2. Wallet Operations

| Feature                                                         | Implemented In                          |
|----------------------------------------------------------------|------------------------------------------|
| Deposit and withdraw virtual cash                              | `controllers/walletController.js`        |
| Transfer between users                                         | `controllers/walletController.js`        |
| Maintain transaction history per user                          | `controllers/walletController.js` (`history` method) |
| Support for INR and USD with currency conversion               | `utils/currencyConverter.js` + `walletController.js` |

---

### 3. Transaction Processing & Validation

| Feature                                                         | Implemented In                          |
|----------------------------------------------------------------|------------------------------------------|
| Atomic handling of balance deduction/crediting                 | `controllers/walletController.js`        |
| Validation to prevent overdrafts or invalid transfers          | `walletController.js` (validation logic) |

---

### 4. Basic Fraud Detection Logic

| Feature                                                         | Implemented In                          |
|----------------------------------------------------------------|------------------------------------------|
| Detect multiple transfers in short period                      | `middleware/fraudDetection.js`           |
| Detect sudden large withdrawals                                | `middleware/fraudDetection.js`           |
| Flag/log suspicious transactions                               | `fraudDetection.js`, `transactionModel.js` |

---

### 5. Admin & Reporting APIs

| Feature                                                         | Implemented In                          |
|----------------------------------------------------------------|------------------------------------------|
| View flagged transactions                                      | `controllers/adminController.js`         |
| Aggregate total user balances                                  | `controllers/adminController.js`         |
| View top users by balance or transaction volume                | `controllers/adminController.js`         |
| Routes for admin endpoints                                     | `routes/adminRoutes.js`                  |

---

## 🎯 Constraints

| Constraint                                                     | Addressed By                             |
|----------------------------------------------------------------|------------------------------------------|
| Business logic handled on backend                              | All logic in `controllers/`, `middleware/`, `utils/` |
| RESTful API design                                             | All routes in `routes/` directory        |
| API documentation via Postman                                  | Provided Postman collection              |

---

## 🌟 Bonus Challenges

| Bonus Feature                                                  | Implemented In                          |
|----------------------------------------------------------------|------------------------------------------|
| Scheduled job for fraud scan                                   | `utils/scheduler.js`                     |
| Soft delete for users and transactions                         | `userModel.js`, `transactionModel.js`    |
| Mock email alerts for suspicious activity                      | `utils/emailMock.js`, `fraudDetection.js`, `scheduler.js` |

---

## 📦 Deliverables

- ✅ GitHub-ready backend project using Express.js & MongoDB
- ✅ Postman collection for API demonstration
- ✅ README documentation for full project overview
- ✅ Bonus feature support for full score potential

---


