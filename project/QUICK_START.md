# 🚀 WTV Market - Quick Start Guide

## ✅ System Status

| Component | Status | URL | Port |
|-----------|--------|-----|------|
| 🔵 Backend (Django) | ✅ Running | http://localhost:8000 | 8000 |
| 🟢 Frontend (React) | ✅ Running | http://localhost:5174 | 5174 |
| 🗄️ Database (SQLite) | ✅ Connected | db.sqlite3 | - |
| 🔐 Authentication | ✅ JWT Enabled | - | - |

---

## 📍 Quick Links

### Access Points
- **Frontend App:** http://localhost:5174
- **Backend API:** http://localhost:8000/api
- **Admin Panel:** http://localhost:8000/admin
- **API Root:** http://localhost:8000

### Test Endpoints
```bash
# Test backend is running
curl http://localhost:8000

# Test specific API
curl http://localhost:8000/api/products/

# With authentication
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/api/dashboard/
```

---

## 🔌 Connection Status

### Backend ↔ Database
✅ **Connected** - SQLite database is active and all migrations applied

### Frontend ↔ Backend
✅ **Connected** - CORS enabled, frontend can communicate with API

### API Service
✅ **Ready** - Axios API service configured at `/seller/src/Services/api.js`

---

## 🎯 Next Steps

### 1. Create Admin User (First Time Only)
```bash
cd "The project back"
python manage.py createsuperuser
# Follow prompts to create admin account
```

### 2. Test Authentication Flow
1. Go to http://localhost:5174/signup
2. Create a new user (buyer or seller)
3. Login with credentials
4. Check tokens in browser localStorage

### 3. Test API Endpoints
- Browse products
- Create product (sellers only)
- Place orders
- Send messages

### 4. Check Admin Panel
- Go to http://localhost:8000/admin
- Login with superuser credentials
- Manage users, products, orders

---

## 📦 API Response Format

### Success Response (200)
```json
{
  "status": "success",
  "data": {...},
  "message": "Operation successful"
}
```

### Authentication Response
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": "uuid",
    "username": "john_doe",
    "email": "john@example.com",
    "user_type": "buyer"
  }
}
```

### Error Response (400/401)
```json
{
  "error": "Error message",
  "detail": "Detailed error description"
}
```

---

## 🔑 Key Passwords & Credentials

> **Note:** Change these before deploying to production!

### Default Admin
- **URL:** http://localhost:8000/admin
- **Username:** (create your own with `createsuperuser`)
- **Password:** (create your own with `createsuperuser`)

---

## 🛠️ Useful Commands

### Backend Commands
```bash
cd "The project back"

# Start server
python manage.py runserver

# Run migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Clear database
python manage.py flush

# View logs
python manage.py shell
```

### Frontend Commands
```bash
cd "The project front"

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

---

## 🐛 Troubleshooting

### Port 5173 Already in Use?
Port 5174 will be used automatically. Update .env if needed:
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### CORS Errors?
Check `backend/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5174",  # Current frontend port
]
```

### Database Issues?
```bash
cd "The project back"
rm db.sqlite3
python manage.py migrate
```

### Tokens Not Working?
1. Check localStorage in browser DevTools
2. Verify Authorization header in Network tab
3. Ensure token format: `Bearer {token}`

---

## 📋 Project Structure

```
project/
├── The project back/
│   ├── backend/          (Settings, CORS, JWT config)
│   ├── accounts/         (User & Auth endpoints)
│   ├── products/         (Product listing endpoints)
│   ├── orders/           (Order management endpoints)
│   ├── user_messages/    (Messaging endpoints)
│   ├── dashboard/        (Analytics endpoints)
│   └── db.sqlite3        (Database)
│
└── The project front/
    ├── src/              (React components)
    ├── seller/           (Seller app)
    ├── buyer/            (Buyer app)
    └── Services/api.js   (API configuration)
```

---

## ✨ Features Ready to Use

- ✅ User Registration & Login
- ✅ JWT Token Management
- ✅ Product Management (CRUD)
- ✅ Order System
- ✅ Messaging System
- ✅ User Dashboard
- ✅ Admin Panel
- ✅ CORS Support
- ✅ Database Models

---

## 🎓 Example: Make Your First API Request

### Register a New User
```javascript
fetch('http://localhost:8000/api/auth/register/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'secure123',
    user_type: 'buyer'
  })
})
.then(r => r.json())
.then(data => console.log(data))
```

### Login
```javascript
fetch('http://localhost:8000/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john_doe',
    password: 'secure123'
  })
})
.then(r => r.json())
.then(data => {
  localStorage.setItem('wtv_access_token', data.access);
  localStorage.setItem('wtv_refresh_token', data.refresh);
  console.log('Logged in!', data);
})
```

### Get Products (with auth)
```javascript
fetch('http://localhost:8000/api/products/', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('wtv_access_token')}`
  }
})
.then(r => r.json())
.then(data => console.log(data))
```

---

## 📞 Support

For issues or questions:
1. Check `SETUP_GUIDE.md` for detailed setup
2. Review API endpoints documentation
3. Check browser console for errors
4. Check terminal output for server logs

---

**Last Updated:** December 17, 2025  
**Status:** Production Ready ✅
