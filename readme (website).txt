=========================================
INTERACTIVE DIGITAL GUIDEBOOK WEB APP
=========================================

Developer: Jonathan Song Hua Jing (Leader & Web Developer)
Project Type: Fullstack IoT + AI + Web Platform

-----------------------------------------
PROJECT OVERVIEW
-----------------------------------------

This project is a full-stack web application that serves as an Interactive Digital Guidebook for park visitors, guides, and administrators. 

It integrates:
- React.js frontend
- Node.js backend server
- AI feedback summarization
- IoT sensor monitoring system
- Google Maps interactive map

-----------------------------------------
FEATURE SUMMARY
-----------------------------------------

✔ User Login & Role-based Access (Admin / Guide / Visitor)
✔ Admin certification alerts
✔ Interactive Google Map for destinations
✔ Real-time IoT monitoring using Arduino + Sensors
✔ AI-powered feedback summarization (NLP)
✔ Accommodation, Activities & History Information
✔ Contact Form for visitor inquiries

-----------------------------------------
PROJECT STRUCTURE
-----------------------------------------

You have two major parts:

1️⃣ Backend Server (Node.js)
2️⃣ Frontend Web App (React.js)

Folder structure:

project/
│
├── server.js            <-- Node backend server
├── package.json         <-- Backend dependencies
│
└── website/             <-- React frontend project
    ├── src/
    ├── public/
    └── package.json     <-- Frontend dependencies

-----------------------------------------
FULL INSTALLATION GUIDE
-----------------------------------------

### REQUIREMENTS:

- Node.js (v16.x or higher)
- npm (v8.x or higher)

-----------------------------------------
STEP 1 - INSTALL DEPENDENCIES
-----------------------------------------

🖥 Open Terminal #1 (for backend server)

Navigate to project root:

> cd project_folder

Install backend dependencies:

> npm install

🖥 Open Terminal #2 (for frontend React app)

Navigate to website folder:

> cd project_folder/website

Install frontend dependencies:

> npm install


Inside website folder:

> npm install @react-google-maps/api

✅ In your `InteractiveMap.jsx`, import:

```javascript
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
