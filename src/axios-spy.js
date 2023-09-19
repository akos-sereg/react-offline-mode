const originalAxios = require('axios');
import wrapper from './axios-wrapper';

const axios = wrapper(originalAxios);
export default axios;
