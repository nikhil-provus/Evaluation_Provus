# 🌤️ Weather Console App (Node.js)

A **Node.js based Weather Console Application** that lets users fetch real-time weather information using multiple interaction modes:

* 📍 Enter city manually
* 🌐 Detect location automatically via IP address
* 🤖 Chat with an AI Assistant

The app is built with **modern JavaScript (ES Modules)**, follows a clean modular structure, and demonstrates best practices like async/await, reusable utilities, centralized error handling, and environment-based configuration.

---

## ✨ Features

* Interactive CLI using `readline/promises`
* Fetch user location via ISP (IP-based lookup)
* Real-time weather data using **OpenWeatherMap API**
* AI assistant interaction mode
* Reusable fetch utility for API calls
* Graceful error handling with user-friendly messages
* Clean and scalable project structure

---

## 🛠️ Tech Stack

* **Node.js**
* **JavaScript (ES6+)**
* **ES Modules (.mjs)**
* **OpenWeatherMap API**
* **ipinfo.io API**
* **dotenv** (for environment variables)

---

## 📁 Project Structure

```
weather-console-app/
│
├── node_modules/
│
├── src/
│   ├── aiAssistant.mjs        # AI chat logic
│   ├── clientResponse.mjs    # AI / client response handling
│   ├── displayResult.mjs     # Weather output formatter
│
├── utils/
│   ├── fetchFunction.mjs     # Reusable fetch utility
│   ├── globalStates.mjs      # Global loading / state management
│   ├── loader.mjs            # CLI loader animation
│
├── .env                      # Environment variables
├── .gitignore
├── app.mjs                   # Application entry point
├── package.json
├── package-lock.json
└── readme.md
```

---

## 🔄 Application Flow

The application follows a clear and predictable flow:

1. App starts from `app.mjs`
2. User is prompted to choose how they want to proceed
3. Based on choice:

   * Manual city input
   * Location detection via IP
   * AI assistant chat
4. Weather data is fetched (if applicable)
5. Results are displayed in the console
6. App exits gracefully

---

## 🧭 Flowchart

Below is the high-level flowchart representing the application logic:

![Weather Console App Flowchart](./assets/weather-flowchart.png)

## ▶️ Run the Application

```bash
node app.mjs
```

---

## 📌 User Options

When prompted, choose one of the following:

```
1. Enter Location Manually
2. Get Location via IP address
3. Chat with AI Assistant
4. Exit App
```

---

## ⚠️ Error Handling

The app handles common API and runtime errors gracefully:

* ❌ Invalid city name
* 🔑 Invalid or missing API key
* ⏳ API rate limit exceeded
* 🌐 Network/API failures

Each error displays a meaningful message instead of crashing the app.

---

## 🧠 Learning Highlights

This project demonstrates:

* Async programming with `async/await`
* Modular code design
* CLI-based user interaction
* API integration & reuse
* Environment-based configuration
* Real-world Node.js application structure

---

## 👨‍💻 Author

**Krushna Diwate**\
