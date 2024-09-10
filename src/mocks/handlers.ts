import { http, HttpResponse } from 'msw'
import { mockUsers } from './users'

// Used to mock jsonplaceholder API
export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users', () => {
    return HttpResponse.json(mockUsers);
  }),
]