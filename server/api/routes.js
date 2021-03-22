module.exports = (app) => {
  app.get('/api/v1/ping', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.send('pong')
  })

  app.get('/api/v1/errorPing', (req, res) => {
    throw new Error("Pong error")
  })

  app.use((error, req, res, next) => {
    console.error(error)
    res.status(500).send({ message: error.message || error })
  })
}
