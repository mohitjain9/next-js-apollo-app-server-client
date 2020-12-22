import {useState} from 'react';
import {useRouter} from 'next/router';
import {useQuery, fetcher} from '../network';

export const useGetMe = () => {
  return useQuery('/api/me');
};

export const useGetPhotos = (url = '/api/files') => {
  return useQuery(url);
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

export const useSingIn = () => {
  return useSingInSingUp('/api/signin', '/');
};

export const useSingUp = () => {
  return useSingInSingUp('/api/signup', '/signin');
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
        cb && cb();
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
