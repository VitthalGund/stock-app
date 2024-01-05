# Stock Listing App

Welcome to the Stock Listing App! This web application allows you to explore a list of stocks and receive live price updates.

## Table of Contents
- [App Preview](#app-preview)
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [How to Use](#how-to-use)
- [Live Updates](#live-updates)
- [License](#license)

## App Preview
![Stock Listing App Preview](https://github.com/VitthalGund/stock-listing-app/assets/97181033/b4fac85b-f05a-4546-933f-4c27e47064d6)

## Introduction
The Stock Listing App is a coding assignment showcasing a full-stack application with a React.js frontend, Node.js backend, and MongoDB database. It fetches stock data from the Polygon API, allows users to input the number of stocks they want to explore, and provides live price updates.

## Technologies
- **Frontend:** React.js, Tailwind CSS, Typescript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Project Structure
The project follows a microservices architecture with a RESTful API. The backend exposes a `/stock` endpoint to fetch stocks, and live updates are achieved by updating stock prices at unique intervals.

## How to Use
1. **Clone the repository:**
   ```bash
   git clone https://github.com/VitthalGund/stock-listing-app.git
   cd stock-listing-app
   ```

2. **Install dependencies:**
   - Install backend dependencies:
     ```bash
     cd server
     npm install
     ```
   - Install frontend dependencies:
     ```bash
     cd client
     npm install
     ```

3. **Start the application:**
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend application:
     ```bash
     cd client
     npm start
     ```

4. **Access the application:**
   Visit `http://localhost:3000` in your browser to access the application. Enter the number of stocks you want to fetch, and enjoy exploring stock prices!

## Live Updates
Stock prices are updated every second, ensuring a dynamic and real-time experience. Each stock is updated at its unique interval.

## License
This project is licensed under the [MIT License](LICENSE).
