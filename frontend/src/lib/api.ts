const API_BASE_URL = 'http://localhost:5000';

export interface PredictionResponse {
  dates: string[];
  predictions: number[];
  lower_bound: number[];
  upper_bound: number[];
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
  metrics: {
    MAE: number;
    RMSE: number;
    MAPE: string;
    R2: number;
  };
  metadata: {
    horizon: number;
    generated_at: string;
  };
}

export interface ModelInfo {
  name: string;
  version: string;
  last_trained: string;
  dataset: string;
  features: string[];
  metrics: {
    MAE: number;
    RMSE: number;
    MAPE: string;
    R2: number;
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
