# DocSpot: Seamless Appointment Booking for Health

A full-stack web application for booking doctor appointments. Users can register, browse available doctors, and book appointments. Doctors can apply for registration, manage their availability, and handle appointment requests. Admins can approve doctor applications and manage the platform.

## Demo Video

Check out the [Demo video.mp4](Demo%20video.mp4) for a walkthrough of the application.

## Features

### User Features

- User registration and authentication
- Browse available doctors by specialization
- Book appointments with preferred date and time
- View appointment history and status
- Receive notifications for appointment updates

### Doctor Features

- Apply for doctor registration
- Manage consultation timings and fees
- Accept or reject appointment requests
- View scheduled appointments

### Admin Features

- Approve or reject doctor applications
- Manage users and doctors
- View all appointments

## Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Material-UI (MUI)** - Component library
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **Formik & Yup** - Form handling and validation

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
docapp/
├── client/client/          # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── views/          # Page components
│   │   ├── redux/          # State management
│   │   ├── routes/         # Protected/Public routes
│   │   ├── hooks/          # Custom hooks
│   │   └── utils/          # Utility functions
│   └── public/
│
└── server/server/          # Express backend
    ├── controllers/        # Route handlers
    ├── models/             # MongoDB schemas
    ├── routes/             # API routes
    └── utils/              # Helper functions
```

## Installation

### Prerequisites

- Node.js (v18.x or higher)
- MongoDB
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Raafiya76/doctor-appointment-booking.git
   cd docapp
   ```

2. **Install server dependencies**

   ```bash
   cd server/server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../../client/client
   npm install
   ```

4. **Configure environment variables**

   Create `.env` file in `server/server/`:

   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   ```

   Create `.env` file in `client/client/`:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api/v1
   ```

## Running the Application

### Development

1. **Start the backend server**

   ```bash
   cd server/server
   npm run server
   ```

   Server runs on http://localhost:5000

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client/client
   npm start
   ```
   Client runs on http://localhost:3000

### Production

```bash
cd server/server
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/v1/users/signup` - Register new user
- `POST /api/v1/users/login` - User login

### Users

- `GET /api/v1/users/get-user-info` - Get current user info
- `POST /api/v1/users/apply-doctor-account` - Apply for doctor account
- `POST /api/v1/users/mark-all-notification-as-seen` - Mark notifications as read
- `POST /api/v1/users/delete-all-notification` - Delete all notifications

### Doctors

- `GET /api/v1/doctors/get-all-approved-doctors` - List approved doctors
- `POST /api/v1/doctors/get-doctor-info` - Get doctor details
- `POST /api/v1/doctors/book-appointment` - Book an appointment
- `POST /api/v1/doctors/check-booking-availability` - Check time slot availability

### Admin

- `GET /api/v1/users/get-all-users` - Get all users
- `GET /api/v1/users/get-all-doctors` - Get all doctors
- `POST /api/v1/users/change-doctor-account-status` - Approve/reject doctor

## License

ISC

## Author

Shaik Raafiya
