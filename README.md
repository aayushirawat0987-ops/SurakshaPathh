# SurakshaPath - Walk Free. Walk Safe.

## Inspiration
SurakshaPath was inspired by the real-life safety and transportation problems faced by students and women in hill regions like Almora, Uttarakhand. 

Students living in hostels were often forced to take separate shortcut routes because main roads or longer paths were considered unsafe or lacked adequate lighting and monitoring. Furthermore, relying on public transport presented a massive challenge: there was only one 4 AM bus available from the garhwal route Many students depended entirely on this bus to travel home safely. Unfortunately, due to safety concerns and logistical issues, that bus route was eventually cancelled and diverted. This drastically reduced the safe travel options for students. 

These challenges highlighted the critical need for a localized, intelligent safety platform that not only provides an SOS lifeline but also analyzes route safety, helps manage trusted contacts, and builds community awareness through heatmap reporting. 

## What it does
SurakshaPath is a comprehensive web platform providing:
- **Smart SOS**: Instant emergency alerts with live location sharing.
- **Safe Route Mapping**: Interactive map showing safe vs. unsafe paths based on reports and data.
- **Fake Call**: A simulated incoming call feature to help escape uncomfortable situations.
- **Trusted Circle**: Live tracking and check-ins with your close contacts.
- **Community Alerts**: Anonymous reporting of incidents, building a heatmap of dangerous zones.
- **Emergency Resources**: Quick access to nearby hospitals, police stations, and helplines.

## Built With
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, React Router DOM, React Leaflet
- **Backend**: Node.js, Express.js, MongoDB, Mongoose

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally, or a MongoDB Atlas URI

### Installation
1. Clone the repository
2. Install all dependencies:
```bash
npm run install-all
```

### Environment Variables
1. Navigate to the `server` folder and create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Project
From the root directory, run both the backend and frontend simultaneously:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.
