import { NextRequest } from 'next/server'

const rateLimitMap = new Map()

export function rateLimit(request: NextRequest, limit = 10, windowMs = 60000) {
  const ip = request.headers.get('x-forwarded-for') || 
           request.headers.get('x-real-ip') || 
           'anonymous'
  const now = Date.now()
  const windowStart = now - windowMs
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [])
  }
  
  const requests = rateLimitMap.get(ip)
  const validRequests = requests.filter((time: number) => time > windowStart)
  
  if (validRequests.length >= limit) {
    return false
  }
  
  validRequests.push(now)
  rateLimitMap.set(ip, validRequests)
  
  return true
}