# PassOP – Password Manager

PassOP is a full-stack password manager application that allows users to add, view, edit, and delete password records through a React frontend and an Express.js backend connected to MongoDB.

## Features

- Add new password records
- View saved passwords
- Edit existing passwords
- Delete passwords
- Show/Hide password functionality
- Persistent storage using MongoDB
- REST API-based communication between frontend and backend
- Unique ID for each password record

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- CORS

## Project Structure

```text
PassOP/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── passop/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── package-lock.json
│
└── .gitignore
```

## API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | / | Fetch all password records |
| POST | / | Add a new password |
| PUT | /:id | Update an existing password |
| DELETE | /:id | Delete a password |

## Application Flow

```text
React Frontend
      ↓
 REST API Calls
      ↓
Express.js Backend
      ↓
    MongoDB
```

The frontend communicates with the backend using HTTP requests. The backend performs CRUD operations and stores password records in MongoDB.

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Anujchq/PassOP.git
cd PassOP
```

### Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```text
http://localhost:3000
```

### Frontend Setup

Open another terminal:

```bash
cd passop
npm install
npm run dev
```

Open the URL displayed by Vite in the browser.

## Database

Database Name:

```text
passop
```

Collection Name:

```text
documents
```

MongoDB should be running locally before starting the backend.

## Future Improvements

- Password encryption before storage
- User authentication and authorization
- Search and filter functionality
- Password strength indicator
- Copy password to clipboard
- Deployment on cloud platform

## Author

Anuj Chamoli

GitHub: https://github.com/Anujchq
