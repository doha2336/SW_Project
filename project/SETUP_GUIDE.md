# WTV Market - Project Setup Guide

## ✅ Project Structure

```
project/
├── The project back/       (Django REST API Backend)
│   ├── backend/           (Core settings)
│   ├── accounts/          (User management & Auth)
│   ├── products/          (Product listings)
│   ├── orders/            (Order management)
│   ├── dashboard/         (Analytics & insights)
│   ├── user_messages/     (Messaging system)
│   ├── db.sqlite3         (Database)
│   └── manage.py
│
└── The project front/     (React Frontend + Vite)
    ├── seller/            (Seller dashboard)
    ├── buyer/             (Buyer interface)
    ├── src/               (Shared components)
    ├── package.json
    └── .env               (API configuration)
```

---

## 🚀 Setup Instructions

### Step 1: Backend Setup (Django)

#### 1.1 Navigate to backend directory
```bash
cd "The project back"
```

#### 1.2 Install dependencies
```bash
pip install -r requirements.txt
```

#### 1.3 Run migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

#### 1.4 Create superuser (Admin)
```bash
python manage.py createsuperuser
# Follow prompts:
# Username: admin
# Email: admin@example.com
# Password: [enter password]
```

#### 1.5 Start the backend server
```bash
python manage.py runserver 0.0.0.0:8000
```

**Backend will run on:** `http://localhost:8000`
**Admin panel:** `http://localhost:8000/admin`

---

### Step 2: Frontend Setup (React + Vite)

#### 2.1 Navigate to frontend directory
```bash
cd "The project front"
```

#### 2.2 Install dependencies
```bash
npm install
```

#### 2.3 Verify .env file
Check that `.env` contains:
```
VITE_API_URL=http://127.0.0.1:8000/api
```

#### 2.4 Start the frontend server
```bash
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

---

## 📋 API Endpoints Overview

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/refresh/` - Refresh JWT token
- `POST /api/auth/logout/` - Logout user

### Products
- `GET /api/products/` - List all products
- `POST /api/products/` - Create product (sellers only)
- `GET /api/products/{id}/` - Get product details
- `PUT /api/products/{id}/` - Update product (owner only)
- `DELETE /api/products/{id}/` - Delete product (owner only)

### Orders
- `GET /api/orders/` - List user orders
- `POST /api/orders/` - Create order
- `GET /api/orders/{id}/` - Order details
- `PUT /api/orders/{id}/` - Update order status

### User Messages
- `GET /api/messages/` - Get conversations
- `POST /api/messages/` - Send message
- `GET /api/messages/{id}/` - Message thread

### Dashboard
- `GET /api/dashboard/` - User stats & activities
- `GET /api/activities/` - Activity feed

---

## 🔐 Authentication Flow

1. **Register/Login** → Backend returns JWT tokens (access + refresh)
2. **Store Tokens** → Frontend stores in localStorage
3. **API Requests** → Frontend sends `Authorization: Bearer {access_token}` header
4. **Token Refresh** → When access token expires, use refresh token to get new one
5. **Logout** → Clear tokens from localStorage

---

## 📱 User Types

### Buyer
- Browse products
- Add to cart
- Purchase items
- Leave reviews
- Receive notifications

### Seller
- List products for sale
- Manage inventory
- View orders
- Track sales
- Communicate with buyers

---

## 🗄️ Database Models

### User (Custom)
```python
- id (UUID)
- username (unique)
- email (unique)
- user_type (buyer/seller)
- password
- created_at
- is_active
```

### Product
```python
- id (UUID)
- seller (ForeignKey → User)
- name
- description
- price
- stock
- category
- image
- created_at
- updated_at
```

### Order
```python
- id (UUID)
- buyer (ForeignKey → User)
- total_amount
- status (pending/completed/cancelled)
- created_at
- updated_at
```

### UserMessage
```python
- id (UUID)
- sender (ForeignKey → User)
- receiver (ForeignKey → User)
- content
- timestamp
```

---

## 🔧 Environment Variables

### Backend (.env in The project back/)
```
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

### Frontend (.env in The project front/)
```
VITE_API_URL=http://127.0.0.1:8000/api
```

---

## 🧪 Testing

### Test Backend
```bash
cd "The project back"
python manage.py test
```

### Test Frontend
```bash
cd "The project front"
npm test
```

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
- ✅ Backend server running on port 8000?
- ✅ CORS enabled in Django settings?
- ✅ Frontend API URL correct in .env?

### "CORS Error"
- Check `CORS_ALLOWED_ORIGINS` in `backend/settings.py`
- Ensure frontend URL is included (http://localhost:5173)

### "Token not being sent"
- Check browser DevTools → Network tab
- Verify token is stored in localStorage
- Check Authorization header format: `Bearer {token}`

### "Database locked"
```bash
cd "The project back"
rm db.sqlite3  # Delete old database
python manage.py migrate  # Recreate fresh database
```

---

## 📚 Quick Reference

| Command | Purpose |
|---------|---------|
| `python manage.py runserver` | Start backend |
| `npm run dev` | Start frontend |
| `python manage.py makemigrations` | Create migrations |
| `python manage.py migrate` | Apply migrations |
| `python manage.py createsuperuser` | Create admin |
| `npm run build` | Build frontend for production |

---

## 🚀 Development Workflow

1. Open two terminals
2. Terminal 1: Start backend `python manage.py runserver`
3. Terminal 2: Start frontend `npm run dev`
4. Access frontend at `http://localhost:5173`
5. Backend API at `http://localhost:8000/api`
6. Django admin at `http://localhost:8000/admin`

---

## ✨ Features

- ✅ User authentication (JWT tokens)
- ✅ Product management
- ✅ Order tracking
- ✅ Messaging system
- ✅ Admin dashboard
- ✅ Real-time notifications
- ✅ CORS enabled for frontend-backend communication

---

**Created:** December 17, 2025
**Status:** Ready for development
