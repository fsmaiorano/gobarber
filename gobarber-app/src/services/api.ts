import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

// android 10.2.0.2;
// genymotion 10.0.3.2;
// ios localhost
