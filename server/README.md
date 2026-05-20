# Portfolio Backend Setup

## Overview
Complete Node.js/Express backend with MongoDB, authentication, contact form, and admin panel support.

## Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secure_random_key_here
PORT=5000
NODE_ENV=development
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB
**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas:**
- Create a cluster at https://www.mongodb.com/cloud/atlas
- Update `MONGODB_URI` with your connection string

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin user
- `POST /api/auth/login` - Login and get JWT token

### Projects (Portfolio Items)
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects only
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Contact
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all messages (admin only)
- `PATCH /api/contact/:id/read` - Mark as read (admin only)
- `DELETE /api/contact/:id` - Delete message (admin only)

## Example API Usage

### Register Admin
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

### Create Project (requires JWT token)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title":"My Project",
    "description":"Project description",
    "image":"image_url",
    "category":"Web",
    "technologies":["React","Node.js"],
    "link":"https://project.com",
    "featured":true
  }'
```

### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "subject":"Collaboration Request",
    "message":"Let\'s work together!"
  }'
```

## Frontend Integration

Update your React components to call the backend API:

```javascript
// Example: Fetch projects
const fetchProjects = async () => {
  const response = await fetch('http://localhost:5000/api/projects');
  const data = await response.json();
  return data;
};

// Example: Submit contact form
const submitContact = async (formData) => {
  const response = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return response.json();
};
```

## Database Models

### User
- name (String)
- email (String, unique)
- password (String, hashed)
- role (String: 'admin' or 'viewer')

### Project
- title, description, image, category
- technologies (Array)
- link, github URLs
- featured (Boolean)
- order (Number for sorting)

### Contact
- name, email, subject, message
- status (String: 'new', 'read', 'replied')
- timestamps

## Running Frontend & Backend Together

In the root directory:
```bash
npm run dev:full
```

This requires `concurrently` package. Install it:
```bash
npm install --save-dev concurrently
```

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI is correct
- Verify network access for MongoDB Atlas

**JWT Token Issues:**
- Ensure JWT_SECRET is set in .env
- Token format: `Authorization: Bearer <token>`

**CORS Errors:**
- Update FRONTEND_URL in .env
- Matches your frontend development URL

**Email Sending Issues:**
- Use Gmail app password (not regular password)
- Enable "Less secure app access" if needed
- Check EMAIL_USER and EMAIL_PASSWORD

## Production Deployment

1. Set `NODE_ENV=production`
2. Use MongoDB Atlas for database
3. Deploy to services like Heroku, Railway, or Vercel
4. Update environment variables on production platform
5. Update FRONTEND_URL to production domain

## License
MIT
