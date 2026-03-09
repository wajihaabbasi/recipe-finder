# RecipeFinder - Full-Stack Recipe Discovery Platform 

RecipeFinder is a responsive web application that allows users to search for international recipes, manage a personal "Favorites" library, and handle secure authentication.<br> 
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

    DB_NAME=recipe_finder
    JWT_SECRET=your_secure_secret_key
    SPOONACULAR_API_KEY=your_spoonacular_key
