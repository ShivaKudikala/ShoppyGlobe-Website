# ShoppyGlobe E-commerce Application

## Overview
ShoppyGlobe is a full-stack e-commerce application built with **React.js** for the frontend and **Node.js with Express and MongoDB** for the backend.  
It allows users to:
- Browse products
- View product details
- Add items to the cart
- Manage cart operations
- Authenticate with JWT-based user login

## Features

### 🖥️ Frontend (React.js)
- **Component-Based Architecture**: Reusable components like `Header`, `ProductList`, `ProductDetail`, `Cart`, etc.
- **State Management (Redux)**: Cart operations and product filtering.
- **Routing (React Router)**: Pages for Home, Product Details, Cart, and Checkout.
- **API Integration**: Fetch products and manage the cart using RESTful APIs.
- **Performance Optimization**: Lazy loading, memoization, and optimized API calls.
- **Responsive Design**: Fully responsive UI with CSS.

### 🖥️ Backend (Node.js, Express, MongoDB)
- **RESTful APIs**:
  - `GET /products` - Fetch product list
  - `GET /products/:id` - Fetch product details
  - `POST /cart` - Add product to cart
  - `PUT /cart/:id` - Update cart item quantity
  - `DELETE /cart/:id` - Remove item from cart
- **Database (MongoDB)**:
  - Stores products and cart data.
  - Implemented CRUD operations.
- **Authentication**:
  - User registration and login with **JWT authentication**.
  - Secured cart operations.
- **Error Handling & Validation**:
  - Validates user input and handles API errors.

---

## 🛠 Installation

### Prerequisites
- **Node.js** installed
- **MongoDB** installed
- **Git** installed


### Steps to Run

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ShivaKudikala/ShoppyGlobe-Website.git
   cd vite-project
   
2. **Install Dependencies**

      for backend
      ```bash
      cd NodeJs
      npm install

      #for frontend
  
      ```bash
      npm install

3. ** Chance the names according **

   ```bash
   # I used this details
   MONGO_URI=mongodb://localhost:27017/ShoppyGlobe
   JWT_SECRET="shoppyglobe"
   PORT=9898

4. **Run the development server**
   
   for backend
   ```bash
   cd NodeJs
   npm start
   
   # for frontend
   npm run dev
The application will be available at http://localhost:5173.
