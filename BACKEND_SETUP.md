# Portfolio Project - Complete Setup Guide

## Project Structure

```
portfolio/
├── src/                    # React frontend
│   ├── components/
│   ├── hooks/
│   ├── services/          # NEW: API service layer
│   ├── App.jsx
│   └── main.jsx
├── server/                # NEW: Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── index.js
│   ├── package.json
│   └── .env
├── package.json           # Updated with backend scripts
└── vite.config.js
```

## Quick Start

### 1. Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure .env with your settings
```

**Edit `server/.env`:**
```
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_random_secret_key_123456789
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
```

### 2. Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 3. Start Backend Server

```bash
# From server directory
npm run dev
```

Backend will run on `http://localhost:5000`

### 4. Setup Frontend

```bash
# Go back to root directory
cd ..

# Install frontend dependencies (if not already done)
npm install

# Copy frontend .env template
cp .env.example .env.local
```

**Edit `.env.local`:**
```
VITE_API_URL=http://localhost:5000/api
```

### 5. Start Frontend

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### 6. Run Both Together (Optional)

```bash
# Install concurrently in root
npm install --save-dev concurrently

# Run both frontend and backend
npm run dev:full
```

## API Endpoints Reference

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Projects
```
GET    /api/projects
GET    /api/projects/featured
GET    /api/projects/:id
POST   /api/projects              (admin)
PUT    /api/projects/:id          (admin)
DELETE /api/projects/:id          (admin)
```

### Contact
```
POST   /api/contact
GET    /api/contact               (admin)
PATCH  /api/contact/:id/read      (admin)
DELETE /api/contact/:id           (admin)
```

## Using the API in React

### Import the service
```javascript
import { projectService, contactService, authService } from '@/services/api';
```

### Fetch projects
```javascript
const projects = await projectService.getAll();
```

### Submit contact form
```javascript
await contactService.submit({
  name: 'John',
  email: 'john@example.com',
  subject: 'Hello',
  message: 'Message content'
});
```

### Admin operations (requires login)
```javascript
// Login first
const { token } = await authService.login(email, password);

// Then create/update/delete projects
await projectService.create(projectData);
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Failed
- Check MongoDB is running
- Verify connection string
- Check firewall/network settings

### CORS Errors
- Update `FRONTEND_URL` in backend `.env`
- Ensure it matches your frontend development URL

### Module Not Found
```bash
# Reinstall node_modules
cd server
rm -r node_modules
npm install
```

## Database Setup (First Time)

The database automatically creates collections when you first submit data. To manually seed data:

```javascript
// Create initial admin user (use auth/register endpoint)
// POST /api/auth/register
{
  "name": "Admin",
  "email": "admin@portfolio.com",
  "password": "SecurePassword123"
}

// Add projects via admin panel
// POST /api/projects with Bearer token
```

## Environment Variables

### Backend (.env)
| Variable | Purpose | Example |
|----------|---------|---------|
| MONGODB_URI | Database connection | mongodb://localhost:27017/portfolio |
| JWT_SECRET | Token signing key | any_random_secret_string |
| PORT | Backend port | 5000 |
| EMAIL_USER | Gmail for notifications | admin@gmail.com |
| EMAIL_PASSWORD | Gmail app password | xxxx xxxx xxxx xxxx |
| FRONTEND_URL | Allowed frontend origin | http://localhost:5173 |

### Frontend (.env.local)
| Variable | Purpose | Example |
|----------|---------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

## Production Deployment

### Backend Hosting Options
- Heroku
- Railway
- Vercel
- AWS EC2
- DigitalOcean

### Frontend Hosting
- Vercel
- Netlify
- GitHub Pages
- AWS S3

### Pre-deployment Checklist
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas (not local)
- [ ] Set secure JWT_SECRET
- [ ] Configure email for production
- [ ] Update FRONTEND_URL to production domain
- [ ] Update VITE_API_URL to production API
- [ ] Run `npm run build` for frontend

## Support & Resources

- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## Next Steps

1. ✅ Backend set up
2. ✅ Frontend API integration
3. Create admin dashboard for project management
4. Implement file upload for project images
5. Add project filtering and search
6. Create authenticated admin panel
7. Deploy to production

---

**Happy coding!** 🚀
