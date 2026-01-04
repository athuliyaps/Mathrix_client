import axios from 'axios';

const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
  const token = sessionStorage.getItem("token");
  console.log("Token inside commonAPI:", token); 

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}), 
  };

  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody,
    headers: reqHeader ? { ...defaultHeaders, ...reqHeader.headers } : defaultHeaders,
  };

  console.log("Request Config:", reqConfig); 

  try {
    return await axios(reqConfig).then(res => res); 
  } catch (err) {
    console.error("Axios error:", err.response || err.message); 
    return err.response || { error: "Request failed" }; 
};
}
export default commonAPI


