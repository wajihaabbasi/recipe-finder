# RecipeFinder - Full-Stack Recipe Discovery Platform 

RecipeFinder is a responsive web application that allows users to search for recipes, manage a personal "Favorites" library, and handle secure authentication.<br> 
This project was developed as part of the **DLBCSPJWD01: Project Java and Web Development** portfolio.

## Project Overview
* **Purpose**: To provide a centralized, searchable hub for culinary inspiration with persistent user data.
* **Target Audience**: Home cooks, busy professionals, and culinary enthusiasts.
* **Responsive Design**: Optimized for desktop, tablet, and smartphone viewports.

##  Technology Stack 
* **Frontend**: React.js (Vite), Tailwind CSS v4, React Router Dom.
* **Backend**: Node.js, Express.js.
* **Database**: PostgreSQL for persistent user and favorites storage.
* **Authentication**: JSON Web Tokens (JWT) for secure session management.
* **External API**: Spoonacular API

---

##  Installation & Execution Instructions 

### 1. Prerequisites
* **Node.js**: v18.0 or higher.
* **PostgreSQL**: Ensure the service is running on your machine.
* **Spoonacular API Key**: Obtain one from [Spoonacular Console](https://spoonacular.com/food-api/console/dashboard).

### 2. Database Setup
Create a database named `recipe_app` and execute the following to set up the schema:
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INTEGER NOT NULL,
    recipe_title VARCHAR(255),
    recipe_image TEXT
);

```
### 3. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/wajihaabbasi/recipe-finder.git
```
Navigate to the Project Folder:
```bash
cd recipe-finder
```
### 4. Install Dependencies
You must install dependencies for both the frontend and backend folders. 

For the Backend:
```bash
cd backend
npm install
```
For the Frontend:
```bash
cd ../frontend
npm install
```
### 5. Environment Configuration (.env)

The project includes a `.env.example` template in the backend directory.
1. Navigate to the backend folder.

2. Create a new file named .env by copying the example:
```bash
cp .env.example .env
```
3. Open the .env file and replace the placeholders with your actual credentials:

    **DB_USER / DB_PASSWORD**: Your local PostgreSQL username and password.

    **SPOONACULAR_API_KEY**: Your key from the Spoonacular dashboard / The key provided in the pptx first side 

    **JWT_SECRET**: A random string for session security.    

### 6. Running the Application

To run the full-stack app, you must start the backend and frontend in two separate terminal windows.

## Terminal 1 (Backend):
```bash
cd backend
npm start
```
The server will run on http://localhost:3000

## Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```
Vite will start a local development server and provide a **local host URL** like:
http://localhost:5173/

Copy and paste this in your browser

---

## Troubleshooting

* **Port 3000 or 5173 is in use**: If you get an `EADDRINUSE` error, ensure no other project is running. You can change the port in the `.env` (backend) or `vite.config.js` (frontend).
* **Database Connection Failed**: Double-check that the PostgreSQL service is running and that your `DB_USER` and `DB_PASSWORD` in the `.env` match your local setup.
* **API Results not appearing**: Check the backend terminal for a `402` error. This indicates the Spoonacular daily quota has been reached. In this case, use the provided mock data logic for testing.
* **CORS Errors**: Ensure the frontend is running on the expected port (5173), as the backend is configured to allow requests from that specific origin.

---

##  Manual Test Cases

As per the project requirements, the following test cases verify the core functionality and responsiveness:

| Test ID | Feature | Action | Expected Result |
| :--- | :--- | :--- | :--- |
| TC-01 | **Search** | Enter "Pasta" in search bar | Backend proxies request; results grid displays 10+ recipes. |
| TC-02 | **Auth** | Register a new user | User is saved in PostgreSQL; JWT is stored in LocalStorage. |
| TC-03 | **Persistence** | Click "Favorite" on a recipe | Recipe ID and metadata are saved to the DB for that specific user. |
| TC-04 | **Security** | Access `/favorites` while logged out | App redirects to login or hides protected content. |
| TC-05 | **Responsive** | Resize browser to 375px (Mobile) | Layout shifts to a single column; text remains readable. |
| TC-06 | **Logout** | Click "Logout" button | JWT is cleared; "Favorites" state is reset to empty. |
