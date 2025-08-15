// Configuration for different environments
const config = {
  // API URL based on environment
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // Other configuration options
  appName: 'Commitly',
  defaultPageSize: 10,
};

export default config;
