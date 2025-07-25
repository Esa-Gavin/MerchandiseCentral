# MerchandiseCentral

MerchandiseCentral is a simple full-stack web application for managing products. The frontend is built with **React** using Vite and the backend provides a small **PHP** API. This repository combines both parts so that the React build can be served from the PHP backend.

## Project Structure

- `frontend/` – React application
- `backend/` – PHP API and server configuration

## Getting Started

### Prerequisites
- Node.js and npm
- PHP 8 with Composer

### Installation
1. Install backend dependencies
   ```bash
   cd backend
   composer install
   ```
2. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally
- To run the React dev server:
  ```bash
  cd frontend
  npm run dev
  ```
- To build the frontend and copy the files into the PHP `public` directory:
  ```bash
  npm run build
  cp -R dist/ ../backend/public/
  ```
- You can then serve the PHP backend with your preferred PHP server.

## Running Backend Tests

Use PHPUnit installed via Composer:

```bash
cd backend
vendor/bin/phpunit
```

## Purpose

The project was created as a demo merchandise inventory application. It offers basic product listing endpoints and a simple React interface for adding and viewing products.
