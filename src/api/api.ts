import createClient from 'openapi-fetch'
import type { paths } from './openapi'

export const BASE_URL = import.meta.env.DEV
  ? 'http://localhost:3000/'
  : 'https://{traO-backend-url}/' // TODO

export const apiClient = createClient<paths>({
  baseUrl: BASE_URL,
  credentials: 'include'
})
