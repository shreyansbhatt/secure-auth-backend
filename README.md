# Secure Auth Backend

## Overview
This repository contains the **backend** implementation of a secure authentication system. It provides robust and scalable user authentication functionality using **NestJS** and integrates with MongoDB for data storage. The backend emphasizes security, modularity, and maintainability.

The accompanying **frontend** repository can be found [here](https://github.com/shreyansbhatt/secure-auth-frontend).

---

## Features
- **User Authentication**:
  - Registration and login endpoints.
  - Password hashing using `bcrypt`.
  - Token-based authentication using `JWT`.
- **Input Validation**: Ensures data integrity through `class-validator`.
- **Secure API**:
  - Helmet for secure HTTP headers.
  - CORS configuration to handle cross-origin requests.
- **Scalable Architecture**:
  - Modular structure for future extensibility.
  - MongoDB integration using Mongoose.

---

## Tech Stack
- **NestJS**: Framework for building scalable Node.js applications.
- **MongoDB**: Database for secure user data storage.
- **Mongoose**: ODM (Object-Document Mapping) library for MongoDB.
- **JWT**: For secure user session management.
- **Bcrypt**: For hashing passwords.
- **Helmet**: For securing HTTP headers.
- **CORS**: For enabling cross-origin requests.

---

## Best Practices Followed
As a **Solution Architect**, the backend design adheres to the following principles:

### **Security**
1. **Password Hashing**: All passwords are securely hashed using `bcrypt` with 12 salt rounds.
2. **Token-Based Authentication**: JSON Web Tokens (JWT) are used to authenticate users, minimizing session vulnerabilities.
3. **Input Validation**: User input is validated using `class-validator` to ensure data integrity.
4. **Secure HTTP Headers**: Configured `Helmet` to mitigate common web vulnerabilities.
5. **Cross-Origin Resource Sharing (CORS)**: Configured to allow only trusted origins.

### **Scalability**
1. **Modular Design**: Each feature is encapsulated in its own module (`auth`, `user`), ensuring clean separation of concerns.
2. **MongoDB Integration**: Mongoose is used to model user data, allowing flexibility for future enhancements.

### **Code Quality**
1. **Logging**: Integrated logging using the NestJS `Logger` for tracking key events and errors.
2. **Error Handling**: Graceful error responses with meaningful messages.

---

## Project Setup

### Prerequisites
- **Node.js**: Ensure Node.js is installed (v16+ recommended).
- **MongoDB**: MongoDB server running locally or in the cloud.

---

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/shreyansbhatt/secure-auth-backend.git
   cd secure-auth-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following configuration:
   ```env
   PORT=4000
   MONGO_URI=mongodb://127.0.0.1:27017/nest-auth
   JWT_SECRET=your_secret_key
   ```
   - Replace `your_secret_key` with a secure key for signing JWTs.

---

### Running the Application
1. Start the development server:
   ```bash
   npm run start:dev
   ```

2. The backend will run at:
   ```plaintext
   http://localhost:4000
   ```

---

## API Endpoints

### **Authentication**
| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| POST   | `/auth/login`  | Authenticates a user and returns a JWT token. |
| POST   | `/auth/register` | Registers a new user. |

### **Request/Response Example**
#### **Registration**
- **Request**:
  ```json
  {
    "email": "test@example.com",
    "name": "Test User",
    "password": "Password123!"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### **Login**
- **Request**:
  ```json
  {
    "email": "test@example.com",
    "password": "Password123!"
  }
  ```
- **Response**:
  ```json
  {
    "access_token": "jwt_token_here"
  }
  ```

---

## Folder Structure
```plaintext
backend/
├── src/
│   ├── auth/                # Authentication module
│   │   ├── auth.controller.ts  # Handles authentication endpoints
│   │   ├── auth.service.ts     # Handles authentication logic
│   │   ├── auth.module.ts      # Auth module definition
│   ├── user/                # User module
│   │   ├── user.schema.ts      # Mongoose schema for User model
│   │   ├── user.service.ts     # Handles user database interactions
│   │   ├── user.module.ts      # User module definition
│   ├── app.module.ts        # Root module
│   ├── main.ts              # Application entry point
├── package.json
├── tsconfig.json
├── README.md
```

---

## Future Enhancements
1. **Unit Testing**: Add comprehensive test coverage using Jest.
2. **Role-Based Authorization**: Implement user roles (e.g., Admin, User).
3. **Rate Limiting**: Protect endpoints against abuse by limiting the number of requests.
4. **Environment-Specific Configurations**: Use `@nestjs/config` for environment-based settings.

---

## Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
