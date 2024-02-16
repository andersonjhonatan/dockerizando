const express = require('express')
import usersRouter from './routes/usersRoutes'

const app = express()

//JSON
app.use(express.json())

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(usersRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
