import { useEffect, useState } from 'react';
import { CanceledError } from 'axios';
import apiClient from '../services/api-client';

interface FetchResponse<G> {
  count: number;
  results: G[];
}

const useData = <T>(endPoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  //
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    
    apiClient
      .get<FetchResponse<T>>(endPoint, {signal: controller.signal})
      .then(res => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err?.message);
        setLoading(false);
      })

    return () => controller.abort();
  }, []);
  //
  return {data, error, isLoading};
};

export default useData;