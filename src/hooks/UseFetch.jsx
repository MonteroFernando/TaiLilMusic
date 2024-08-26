
import { useState, useCallback } from 'react';

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const doFetch = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    //probrando
    console.log(`Consultando en &{url}`);
    try {
      const response = await fetch(url, options);
      //prueba
      console.log('Estado de respuesta: ', response.status);
      if (!response.ok) throw new Error('Error en la solicitud');
      const result = await response.json();
      //prueba
      console.log('Reaultado del Fetch: ',result)
      setData(result);
    } catch (error) {
      //prueba
      console.log('error en el fetch: ', error)
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url, options]);

  return [{ data, isLoading, isError }, doFetch];
};

export default useFetch;
