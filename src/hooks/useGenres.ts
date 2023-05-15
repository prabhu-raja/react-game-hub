import { useQuery } from '@tanstack/react-query';
import genres from '../data/genres';
import useData, { FetchResponse } from './useData';
import apiClient from '../services/api-client';

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

// const useGenres = () => useData<Genre>('/genres');
// const useGenres = () => ({ data: genres, isLoading: false, error: null });
const useGenres = () => {
  const fetchGenres = () => {
    return apiClient.get<FetchResponse<Genre>>('/genres').then((res) => res.data.results);
  };
  return useQuery<Genre[], Error>({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - hours * mins * secs * milliSecs
    initialData: genres,
  });
};

export default useGenres;
