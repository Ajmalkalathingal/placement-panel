import Cookies from 'js-cookie';
import { REFRESH_TOKEN,ACCESS_TOKEN } from '../constant';

export const setTokenCookies = (accessToken, refreshToken,user_type) => {
    Cookies.set(ACCESS_TOKEN, accessToken, { expires: 1/1440, secure: true, sameSite: 'Strict' }); 
    Cookies.set(REFRESH_TOKEN, refreshToken, { expires: 1/96,  sameSite: 'Strict' });
    Cookies.set('user_type', user_type , {  sameSite: 'Strict' });
  };