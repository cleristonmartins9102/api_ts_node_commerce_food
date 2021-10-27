import express from 'express'

const app = express()

app.post('/api', (req, res, next) => {
  console.log('rodou')
})

app.listen(5050, () => 'Running')
