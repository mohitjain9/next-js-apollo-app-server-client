import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
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

export const useGetMe = () => {
  const [errorMsg, setErrorMsg] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    fetcher('/api/me')
      .then((data) => {
        setData(data);
      })
      .catch(setErrorMsg);
  }, []);

  return [errorMsg, data];
};

export const useSingInSingUp = (url, onSuccessPath) => {
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const emailElement = event.currentTarget.elements.email;
    const passwordElement = event.currentTarget.elements.password;

    try {
      const {user} = await fetcher({
        method: 'post',
        url,
        data: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      });
      if (user) {
        await router.push(onSuccessPath);
      }
    } catch (error) {
      setErrorMsg(error);
    }
  }
  return [errorMsg, handleSubmit];
};

export function useLogOut() {
  const router = useRouter();
  const logout = async (event) => {
    event.stopPropagation();
    try {
      await fetcher('/api/signout');
      router.push('/signin');
    } catch (error) {
      setErrorMsg(error);
    }
  };
  return logout;
}

export const useSingIn = () => {
  return useSingInSingUp('/api/signin', '/');
};

export const useSingUp = () => {
  return useSingInSingUp('/api/signup', '/signin');
};

export const useHandleFileUpload = (fileInput, url = '/api/upload') => {
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();

  async function handleFileSubmit(event, cb) {
    event.preventDefault();
    if (fileInput.current.files) {
      const file = fileInput.current.files[0];
      let formData = new FormData();
      formData.append('file', file, file.name);

      try {
        await fetcher({
          method: 'post',
          url,
          data: formData,
        });
        fileInput.current.value = '';
        cb();
        setSuccessMsg('File Uploaded Successfully');
        setErrorMsg('');
      } catch (error) {
        setSuccessMsg('');
        setErrorMsg(error);
      }
    }
  }

  return [errorMsg, successMsg, handleFileSubmit];
};

export const useGetPhotos = (url = '/api/files') => {
  const [errorMsg, setErrorMsg] = useState();
  const [data, setData] = useState([]);
  const [renderCount, setRenderCount] = useState(0);
  try {
    useEffect(() => {
      fetcher(url).then((data) => {
        setData(data);
        setErrorMsg('');
      });
    }, [renderCount]);
  } catch (error) {
    setErrorMsg(error);
  }
  return [errorMsg, data, () => setRenderCount(renderCount + 1)];
};
