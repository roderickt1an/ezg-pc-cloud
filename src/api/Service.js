/* eslint-disable */
import apiRoute from './config'
import { HttpService } from './http'

export class Service extends HttpService {
  constructor(module) {
    super('/api')
    if (!apiRoute[module]) {
      console.warn(`${module} is not found in apiRoute`)
    } else {
      for (let key in apiRoute[module]) {
        if (!apiRoute[module][key]) {
          return console.warn(`${key} is not a string `)
        }
        this[key] = async function(req, loading = false) {
          if (loading) {
            // 全局loading
          }
          // @ts-ignore
          let config = { url: apiRoute[module][key] }
          return key.indexOf('get') == 0
            ? await this.get(req, config)
            : await this.post(req, config)
        }
      }
    }
  }
}
