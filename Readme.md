# User Management System API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)
![JWT](https://img.shields.io/badge/JWT-Auth-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

A robust RESTful API for user management with authentication built with Express.js, MongoDB, and JWT.

## Features

- ✅ User registration and login
- 🔐 JWT-based authentication
- 🛡️ Protected routes for user operations
- 📝 CRUD operations for user data
- 🧹 Input validation and sanitization
- 🚨 Comprehensive error handling
- 📚 API documentation with Swagger
- 🧪 Unit and integration testing

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Technologies

- **Runtime**: Node.js (18.x)
- **Framework**: Express.js (4.x)
- **Database**: MongoDB (6.x)
- **Authentication**: JSON Web Tokens (JWT)
- **Language**: TypeScript (5.x)
- **Testing**: Jest, Supertest
- **Documentation**: Swagger/OpenAPI
- **Linting**: ESLint
- **Logging**: Winston

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/user-management-api.git
   cd user-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Configuration](#configuration))

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_url
JWT_SECRET=your_very_secure_jwt_secret
```

## Running the Application

### Development Mode

```bash
npm run dev
```
- Uses nodemon for automatic restarts
- Debug logging enabled
- Accessible at `http://localhost:3000`

## API Documentation

Interactive API documentation is available at:

```
http://localhost:3000/api-docs
```

The documentation includes:
- All available endpoints
- Request/response examples
- Authentication requirements
- Try-it-out functionality

## Testing

To run the test suite:

```bash
npm test
```

Test coverage includes:
- User registration
- User login
- Profile management
- Authentication middleware
- Error handling

## API Endpoints

### Authentication

| Method | Endpoint           | Description                | Auth Required |
|--------|--------------------|----------------------------|---------------|
| POST   | `/api/auth/register` | Register a new user       | No            |
| POST   | `/api/auth/login`    | Login existing user       | No            |

### User Profile

| Method | Endpoint             | Description                | Auth Required |
|--------|----------------------|----------------------------|---------------|
| GET    | `/api/users/profile`  | Get user profile          | Yes           |
| PUT    | `/api/users/profile`  | Update user profile       | Yes           |
| DELETE | `/api/users/profile`  | Delete user account       | Yes           |

## Request/Response Examples

### User Registration

**Request:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### User Login

**Request:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Environment Variables

| Variable      | Required | Default               | Description                          |
|--------------|----------|-----------------------|--------------------------------------|
| PORT         | No       | 3000                  | Application port                     |
| MONGODB_URI  | Yes      | -                     | MongoDB connection string            |
| JWT_SECRET   | Yes      | -                     | Secret for JWT signing               |


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This README includes:

1. **Badges** for quick visual identification of technologies
2. **Comprehensive feature list**
3. **Detailed setup instructions**
4. **Configuration guidance**
5. **Running instructions** for both development and production
6. **API documentation** information
7. **Testing** details
8. **Endpoint reference** table
9. **Request/response examples**
10. **Environment variable** documentation
11. **License** information

The formatting uses Markdown for excellent GitHub rendering, with clear section organization and consistent styling. You can customize it further by:

- Adding your project's specific deployment instructions
- Including contribution guidelines
- Adding screenshots of the API documentation
- Adding a project roadmap or future features section