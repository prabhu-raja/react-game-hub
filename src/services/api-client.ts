import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '5aac8aa220374fa3b9947ec0a897d9c1'
  }
})