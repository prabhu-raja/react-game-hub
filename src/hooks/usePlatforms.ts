import useData from './useData';
import platforms from '../data/platforms';
import { useQuery } from '@tanstack/react-query';
import apiClient, { FetchResponse } from '../services/api-client';

interface Platform {
  id: number;
  name: string;
  slug: string;
}

// const usePlatforms = () => useData<Platform>('/platforms/lists/parents');
// const usePlatforms = () => ({ data: platforms, isLoading: false, error: null });

const usePlatforms = () => {
  const fetchPlatforms = () => {
    return apiClient
      .get<FetchResponse<Platform>>('/platforms/lists/parents')
      .then((res) => res.data.results);
  };
  return useQuery<Platform[], Error>({
    queryKey: ['platforms'],
    queryFn: fetchPlatforms,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - hours * mins * secs * milliSecs
    initialData: platforms,
  });
};

export default usePlatforms;
