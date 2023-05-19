import axios, { AxiosRequestConfig } from 'axios';

export interface FetchResponse<G> {
  count: number;
  next: string | null;
  results: G[];
}

// export default axios.create({
//   baseURL: 'https://api.rawg.io/api',
//   params: {
//     key: '5aac8aa220374fa3b9947ec0a897d9c1'
//   }
// })

const axiosInstance = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '5aac8aa220374fa3b9947ec0a897d9c1',
  },
});

class APIClient<T> {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endPoint, config)
      .then((res) => res.data.results);
  };
}

export default APIClient;
