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
- [Node.js](https://nodejs.org/) (Optional, but recommended for online server mode. If not installed, the platform automatically starts in static offline mode).

### Starting the Dashboard
To start the dashboard locally, simply run:
```bash
Start_Dashboard.bat
```
This script will automatically:
1. Detect if Node.js is installed.
2. Install standard dependencies (`express`) if `node_modules` is not found.
3. Start the Express server on [http://localhost:3000](http://localhost:3000).
4. Launch your default web browser to the dashboard.

*Note: If Node.js is missing, it launches directly in **Static Offline Mode** using the browser's `localStorage`.*
