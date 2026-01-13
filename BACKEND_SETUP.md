# Backend Setup & Usage

This project includes a Node.js backend and a PostgreSQL database, orchestrated via Docker.

## Prerequisites
- Docker & Docker Compose installed and running.

## Credentials
### Database
- **User**: `postgres`
- **Password**: `postgres_secure_password`
- **Database**: `portfolio_db`

### Application Admin
- **Username**: `admin`
- **Password**: `admin_secure_password`

## Running the Project
1. Open a terminal in the root of the project.
2. Run the following command to build and start the services:
   ```bash
   docker compose up --build
   ```
3. The backend will be available at `http://localhost:3000`.
4. The database will be running on port `5432`.

## Verification
- **Backend**: Visit [http://localhost:3000/health](http://localhost:3000/health). You should see `{"status":"UP"}`.
- **Logs**: Check the terminal output. You should see "Successfully connected to PostgreSQL database!" and "Admin user seeded".

## Stopping
Press `Ctrl+C` in the terminal or run:
```bash
docker compose down
```
