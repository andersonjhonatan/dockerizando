const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
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

//TEST
app.get('/test', (req, res) => {
  try {
    res.status(200).json({ message: 'API working' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    console.log(users)
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
})

app.post('/users', async (req, res) => {
  const { name, email } = req.body
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const userByid = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json(userByid)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


app.delete('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
