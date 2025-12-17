# 🎯 Access Points & URLs

## 🟢 Currently Running

### Frontend
```
http://localhost:5174
```

### Backend API
```
http://localhost:8000
http://localhost:8000/api/
```

### Django Admin
```
http://localhost:8000/admin
(Create admin user first: python manage.py createsuperuser)
```

---

## 📍 Main Endpoints

### Authentication
```
POST   /api/auth/register/      Register new user
POST   /api/auth/login/         Login user
POST   /api/auth/refresh/       Refresh JWT token
POST   /api/auth/logout/        Logout user
```

### Products
```
GET    /api/products/           List all products
POST   /api/products/           Create product (sellers only)
GET    /api/products/{id}/      Get product details
PUT    /api/products/{id}/      Update product
DELETE /api/products/{id}/      Delete product
```

### Orders
```
GET    /api/orders/             List user orders
POST   /api/orders/             Create order
GET    /api/orders/{id}/        Get order details
PUT    /api/orders/{id}/        Update order
DELETE /api/orders/{id}/        Delete order
```

### Messages
```
GET    /api/messages/           Get all messages
POST   /api/messages/           Send message
GET    /api/messages/{id}/      Get message thread
```

### Dashboard
```
GET    /api/dashboard/          Dashboard stats
GET    /api/activities/         Activity feed
```

---

## 🔐 How to Use Authenticated Endpoints

All endpoints except `/auth/register/` and `/auth/login/` require authentication.

### Step 1: Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"your_user","password":"your_pass"}'
```

Response:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {...}
}
```

### Step 2: Use Access Token
```bash
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..." \
  http://localhost:8000/api/products/
```

### Step 3: Refresh Token (when access expires)
```bash
curl -X POST http://localhost:8000/api/auth/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh":"eyJ0eXAiOiJKV1QiLCJhbGc..."}'
```

---

## 🧪 Test Endpoints Without Authentication

These endpoints don't require a token:

```bash
# Check if backend is running
curl http://localhost:8000/

# Register a new user
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"test123","user_type":"buyer"}'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

---

## 💻 Frontend Integration

The frontend already has API service configured at:
```
The project front/seller/src/Services/api.js
```

All requests are automatically:
- Sent to `http://localhost:8000/api`
- Authenticated with stored JWT token
- Handle token refresh automatically
- Include CORS headers

---

## 🛠️ Start/Stop Servers

### Start Backend
```bash
cd "The project back"
python manage.py runserver 0.0.0.0:8000
```

### Start Frontend
```bash
cd "The project front"
npm run dev
```

### Or use provided scripts
```bash
# Windows
run_backend.bat      # Starts Django server
run_frontend.bat     # Starts React app
```

---

## 📦 Database

SQLite file location:
```
The project back/db.sqlite3
```

To reset database:
```bash
cd "The project back"
rm db.sqlite3
python manage.py migrate
```

---

## 🔑 User Types

When registering, choose one:
- `buyer` - Can browse and purchase products
- `seller` - Can list and sell products

---

## 📊 Status Check

### Check if backend is responding
```bash
curl http://localhost:8000
# Should return: {"status": "ok", "api": "/api/"}
```

### Check specific endpoint
```bash
curl http://localhost:8000/api/products/
# Will return products list or auth error
```

### With authentication header
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/dashboard/
```

---

## ⚡ Quick Commands

| Task | Command |
|------|---------|
| Start backend | `python manage.py runserver` |
| Start frontend | `npm run dev` |
| Create admin | `python manage.py createsuperuser` |
| Apply migrations | `python manage.py migrate` |
| Make migrations | `python manage.py makemigrations` |
| Reset database | `rm db.sqlite3 && python manage.py migrate` |
| Test registration | See "Test Endpoints" section above |

---

## 🎓 Example: Full Authentication Flow

### 1. Register
```javascript
const response = await fetch('http://localhost:8000/api/auth/register/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'MyPassword123!',
    user_type: 'buyer'
  })
});
const data = await response.json();
// data.access, data.refresh, data.user
```

### 2. Login
```javascript
const response = await fetch('http://localhost:8000/api/auth/login/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john_doe',
    password: 'MyPassword123!'
  })
});
const data = await response.json();
localStorage.setItem('wtv_access_token', data.access);
localStorage.setItem('wtv_refresh_token', data.refresh);
```

### 3. Make Authenticated Request
```javascript
const token = localStorage.getItem('wtv_access_token');
const response = await fetch('http://localhost:8000/api/products/', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const products = await response.json();
```

---

## 🚨 Troubleshooting

### "Connection refused"
- ✅ Backend not running? Run: `python manage.py runserver`
- ✅ Wrong port? Backend is on 8000, frontend on 5174

### "CORS error"
- ✅ Check CORS_ALLOWED_ORIGINS in backend/settings.py
- ✅ Should include http://localhost:5174

### "Invalid token"
- ✅ Token expired? Use refresh endpoint
- ✅ Token not sent? Check Authorization header format
- ✅ Format should be: `Bearer {token}`

### "No such table"
- ✅ Migrations not applied? Run: `python manage.py migrate`

---

**Everything is now connected and ready to use! 🎉**

Backend ✅ | Frontend ✅ | Database ✅ | API ✅ | Auth ✅
