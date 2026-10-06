# DukaanDost Frontend

Simple React frontend for the DukaanDost clothing-store final project.

## Run
1. Install Node.js.
2. Open this folder in VS Code.
3. Open Terminal.
4. Run `npm install`h

5. Run `npm run dev`
6. Open the localhost address shown by Vite.

## Important
This is the frontend stage. It uses local/mock data so the code is easy to understand.
Later the backend will replace the mock parts with the required API endpoints, JWT login, MongoDB, LLM API and Hugging Face sentiment model.

## Main areas
Customer: Home, Shop, Product Details, Cart, Checkout, Login/Register, My Orders.
Seller: Dashboard, Products, Orders, Store Settings, Reviews/Sentiment.
AI: Frontend chat widget with simple demo replies. Later connect it to POST /api/chat.

# 🛍️ DukaanDost

**DukaanDost** is a web-based local store management and e-commerce system designed to help small businesses manage products, customers, shopping carts, orders, reviews, and store information.

## 🚀 Features

### Customer
- Register and login
- Browse products
- Search products
- Filter products by category
- Add products to cart
- Update cart quantity
- Remove products from cart
- Place orders
- View personal orders
- Submit product reviews and ratings

### Seller
- Secure seller login
- Add products
- Update products
- Delete products
- View customer orders
- Update order status
- Manage store information
- Manage delivery policy and FAQs

## 🛠️ Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- JWT Authentication
- bcrypt
- REST API
- Git & GitHub

## 📁 Project Structure

```text
DukaanDost_Backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 🔐 Authentication

DukaanDost uses JWT authentication.

Protected requests use:

```text
Authorization: Bearer <token>
```

The system supports two roles:

- Customer
- Seller

## 🔗 Main API Routes

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Cart

```text
GET    /api/cart
POST   /api/cart/add
PUT    /api/cart/update/:productId
DELETE /api/cart/remove/:productId
```

### Orders

```text
POST /api/orders
GET  /api/orders/my-orders
GET  /api/orders
PUT  /api/orders/:id/status
```

### Reviews

```text
GET  /api/reviews/product/:productId
POST /api/reviews
```

### Store

```text
GET /api/store
PUT /api/store
```

## ⚙️ Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Go to the project directory:

```bash
cd DukaanDost_Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add your required environment variables.

Start the server:

```bash
node src/server.js
```

The backend runs on:

```text
http://localhost:5000
```

## 🧪 Testing

The backend APIs were tested using PowerShell and `Invoke-RestMethod`.

Tested modules:

- Authentication
- JWT authorization
- Role authorization
- Products
- Cart
- Orders
- Reviews
- Store Settings

All implemented backend API modules passed testing.

## 🔒 Security

Sensitive files such as `.env` should not be uploaded to GitHub.

The project uses:

- JWT authentication
- Password hashing
- Protected routes
- Role-based authorization
- Environment variables

## 🔮 Future Improvements

- Online payment integration
- Product image uploads
- Customer profiles
- Order tracking
- Seller dashboard
- Admin dashboard
- Email/WhatsApp notifications
- Sales analytics
- Wishlist
- Product recommendations

## 👩‍💻 Project

**DukaanDost — Local Store Management & E-Commerce System**

Developed as a Software Engineering project.