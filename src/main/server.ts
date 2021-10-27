(async () => {
  const port = 5050
  const app = (await import('./config/app')).app
  app.listen(port, () => console.log(`App running on http://localhost:${port}`))
})()
