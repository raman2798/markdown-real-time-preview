# Markdown Real-Time Preview

## Overview

The Markdown Real-Time Preview project consists of a frontend application (`portal`) and a backend service (`service`).

## Project Structure

```
markdown-real-time-preview/
├── portal/    # Frontend application
├── service/   # Backend service
```

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Instructions

### Cloning the Repository

1. Clone the repository:

   ```bash
   git clone https://github.com/raman2798/markdown-real-time-preview.git
   ```

2. Navigate to the project directory:
   ```bash
   cd markdown-real-time-preview
   ```

### Setting Up the Frontend

1. Navigate to the `portal` directory:

   ```bash
   cd portal
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.sample .env
   ```
   Open `.env` and modify the environment variables as needed.

### Setting the API URL

Before starting the frontend server, set the API URL environment variable:

```bash
VITE_API_URL=<your-backend-url>
```

### Starting the Frontend Server

To start the frontend server on localhost, run:

```bash
npm run dev
```

### Setting Up the Backend

1. Navigate to the `service` directory:

   ```bash
   cd service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.sample .env
   ```

   Open `.env` and modify the environment variables as needed.

### Starting the Backend Server

To start the backend server on localhost, run:

```bash
npm run start
```
