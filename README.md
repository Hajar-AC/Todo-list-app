Todo List App
Description
This is a simple Todo List application built with Vue.js 3, Vuex, and TypeScript. The app allows users to add, edit, delete, and filter tasks. It also includes a backend built with Node.js for persisting data and a database setup with Docker.

Features

#Add, Edit, and Delete Tasks: Manage your to-do list with ease.
#Task Filtering: Filter tasks by completed, active, or all tasks.
#Vue.js 3: Modern front-end framework.
#Vuex: State management for the application.
#TypeScript: Static typing for better development experience.
#Backend API: Node.js backend for data persistence.
#Docker: Database setup using Docker.
#Project Structure

Project Structure

todo-list-app/
│
├── backend/               # Backend code (Node.js)
├── data/                  # Data files (ignored by Git)
├── dist/                  # Build files (ignored by Git)
├── node_modules/          # Node.js dependencies (ignored by Git)
├── public/                # Public assets
├── src/                   # Source files (Vue.js components)
├── tests/                 # Test files
├── .gitignore             # Files and directories to ignore in Git
├── babel.config.js        # Babel configuration
├── docker-compose.yml     # Docker setup for the database
├── jest.config.js         # Jest configuration for testing
├── package.json           # Project dependencies and scripts
├── README.md              # This README file
├── tsconfig.json          # TypeScript configuration
├── vue.config.js          # Vue CLI configuration
└── Makefile               # Commands for building and running the project


Installation
Follow these steps to get the project running on your local machine:

Prerequisites
#Node.js (version 14 or higher)
#npm or yarn (for package management)
#Git
#Docker (for database setup, optional)
#Vue CLI (optional, but recommended)
#Setup

1) Clone the repository:
git clone git@github.com:Hajar-AC/Todo-list-app.git
cd todo-list-app

2) Install frontend dependencies:
npm install


3) Start the backend server:
cd backend
npm start

4) Run the database using Docker (optional)
docker-compose up -d

5)Start the development server:
cd todo-list-app
npm run serve


Access the app:

Open your browser and go to http://localhost:8080 to see the application in action.

Running Tests

npm run test:unit
