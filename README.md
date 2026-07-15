# Quality Dashboard

A premium quality audit and analytics dashboard platform designed for call center agents. It features a complete quality monitoring flow, performance tracking via interactive charts, quartile segmentation, historical reporting, and a reliable dynamic offline mode.

## Authors
- **Diego Alejandro Leon Tamayo**
- Collaborator: **Jenniffer Arangure Bejarano**

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Project Structure
- `server.js` - Main Express backend server API.
- `public/` - Main client-side files (HTML, CSS, JavaScript views, and dynamic resources).
- `data/` - Storage directory:
  - `data/advisors.csv` - Configured advisors list grouped by campaign.
  - `data/matriz_quality.csv` - Evaluation parameters and score weights.
  - `data/evaluations/` - Saved quality evaluations in JSON format.

## Setup and Run

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 16 or higher is recommended).

### 1. Install Dependencies
To install the required npm packages (e.g. `express`), run the following command in the project root directory:
```bash
npm install
```

### 2. Start the Express Server
You can put the server in motion using one of the following methods:

#### Option A: Using NPM (Recommended for development/production)
Start the Express server on [http://localhost:3000](http://localhost:3000) by running:
```bash
npm start
```

#### Option B: Using the Automated Startup Script (Windows)
Double-click or run the batch file from your terminal:
```bash
Start_Dashboard.bat
```
*Note: This script will automatically check if Node.js is installed, install dependencies if missing, launch the Express server, and open the dashboard in your default browser. If Node.js is missing, it will automatically fall back to **Static Offline Mode** using the browser's `localStorage`.*

#### Option C: Running in Static Offline Mode (No Node.js / No Server Required)
If you do not have Node.js installed or want to run the platform entirely on the client side:
1. Navigate into the `public/` folder.
2. Open `index.html` directly in your default web browser (e.g., by double-clicking the file or dragging it into a browser window).
3. The application will detect the local file system execution and activate **Static Offline Mode** automatically. All evaluations and historical audits will be stored directly inside your browser's local storage.


