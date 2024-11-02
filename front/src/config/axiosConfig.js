import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://121.139.20.242:10102' : 'https://mediclean.comon.kr/api',
});

export default instance;
