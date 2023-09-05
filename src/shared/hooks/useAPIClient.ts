import { useCallback, useState } from "react";
import axios from "axios";
import { useErrorBoundary } from "react-error-boundary";
import { API_BASE_URL } from "../../data/constants";
import { APIClientParams, APIClientReturn } from "../../models/apiclient";

// This hook is a HTTP Client to access to RESTful services. 
// It will enable to have a separation of concerns so that it makes components coupled loosely from side effects of get remote data
// It is responsible for retrieving data and handling errors on the API calls
const useAPIClient = ({ 
  method = "get", 
  url = "", 
  // for get method
  params = {}, 
  // for post/put/delete method
  data: reqData = {} 
}: APIClientParams = {}): APIClientReturn  => {
  const { showBoundary } = useErrorBoundary();
  const [loading, setLoading] = useState(false);
  const [respData, setRespData] = useState(null);
  const [error, setError] = useState<unknown>(null);

  // The reason it has a parameter of config is that api calls can be deferred or refetching with different params or data
  const makeRequest = useCallback(async (config = {}) => {
    setLoading(true);
    setError(null);
    setRespData(null);

    try {
      const response = await axios({
        baseURL: API_BASE_URL,
        method, url, params, data: reqData,
        ...config
      });
      
      setRespData(response.data);
    } catch (e) {
      console.log("error on makeRequest: ", e);
      setError(e);
      // Note: if router is used, we can redirect to specific route instead of throwing an error
      // for example, 401 or 403 error for authentication
      showBoundary(e);
    } finally {
      setLoading(false);
    }
    
    // Note: it is wrapped with useCallback because it can be used as a effect dependency so dosn't need to have dependencies here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error, data: respData , makeRequest};
}

export default useAPIClient;
