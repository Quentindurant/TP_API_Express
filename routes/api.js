
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/courses', async (req, res) => {
  try {
    const courses = await prisma.courses.findMany();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await prisma.courses.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/courses', async (req, res) => {
  try {
    const { title, price, instructor_id } = req.body;

    const course = await prisma.courses.create({
      data: {
        title,
        price: parseFloat(price),
        instructor_id: parseInt(instructor_id)
      }
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
