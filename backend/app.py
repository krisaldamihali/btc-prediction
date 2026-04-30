from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import csv

app = Flask(__name__)
CORS(app)

PREDICTIONS_PATH = 'predictions.json'
FEATURES_PATH = 'processed_btc_features.csv'
MODEL_PATH = 'model.keras'
SCALER_PATH = 'scaler.pkl'

NOTEBOOK_METRICS = {
    "MAE": 23.77,
    "RMSE": 40.03,
    "MSE": 1602.78,
    "MSE_scaled": 0.00000405,
    "MAE_scaled": 0.00119477,
    "bias": 11.30,
    "mae_percent": 0.47,
    "actual_min": 3140,
    "actual_max": 6657,
}

def load_real_data():
    if os.path.exists(PREDICTIONS_PATH):
        with open(PREDICTIONS_PATH, 'r') as f:
            return json.load(f)
    return None

def load_feature_summary():
    summary = {
        "features": ["Close", "volume_log", "hour_sin", "hour_cos", "dow_sin", "dow_cos"],
        "rows": None,
        "start": None,
        "end": None,
    }

    if not os.path.exists(FEATURES_PATH):
        return summary

    row_count = 0
    first_timestamp = None
    last_timestamp = None

    with open(FEATURES_PATH, newline='') as f:
        reader = csv.DictReader(f)
        summary["features"] = [name for name in (reader.fieldnames or []) if name]

        for row in reader:
            timestamp = row.get("")
            if first_timestamp is None:
                first_timestamp = timestamp
            last_timestamp = timestamp
            row_count += 1

    summary.update({
        "rows": row_count,
        "start": first_timestamp,
        "end": last_timestamp,
    })
    return summary

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "active", "engine": "Keras LSTM validation service"})

@app.route('/model-info', methods=['GET'])
def model_info():
    data = load_real_data()
    if data:
        meta = data.get('metadata', {})
        samples = data.get('data', [])
        feature_summary = load_feature_summary()
        return jsonify({
            "name": "BTC Keras LSTM",
            "version": "local-artifact",
            "last_trained": samples[-1]["timestamp"] if samples else None,
            "dataset": "processed_btc_features.csv",
            "features": feature_summary["features"],
            "metrics": {
                "MAE": NOTEBOOK_METRICS["MAE"],
                "RMSE": NOTEBOOK_METRICS["RMSE"],
                "MSE": NOTEBOOK_METRICS["MSE"],
                "MSE_scaled": NOTEBOOK_METRICS["MSE_scaled"],
                "MAE_scaled": NOTEBOOK_METRICS["MAE_scaled"],
                "bias": NOTEBOOK_METRICS["bias"],
                "mae_percent": NOTEBOOK_METRICS["mae_percent"],
                "actual_min": NOTEBOOK_METRICS["actual_min"],
                "actual_max": NOTEBOOK_METRICS["actual_max"],
            },
            "architecture": meta.get('architecture'),
            "window_size": meta.get('window_size'),
            "horizon": meta.get('horizon'),
            "n_samples": meta.get('n_samples'),
            "prediction_range": {
                "start": samples[0]["timestamp"] if samples else None,
                "end": samples[-1]["timestamp"] if samples else None
            },
            "processed_data": feature_summary,
            "artifacts": {
                "model": MODEL_PATH,
                "scaler": SCALER_PATH,
                "predictions": PREDICTIONS_PATH
            },
            "status": "LOADED"
        })
    return jsonify({"status": "ERROR", "message": "Model data not found"})

@app.route('/predict', methods=['POST'])
def predict():
    req_data = request.json
    # Return saved validation/test points from predictions.json.
    horizon = int(req_data.get('horizon', 60))
    
    real_data = load_real_data()
    if not real_data:
        return jsonify({"error": "No model data available"}), 500

    max_horizon = int(real_data.get('metadata', {}).get('horizon', 60))
    horizon = max(1, min(horizon, max_horizon))

    samples = real_data['data'][-horizon:]
    
    dates = []
    predictions = []
    lower_bound = []
    upper_bound = []
    
    for sample in samples:
        dates.append(sample['timestamp'])
        
        pred_val = sample['predicted']
        predictions.append(round(float(pred_val), 2))
        
        error = abs(sample['error'])
        lower_bound.append(round(float(pred_val - error), 2))
        upper_bound.append(round(float(pred_val + error), 2))

    return jsonify({
        "dates": dates,
        "predictions": predictions,
        "lower_bound": lower_bound,
        "upper_bound": upper_bound,
        "actuals": [round(float(sample['actual']), 2) for sample in samples],
        "errors": [round(float(sample['error']), 2) for sample in samples],
        "trend": "UP" if predictions[-1] > predictions[0] else "DOWN",
        "metrics": {
            "MAE": NOTEBOOK_METRICS["MAE"],
            "RMSE": NOTEBOOK_METRICS["RMSE"],
            "MSE": NOTEBOOK_METRICS["MSE"],
            "MSE_scaled": NOTEBOOK_METRICS["MSE_scaled"],
            "MAE_scaled": NOTEBOOK_METRICS["MAE_scaled"],
            "bias": NOTEBOOK_METRICS["bias"],
            "mae_percent": NOTEBOOK_METRICS["mae_percent"],
            "actual_min": NOTEBOOK_METRICS["actual_min"],
            "actual_max": NOTEBOOK_METRICS["actual_max"],
        },
        "metadata": {
            "horizon": horizon,
            "generated_at": real_data['data'][-1]['timestamp'],
            "source": PREDICTIONS_PATH
        }
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
