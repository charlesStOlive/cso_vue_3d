import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://monsite.test/api`,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
