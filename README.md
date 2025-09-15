# Library Management API

This is a simple RESTful API for managing a library's authors and books. It is built with Node.js, Express, and TypeScript, and uses in-memory arrays to store data (no database).

## Running the API

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server using ts-node:
   ```bash
   npx ts-node src/index.ts
   ```
   Or, for development with automatic restarts:
   ```bash
   npx ts-node-dev src/index.ts
   ```
   The server will run on `http://localhost:3000`.

See project spec for endpoints.
