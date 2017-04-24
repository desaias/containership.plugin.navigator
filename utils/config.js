const API_URL = process.env.API_URL || 'http://127.0.0.1';
const API_VERSION = process.env.API_VERSION || 'v1';
const API = `${API_URL}/${API_VERSION}`;

export {
  API,
  API_URL,
  API_VERSION,
};
