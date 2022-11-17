import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from './routes/pools'
import { guessRoutes } from './routes/guess'
import { gameRoutes } from './routes/game'
import { userRoutes } from './routes/user'
import { authRoutes } from './routes/auth'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.get('/', (req, res) => {
    return res.send('Hello World!')
  })

  await fastify.register(cors, {
    origin: true, // depois colocar por exemplo www.denilson.com.br
  })

  await fastify.register(jwt, {
    secret: 'abc3358b7afee595016baab36857a0fa', // .env
  })

  await fastify.register(poolRoutes)
  await fastify.register(authRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(gameRoutes)
  await fastify.register(userRoutes)

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()
