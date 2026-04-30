const API_BASE_URL = 'http://localhost:5000';

export interface PredictionResponse {
  dates: string[];
  predictions: number[];
  actuals: number[];
  errors: number[];
  lower_bound: number[];
  upper_bound: number[];
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
  metrics: {
    MAE: number;
    RMSE: number;
    MSE: number;
    MSE_scaled: number;
    MAE_scaled: number;
    bias: number;
    mae_percent: number;
    actual_min: number;
    actual_max: number;
  };
  metadata: {
    horizon: number;
    generated_at: string;
    source: string;
  };
}

export interface ModelInfo {
  name: string;
  version: string;
  status: string;
  last_trained: string;
  dataset: string;
  features: string[];
  metrics: {
    MAE: number;
    RMSE: number;
    MSE: number;
    MSE_scaled: number;
    MAE_scaled: number;
    bias: number;
    mae_percent: number;
    actual_min: number;
    actual_max: number;
  };
  architecture: string;
  window_size: number;
  horizon: number;
  n_samples: number;
  prediction_range: {
    start: string;
    end: string;
  };
  processed_data: {
    features: string[];
    rows: number;
    start: string;
    end: string;
  };
  artifacts: {
    model: string;
    scaler: string;
    predictions: string;
  };
}

export const getPrediction = async (horizon: number): Promise<PredictionResponse> => {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ horizon }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch prediction');
  }

  return response.json();
};

export const getModelInfo = async (): Promise<ModelInfo> => {
  const response = await fetch(`${API_BASE_URL}/model-info`);
  if (!response.ok) {
    throw new Error('Failed to fetch model info');
  }
  return response.json();
};

export const checkHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.ok;
};
