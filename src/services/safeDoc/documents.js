import { request, config } from 'utils'

const { api } = config
const { documentsList } = api

export function query (params) {
  return request({
    url: documentsList,
    method: 'get',
    data: params,
  })
}
