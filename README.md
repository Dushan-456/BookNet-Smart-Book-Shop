# BookNet-Smart-Book-Shop-------------------------------------------------------------------------

# BookNet FrontEnd


# BookNet API Backend

This is the backend server for **BookNet**, an integrated online platform that combines an e-commerce bookshop with digital services like printing, typing, and editing. This API is built with Node.js, Express, and Prisma, and it provides a complete set of endpoints for managing users, products, orders, and services.

## ✨ Features

* **JWT Authentication**: Secure user registration and login using `HttpOnly` cookies.
* **Role-Based Access Control**: Differentiates between `CUSTOMER`, `ADMIN`, and `DELIVERY` roles to protect routes.
* **Product & Category Management**: Full CRUD operations for admins to manage a nested category structure and product catalog.
* **Guest & User Shopping Cart**: Robust shopping cart functionality that works for both anonymous guests and logged-in users, with seamless merging upon login.
* **Order Management**: Complete flow for placing product orders, which are then manageable by admins.
* **Service Order System**: Dual-flow system for both authenticated users and in-shop guests to submit service requests with file uploads.
* **Delivery Management**: Endpoints for admins to assign deliveries and for delivery staff to update statuses.

## 🛠️ Technology Stack

* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **ORM**: Prisma
* **Authentication**: JSON Web Tokens (JWT)
* **File Uploads**: Multer
* **Validation**: express-validator

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later)
* [PostgreSQL](https://www.postgresql.org/download/) installed and running
* An API testing tool like [Postman](https://www.postman.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone Dushan-456/BookNet-Smart-Book-Shop
    cd BookNet-Backend
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following variables. Replace the placeholder values with your own.

    ```env
    # .env.example

    # --- Database ---
    # Your PostgreSQL connection string
    DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE_NAME"

    # --- Server ---
    # The port your server will run on
    PORT=5000

    # --- Security ---
    # A long, random string for signing JWTs
    JWT_SECRET="your_super_long_and_random_secret_string_here"
    ```

4.  **Run database migrations:**
    This will create all the tables in your database based on the Prisma schema.
    ```bash
    npx prisma migrate dev
    ```

5.  **Seed the database with initial data (optional but recommended):**
    This will populate your database with sample users, categories, and products.
    ```bash
    npm run seed
    ```

6.  **Start the server:**
    ```bash
    npm start
    ```
    The server will be running at `http://localhost:5000`.

##  API Endpoints

The API is versioned under `/api/v1`.

### Authentication

* `POST /api/v1/users/register`: Register a new user.
* `POST /api/v1/users/login`: Login a user. Sets an `HttpOnly` JWT cookie.
* `POST /api/v1/users/logout`: Logout a user and clear the cookie.

### Products & Categories (Public)

* `GET /api/v1/products`: Get a list of all products. Supports pagination and filtering (e.g., `?page=1&limit=10&category=<categoryId>`).
* `GET /api/v1/products/:id`: Get details for a single product.
* `GET /api/v1/categories`: Get a nested tree of all product categories.

### Cart (Public)

* `GET /api/v1/cart`: Get the current cart (works for guests and logged-in users).
* `POST /api/v1/cart/items`: Add an item to the cart.
* `PUT /api/v1/cart/items/:itemId`: Update an item's quantity in the cart.
* `DELETE /api/v1/cart/items/:itemId`: Remove an item from the cart.

### Orders (Private)

* `POST /api/v1/orders`: Place a new order from the cart (requires login).
* `GET /api/v1/orders/my-orders/:userId`: Get all orders for a specific user (user or admin access).

### Service Orders

* `POST /api/v1/services/user`: Submit a service order as a logged-in user (requires login, includes file upload).
* `POST /api/v1/services/guest`: Submit a service order as a guest (public, includes file upload).

### Admin Routes (Require Admin Role)

* `GET /api/v1/users`: Get a list of all users.
* `DELETE /api/v1/users/:id`: Delete a user.
* `POST /api/v1/categories`: Create a new category.
* `PUT /api/v1/categories/:id`: Update a category.
* `POST /api/v1/products`: Create a new product.
* `PUT /api/v1/products/:id`: Update a product.
* `GET /api/v1/orders`: Get a list of all orders.
* `GET /api/v1/orders/:id`: Get details for a single order.
* `PUT /api/v1/orders/:id/status`: Update an order's status.
* `GET /api/v1/services`: Get all service orders.
* `PUT /api/v1/services/:id`: Update a service order (assign staff, change status).