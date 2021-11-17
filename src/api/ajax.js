import axios from 'axios';
import getAuthorizationHeader from './getAuthorizationHeader';

export default function ajax(url, data = {}) {
  let paramStr ='';
  Object.keys(data).forEach( key => {
    paramStr += key + '=' + data[key].toString() + '&'
  })
  paramStr += '$format=JSON'

  return axios.get(
    url + '?' + paramStr,
    {
      headers: getAuthorizationHeader()
    }
  );
}