import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import platforms from '../data/platforms';
import APIClient from '../services/api-client';
// import apiClient, { FetchResponse } from '../services/api-client';

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const apiClient = new APIClient<Platform>('/platforms/lists/parents');
// const usePlatforms = () => useData<Platform>('/platforms/lists/parents');
// const usePlatforms = () => ({ data: platforms, isLoading: false, error: null });

const usePlatforms = () => {
  /*
  const fetchPlatforms = () => {
    return apiClient
      .get<FetchResponse<Platform>>('/platforms/lists/parents')
      .then((res) => res.data.results);
  };
  */
  return useQuery<Platform[], Error>({
    queryKey: ['platforms'],
    queryFn: apiClient.getAll,
    // queryFn: fetchPlatforms,
    staleTime: ms('24h'), // 24 hours - hours * mins * secs * milliSecs
    // staleTime: 24 * 60 * 60 * 1000, // 24 hours - hours * mins * secs * milliSecs
    initialData: platforms,
  });
};

export default usePlatforms;
