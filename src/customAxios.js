import axios from "axios";

export default async function customAxios(url, callback) {
    
  const response = await axios({
    url: "/api" + url,
    method: "post",
    baseURL: "http://localhost:8080",
    withCredentials: true
  });

  callback(response.data)

}
