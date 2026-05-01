# Bitcoin Price Forecast

A web dashboard for exploring a historical Bitcoin price forecast. The app compares the model's predicted BTC price with the actual market price and presents the results in a clear, visual way.

## What the App Shows

- Actual Bitcoin price and predicted Bitcoin price side by side.
- Interactive chart comparing real and predicted prices.
- Forecast accuracy summary based on the latest evaluation notebook.
- Visual performance plots for forecast quality and error distribution.

## Current Evaluation Results

| Metric | Value |
| --- | ---: |
| Tested price points | 2,350 |
| Average error | $23.77 |
| Larger-error score | $40.03 |
| MSE | $1,602.78 |
| Mean bias | +$11.30 |
| Average error share | 0.47% |
| Actual price range | $3,140 - $6,657 |

## Tech Stack

- Frontend: Next.js 16, React 19, Tailwind CSS, Framer Motion, Three.js, Recharts.
- Backend: Flask API serving saved model results and evaluation metadata.
- Model artifacts: Keras LSTM output files, processed BTC features, scaler, plots, and saved prediction results.

## Project Structure

```text
bitcoin-prediction/
  backend/
    app.py
    model.keras
    predictions.json
    processed_btc_features.csv
    scaler.pkl
    requirements.txt
  frontend/
    src/
    public/plots/
    package.json
```

## Run Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend URL:

```text
http://127.0.0.1:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

## API Endpoints

- `GET /health` checks whether the backend is active.
- `GET /model-info` returns model metadata and evaluation metrics.
- `POST /predict` returns actual prices, predicted prices, errors, and summary metrics for the selected range.

Example request:

```bash
curl -X POST http://127.0.0.1:5000/predict ^
  -H "Content-Type: application/json" ^
  -d "{\"horizon\":30}"
```

## Notes

This project displays historical forecast evaluation results. It is not financial advice and should not be used as a trading recommendation.

## Copyright

Copyright © 2026 Krisalda Mihali. All rights reserved.

This project, including its source code, interface design, model outputs, documentation, and visual assets, is protected by copyright. No part of this project may be copied, redistributed, modified, published, or used commercially without written permission from the author.
