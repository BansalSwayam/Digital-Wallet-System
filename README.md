# Digital Wallet Backend

A secure and feature-rich digital wallet system built with **Node.js**, **Express**, and **MongoDB**, featuring user authentication, wallet operations, fraud detection, and admin-level reporting APIs.

---

## Project Structure

digital-wallet/
├── app.js
├── .env
├── package.json
├── package-lock.json
│


├── models/
│ ├── userM.js
│ └── transactionM.js
│


├── controllers/
│ ├── authC.js
│ ├── walletC.js
│ └── adminC.js
│


├── routes/
│ ├── authR.js
│ ├── walletR.js
│ └── adminR.js
│


├── middleware/
│ ├── authMW.js
│ └── fraudDetection.js
│


├── utils/
│ ├── scheduler.js
│ ├── emailMock.js
│ └── currencyConverter.js


M stands for Models
R stands for Routes
MW stands for MiddleWare
C stands for Controllers


---

## Folder & File Descriptions

###  `app.js`
- Main server entry point
- Connects to MongoDB
- Loads middleware and routes

###  `models/`
- **`userModel.js`**: User schema (username, password, balance, refreshToken, softDelete)
- **`transactionModel.js`**: Transaction schema (from, to, amount, type, currency, flagged,timestamp,reason,softDeleted)

###  `controllers/`
- **`authController.js`**: Handles registration, login, refresh, logout
- **`walletController.js`**: Deposit, withdraw, transfer, and transaction history
- **`adminController.js`**: Admin-only access to flagged transactions, summaries, and top users

###  `routes/`
- **`authRoutes.js`**: `/register`, `/login`, `/refresh`, `/logout`
- **`walletRoutes.js`**: `/deposit`, `/withdraw`, `/transfer`, `/history`
- **`adminRoutes.js`**: `/flagged`, `/summary`, `/top-users`

###  `middleware/`
- **`authMiddleware.js`**: Protects routes via JWT
- **`fraudDetection.js`**: Flags suspicious activity, like large withdrawals or rapid transfers

###  `utils/`
- **`currencyConverter.js`**: Allows you to use any currency and uses a dynamic API that works live for converting any currency. USD is used as default currency on backend but while sending request you can use any Currency.
- **`emailMock.js`**: Logs mock email alerts onto the consol
- **`scheduler.js`**: Daily fraud scan job that takes place after every 24 Hours(Daily)

---

##  JWT Authentication (Access & Refresh Tokens)

This project uses **JSON Web Tokens (JWT)** for secure authentication, including short-lived access tokens and long-lived refresh tokens.

### Access Token
- **Purpose**: Authenticates requests to protected routes (`/wallet`, `/admin`)
- **Lifespan**: 15 minutes
- **Stored**: Client-side (e.g., in memory or localStorage)
- **Usage**: Sent in `Authorization` header as `Bearer <token>`
- **Signed with**: `JWT_SECRET`

###  Refresh Token
- **Purpose**: Used to obtain a new access token after it expires
- **Lifespan**: 7 days
- **Stored**: HTTP-only cookie
- **Usage**: Automatically included in request to `/api/auth/refresh`
- **Signed with**: `REFRESH_SECRET`

###  Token Lifecycle


1. User logs in with /api/auth/login
2. Server returns:
   - Access Token (15 min)
   - Refresh Token (7 days, in cookie)
3. Access token is used for secure API requests
4. When access token expires:
   - Client calls /api/auth/refresh
   - Server verifies refresh token and issues a new access token
5. User can log out with /api/auth/logout which clears the cookie and token

## Currency Support

With use of dynamic api live currency conversion takes place with all currency types.

## Fraud Detection

- Middleware detects:
  - Multiple rapid transfers
  - Large withdrawals (> $10,000)
- Scheduled daily scan flags suspicious historical transactions
- Mock email alerts printed to the console

---

## Environment Setup
run the project using command 'node app.js' on terminal
Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/digital_wallet
JWT_SECRET=
REFRESH_SECRET=

