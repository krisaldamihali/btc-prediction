# AI Bitcoin Forecast Engine

A futuristic 3D web application for Bitcoin price prediction using Machine Learning.

## Features
- **3D Visualization**: Rotating Bitcoin coin and blockchain particles using Three.js and React Three Fiber.
- **ML Backend**: Flask API serving time series forecasting predictions.
- **Futuristic UI**: Dark fintech design with glassmorphism and neon accents.
- **Dynamic Charts**: Interactive forecast charts with confidence intervals.

## Tech Stack
- **Frontend**: Next.js 15, Tailwind CSS 4, Framer Motion, Three.js, Recharts.
- **Backend**: Flask, NumPy, Pandas, Scikit-learn.

## Getting Started

### 1. Start the Backend
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
```
The backend will run at `http://localhost:5000`.

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will run at `http://localhost:3000`.

## Architecture
- `POST /predict`: Generates future prices based on a selected horizon.
- `GET /model-info`: Returns technical specifications of the forecasting model.
- `GET /health`: System health monitoring.
