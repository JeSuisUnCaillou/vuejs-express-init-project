import axios from 'axios'
var url = process.env.VUE_APP_BACKEND_URL
url = process.env.VUE_APP_IS_E2E ? process.env.VUE_APP_E2E_BACKEND_URL : url

const apiPathFor = (path) => {
  return `${url}api/v1/${path}`
}

export default {
  errorMethod: (error) => {
    /* eslint-disable no-console */
    console.error(error.response.data.message || error.response.data || error)
    throw error
  },
  async dataResponseOf (method, path, data, config = {}) {
    try {
      const url = apiPathFor(path)
      const response = await axios[method](url, data, config)
      return response.data
    } catch (error) {
      this.errorMethod(error)
    }
  },
  async ping () {
    return await this.dataResponseOf('get', 'ping')
  },
  async errorPing () {
    return await this.dataResponseOf('get', 'errorPing')
  }
}
