import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Add any global test setup here
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock web APIs for Node.js environment
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Request and Response for Next.js API testing
global.Request = jest.fn().mockImplementation((url, options) => ({
  url,
  method: options?.method || 'GET',
  headers: new Map(Object.entries(options?.headers || {})),
  json: jest.fn(),
  text: jest.fn(),
  ...options,
}))

global.Response = jest.fn().mockImplementation((body, options) => ({
  status: options?.status || 200,
  headers: new Map(Object.entries(options?.headers || {})),
  json: jest.fn().mockResolvedValue(JSON.parse(body || '{}')),
  text: jest.fn().mockResolvedValue(body || ''),
  ...options,
}))

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    pop: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(() => Promise.resolve()),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}))

// Mock next/navigation for Next.js 13+
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/',
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
