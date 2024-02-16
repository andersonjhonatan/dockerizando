const { PrismaClient } = require('@prisma/client')
const { Router } = require('express')

const prisma = new PrismaClient()

const usersRouter = Router();

usersRouter.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
})

usersRouter.post('/users', async (req, res) => {
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

usersRouter.get('/users/:id', async (req, res) => {
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



usersRouter.delete('/users/:id', async (req, res) => {
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

module.exports = usersRouter