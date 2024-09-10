import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// This is the msw server that will be used to mock the API requests
export const server = setupServer(...handlers)