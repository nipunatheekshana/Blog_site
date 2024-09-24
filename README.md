
  

# Erabiz Laravel Blog Task

  

## Overview

  

This is a responsive blog management system developed using **Laravel** for the backend and **React** for the frontend. The project allows users to manage blog posts through a dashboard with features such as creating, updating, and deleting posts. It also provides user authentication and an API to interact with blog data.

  

---

  

## Features

  

-  **User Authentication**: Users must log in to access the dashboard.

-  **Blog Post Management**: Users can add, update, delete, and view blog posts.

-  **API Integration**: Blog posts are accessible via APIs for listing and viewing individual blog details.

  

---

  

## Technologies Used

  

-  **Backend**: Laravel (API and authentication)

-  **Frontend**: React 

-  **API Client**: Axios

-  **React Router**: For handling navigation between components

  

---

  

## Folder Structure

  

```plaintext

src/

├── assets/

├── contexts/

├── layouts/

├── views/

├── App.jsx

├── axios-client.js

├── index.css

├── main.jsx

├── router.jsx

├── index.html

├── package.json

├── vite.config.js

```

  

### API Endpoints

  

#### Auth Routes:

-  `POST /register`: Registers a new user.

-  `POST /login`: Authenticates a user.

-  `POST /logout`: Logs the user out.

  

#### Blog Routes:

-  `GET /blogs`: Get all blogs.

-  `POST /blogs`: Create a new blog post.

-  `GET /blogs/{id}`: Get details of a specific blog post.

-  `PUT /blogs/{id}`: Update a specific blog post.

-  `DELETE /blogs/{id}`: Delete a blog post.

  

---

  

## Setup Instructions

  

1.  **Clone the repository**:

```bash

git clone https://github.com/nipunatheekshana/Blog_site.git

cd laravel-react-blog

```

  

2.  **Install Backend Dependencies**:

Inside the root of the Laravel project, run:

```bash

composer install

```

  

3.  **Install Frontend Dependencies**:

Inside the `react` folder, run:

```bash

npm install

```

  

4.  **Environment Setup**:

- Copy the `.env.example` file and rename it to `.env`.

- Update the database credentials and other environment variables in the `.env` file.

  

5.  **Database Migration**:

Run the following command to migrate the database:

```bash

php artisan migrate

```

  

6.  **Start the Backend**:

Use the following command to run the Laravel application:

```bash

php artisan serve

```

  

7.  **Start the Frontend**:

Inside the `react` folder, run:

```bash

npm run dev

```

  

---

  

## API Documentation

  

The project exposes the following API endpoints for blog management:

  

-  **GET /blogs**: Retrieve a list of blogs.

-  **POST /blogs**: Create a new blog post.

-  **GET /blogs/{id}**: Retrieve a specific blog post by its ID.

-  **PUT /blogs/{id}**: Update a specific blog post by its ID.

-  **DELETE /blogs/{id}**: Delete a blog post by its ID.

  

All the routes are protected using the `auth:sanctum` middleware, meaning the user must be authenticated to access these endpoints.

  

---

  

## Design Considerations

  

-  **Security**: The blog routes are protected using Laravel's `Sanctum` middleware for authentication.

-  **State Management**: React's `useState` and `useEffect` hooks are used for managing component states and handling API calls.

-  **Error Handling**: Basic error handling is implemented for failed API calls, ensuring the system remains user-friendly even in error scenarios.

  

---

  

