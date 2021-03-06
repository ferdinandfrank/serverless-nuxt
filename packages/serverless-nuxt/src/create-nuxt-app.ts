import { ALBHandler, APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda'
import { createServer, proxy } from 'aws-serverless-express'
import express from 'express'

const { Nuxt } = require('nuxt-start') // eslint-disable-line

export function createNuxtApp(nuxtConfig: any): APIGatewayProxyHandler | ALBHandler {
  nuxtConfig = nuxtConfig.default ? nuxtConfig.default : nuxtConfig

  const app = express()
  const nuxt = new Nuxt({
    ...nuxtConfig,
    dev: false,
    _start: true,
  })
  app.use(async (req, res) => {
    if (nuxt.ready) {
      await nuxt.ready()
    }
    nuxt.render(req, res)
  })
  const server = createServer(app, void 0, [
    'application/javascript',
    'application/json',
    'application/manifest+json',
    'application/octet-stream',
    'application/xml',
    'font/eot',
    'font/opentype',
    'font/otf',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/x-icon', // for favicon
    'text/comma-separated-values',
    'text/css',
    'text/html',
    'text/javascript',
    'text/plain',
    'text/text',
    'text/xml',
    'application/rss+xml',
    'application/atom+xml',
  ])
  return (event: APIGatewayProxyEvent, ctx: Context) => {
    proxy(server, event, ctx)
  }
}
