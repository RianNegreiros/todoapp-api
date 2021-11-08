import { NextFunction, Request, Response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import redis from 'redis'

const redisClinet = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  enable_offline_queue: false,
})

const limiter = new RateLimiterRedis({
  storeClient: redisClinet,
  keyPrefix: 'rateLimiter',
  points: 5,
  duration: 5,
})

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await limiter.consume(request.ip)
    return next()
  } catch (error) {
    throw new Error('Too many requests')
  }
}
