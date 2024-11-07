// constants/api.js

// Development/local environment
export const API_BASE_URL_DEV = '${API_BASE_URL}';

// Production environment (hosted on Vercel and PythonAnywhere)
export const API_BASE_URL_PROD = 'https://babyjoy456.pythonanywhere.com';

// Use the appropriate base URL based on your environment
export const API_BASE_URL = process.env.NODE_ENV === 'production' ? API_BASE_URL_PROD : API_BASE_URL_DEV;