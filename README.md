# 🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System with role-based authentication, inventory management, and a modern UI.

---

## 🔥 Features

### 👤 Customer Features
- Browse sweets in card layout
- Search sweets by name or description
- Filter by category (Chocolate, Gummy, Candy)
- Sort by name, price, or stock
- Purchase sweets with quantity selection
- Stock-based purchase restrictions
- Real-time stock indicators

### 🛠️ Admin Features
- Add new sweets
- Edit sweet details
- Delete sweets
- Restock sweets
- Admin-only protected routes

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access (Admin / User)
- Protected routes
- Persistent login using localStorage

---

## 🧰 Tech Stack

### Frontend
- React 
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- FastAPI
- MongoDB (Atlas)
- Motor (Async MongoDB)
- JWT (python-jose)
- Pydantic

---

## 📁 Project Structure

### Backend
```
backend/
├── app/
│ ├── api/
│ │ └── routes/
│ │ ├── auth.py
│ │ └── sweets.py
│ ├── core/
│ │ ├── config.py
│ │ ├── security.py
│ │ └── dependencies.py
│ ├── db/
│ │ └── mongodb.py
│ ├── schemas/
│ ├── services/
│ ├── main.py
│ └── tests/
└── requirements.txt
```


### Frontend
```
frontend/
├── src/
│ ├── api/
│ │ ├── axios.js
│ │ ├── auth.js
│ │ └── sweets.js
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── SweetCard.jsx
│ │ ├── AdminSweetCard.jsx
│ │ ├── SweetModal.jsx
│ │ └── ProtectedRoute.jsx
│ ├── hooks/
│ │ └── useAuth.js
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── Dashboard.jsx
│ │ └── Admin.jsx
│ ├── utils/
│ │ └── helpers.js
│ ├── App.jsx
│ └── main.jsx

```

---

## ⚙️ Environment Variables
```
### Backend `.env`
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
DATABASE_NAME=sweet_shop
JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=60

```

### Frontend `.env`
```
VITE_API_BASE_URL=http://localhost:8000/api
````


## ▶️ Running the Project
```
### Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload


```

```

Backend runs at:
http://localhost:8000

```

---

### Frontend

```cd frontend
npm install
npm run dev```


```Frontend runs at:
http://localhost:5173```



## 🔑 Demo Credentials

### Admin
```Email: admin@gmail.com
Password: admin123```



### User
```Email: user1@gmail.com
Password: 123456
```


---

## 🔗 API Endpoints

### Auth
```POST /api/auth/register
POST /api/auth/login```



### Sweets
```GET /api/sweets
POST /api/sweets (Admin)
PUT /api/sweets/{id} (Admin)
DELETE /api/sweets/{id} (Admin)
POST /api/sweets/{id}/purchase
POST /api/sweets/{id}/restock (Admin)```


```
---

## 🧪 Testing

- Pytest setup is included (optional)
- Manual testing through UI and API is sufficient
- Automated tests can be added later

---

## 🌍 Deployment

- Backend: Render 
- Frontend: Vercel
- Database: MongoDB Atlas

---

## 📌 Notes

- Navbar visibility handled after authentication
- Role-based routing enforced
- Real-time inventory updates after purchase/restock

---

## 📝 License

Kalesh Patil
