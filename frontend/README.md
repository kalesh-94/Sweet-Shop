# Sweet Shop Management System

A modern, responsive React frontend for managing a sweet shop. Built with Vite, React, TailwindCSS, and Axios.

## Features

### Customer Features
- Browse sweets in an attractive card layout
- Search sweets by name or description
- Filter by category (Chocolate, Gummy, Candy)
- Sort by name, price, or stock quantity
- Purchase sweets with quantity selection
- Purchase button disabled when stock is zero
- Real-time stock status indicators

### Admin Features
- Add new sweets to inventory
- Update existing sweet details
- Delete sweets from inventory
- Restock sweets with custom quantities
- Visual stock status indicators

### Authentication
- Login and Register pages
- JWT-ready authentication with localStorage
- Protected routes for authenticated users
- Admin-only routes for administrative functions
- Demo credentials for testing

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client with interceptors
- **React Router** - Client-side routing

## Project Structure

```
src/
├── api/              # API service layer
│   ├── axios.js      # Axios configuration with interceptors
│   ├── auth.js       # Authentication API
│   └── sweets.js     # Sweets CRUD API
├── components/       # Reusable components
│   ├── AdminSweetCard.jsx
│   ├── FilterBar.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── SearchBar.jsx
│   ├── SweetCard.jsx
│   └── SweetModal.jsx
├── hooks/            # Custom React hooks
│   └── useAuth.js    # Authentication hook
├── pages/            # Page components
│   ├── Admin.jsx     # Admin panel
│   ├── Dashboard.jsx # Customer dashboard
│   ├── Login.jsx     # Login page
│   └── Register.jsx  # Registration page
├── utils/            # Utility functions
│   └── helpers.js    # Helper functions
├── App.jsx           # Main app with routing
└── main.jsx          # App entry point
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Demo Credentials

### Admin Account
- Email: `admin@sweet.com`
- Password: `admin123`

### Regular User Account
- Email: `user@sweet.com`
- Password: `user123`

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## API Configuration

The application is configured to work with a backend API. All API calls are handled through Axios with JWT authentication interceptors. The base URL can be configured via environment variables.

### API Endpoints Expected

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/:id` - Get sweet by ID
- `POST /api/sweets` - Create new sweet (admin only)
- `PUT /api/sweets/:id` - Update sweet (admin only)
- `DELETE /api/sweets/:id` - Delete sweet (admin only)
- `PATCH /api/sweets/:id/restock` - Restock sweet (admin only)
- `POST /api/sweets/:id/purchase` - Purchase sweet

## Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly buttons and inputs
- Optimized card layouts for all screen sizes

### Search and Filter
- Real-time search across sweet names and descriptions
- Category filtering (All, Chocolate, Gummy, Candy)
- Multiple sort options (Name, Price, Stock)
- Combined search and filter functionality

### Stock Management
- Visual stock indicators (In Stock, Low Stock, Out of Stock)
- Disabled purchase button when out of stock
- Admin restock functionality
- Real-time stock updates

### Authentication Flow
- JWT token storage in localStorage
- Automatic token injection in API requests
- Auto-redirect to login on 401 responses
- Protected routes with role-based access
- Persistent login state

## Mock Data

The application includes mock data for testing purposes when the backend is not available. Mock sweets are automatically loaded if the API request fails.

## License

MIT
