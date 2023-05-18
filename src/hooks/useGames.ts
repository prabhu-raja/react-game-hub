import { useQuery } from '@tanstack/react-query';
import { GameQuery } from '../App';
import useData from './useData';
import { Genre } from './useGenres';
import apiClient, { FetchResponse } from '../services/api-client';

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
  rating: number;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const useGames = (gameQuery: GameQuery) => {
  const fetchGames = () => {
    return apiClient
      .get<FetchResponse<Game>>('/games', {
        params: {
          genres: gameQuery.genre?.id,
          parent_platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
        },
      })
      .then((res) => res.data.results);
  };

  return useQuery<Game[], Error>({
    queryKey: ['games', gameQuery],
    queryFn: fetchGames,
    staleTime: 10 * 1000,
  });
};

/*
const useGames = (gameQuery: GameQuery) => {
  return useData<Game>(
    '/games',
    {
      params: {
        genres: gameQuery.genre?.id,
        parent_platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
      },
    },
    [gameQuery]
  );
};
*/

export default useGames;
