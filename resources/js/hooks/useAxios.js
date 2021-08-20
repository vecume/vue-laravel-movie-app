import axios from "axios";
import { ref } from "vue";
import { API_KEY, API_URL } from "../config";

axios.defaults.baseURL = API_URL;
axios.defaults.params = {};
axios.defaults.params["api_key"] = API_KEY;

export default function useAxios(
  { endpoint, method = "get", body, params, headers },
  isLazy = false
) {
  const loading = ref(false);
  const error = ref(null);
  const data = ref(null);

  async function fetchData({
    fendpoint,
    fmethod,
    fbody,
    fparams,
    fheaders,
  } = {}) {
    try {
      loading.value = true;
      const response = await axios({
        method: fmethod || method,
        url: fendpoint || endpoint,
        params: fparams || params,
        headers: fheaders || headers,
        data: fbody || body,
      });
      data.value = response;
      loading.value = false;
    } catch (err) {
      error.value = err;
      loading.value = false;
    }
    return new Promise((resolve, reject) => {
      resolve(data);
      reject(error);
    });
  }

  if (!isLazy) {
    fetchData();
  }

  return {
    response: data,
    loading: loading,
    error: error,
    fetchData,
  };
}
