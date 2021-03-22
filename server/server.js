const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const path = require('path')
const history = require('connect-history-api-fallback')

const routesForApi = require('./api/routes.js')

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'
const isProd = !isDev && !isTest
const port = isDev ? 8081 : isTest ? 8083 : process.env.PORT

const app = express()
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Allow CORS in development & test
if (!isProd) {
  const cors = require('cors')
  app.use(cors())
}

// Static frontend
app.use(history())
app.use('/', serveStatic(path.join(__dirname, '../dist')))

// The actual server
const server = app.listen(port, () => {
  console.log('App is running on port ' + port)
})

// Api routes
routesForApi(app)

// Redirect to https in production, for auth0 callbacks
app.use(function (request, response) {
  if (isProd && !request.secure) {
    response.redirect('https://' + request.headers.host + request.url)
  }
})
