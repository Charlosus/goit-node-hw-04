# Node.js REST API - User Authentication & Contacts

This is a RESTful API project built with Node.js, Express, and MongoDB. It includes user registration, login with JWT authentication, email verification via SendGrid, and basic CRUD operations for managing contacts.

## Features

- User registration with email verification
- JWT-based authentication
- Re-sending verification email
- User login, logout, and current user info
- Avatar upload and processing with Jimp
- Contact management: create, read, update, delete
- Input validation with Joi
- File upload using Multer
- MongoDB with Mongoose

---

## Technologies Used

- Node.js
- Express
- MongoDB + Mongoose
- Joi (validation)
- Multer (file uploads)
- Jimp (image processing)
- SendGrid (email sending)
- JWT (authentication)
- dotenv

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Charlosus/goit-node-hw-06.git
cd goit-node-hw-06
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and include the following:

```
DB_HOST=your_mongodb_connection_string
SECRET=your_jwt_secret
BASE_URL=http://localhost:3000
SGAPI_KEY=your_sendgrid_api_key
MY_EMAIL=your_verified_sendgrid_sender_email
```

> ⚠️ Make sure `MY_EMAIL` is verified in your SendGrid account.

---

## Running the Server

```bash
npm start
```

The server will start at `http://localhost:3000`

---

## API Endpoints

### Auth Routes

| Method | Endpoint                               | Description               |
| ------ | -------------------------------------- | ------------------------- |
| POST   | `/api/users/signup`                    | Register a new user       |
| POST   | `/api/users/login`                     | Login user                |
| GET    | `/api/users/logout`                    | Logout user               |
| GET    | `/api/users/current`                   | Get current user info     |
| PATCH  | `/api/users/avatars`                   | Upload/change avatar      |
| GET    | `/api/users/verify/:verificationToken` | Verify user by token      |
| POST   | `/api/users/verify`                    | Resend verification email |

### Contacts Routes

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| GET    | `/api/contacts`              | Get all user contacts  |
| GET    | `/api/contacts/:id`          | Get contact by ID      |
| POST   | `/api/contacts`              | Add new contact        |
| PUT    | `/api/contacts/:id`          | Update contact         |
| PATCH  | `/api/contacts/:id/favorite` | Toggle favorite status |
| DELETE | `/api/contacts/:id`          | Delete contact         |

> All `/contacts` routes require authentication.

---

## Project Structure

```
.
├── api/
│   ├── contacts/
│   └── users/
├── controllers/
├── middleware/
├── models/
├── validation/
├── public/
├── .env
├── server.js
└── package.json
```

---

## Author

- GitHub: [Charlosus](https://github.com/Charlosus)

---

## License

This project is for educational purposes only.
