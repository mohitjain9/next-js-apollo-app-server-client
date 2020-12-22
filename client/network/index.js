import {useState, useEffect} from 'react';
import axios from 'axios';

const fetchData = (fetchDatePayload) => {
  if (typeof fetchDatePayload !== 'string') {
    const {method, url, data} = fetchDatePayload;
    return axios({
      method: method || 'get',
      url,
      data,
    });
  }
  return axios.get(fetchDatePayload);
};

export const fetcher = (fetchDatePayload) => {
  return fetchData(fetchDatePayload)
    .then(({data}) => data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useQuery = (fetchPayload) => {
  const [errorMsg, setErrorMsg] = useState();
  const [data, setData] = useState();
  const [fetchDataFlag, toggleFetchData] = useState(false);

  useEffect(() => {
    setErrorMsg('');
    fetcher(fetchPayload)
      .then((data) => {
        setData(data);
      })
      .catch(setErrorMsg);
  }, [fetchDataFlag]);

  return [errorMsg, data, () => toggleFetchData(!fetchDataFlag)];
};
