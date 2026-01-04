import axios from 'axios';

const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
  // Get the token from sessionStorage
  const token = sessionStorage.getItem("token");
  console.log("Token inside commonAPI:", token); // Debugging

  // Default headers (include Authorization only if token exists)
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // Add token for authenticated requests only
  };

  // Request configuration
  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody,
    headers: reqHeader ? { ...defaultHeaders, ...reqHeader.headers } : defaultHeaders,
  };

  console.log("Request Config:", reqConfig); // Debugging log

  try {
    return await axios(reqConfig).then(res => res); // Successful response
  } catch (err) {
    console.error("Axios error:", err.response || err.message); // Log errors
    return err.response || { error: "Request failed" }; // Return error response
  }
};

export default commonAPI



//  set default headers including authorization
  //const defaultHeaders = {
    //'Content-Type':'application/json',
    //Authorization: `Bearer ${token}`
  //}