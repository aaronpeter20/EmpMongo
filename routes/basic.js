const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeData');

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render('index', { employees });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/add', (req, res) => {
    res.render('add');
});

router.post('/add', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/update/:id", async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.render("update", { employee });
});

router.put("/update/:id", async (req, res) => {
    const { name, designation, location, salary } = req.body;
    await Employee.findByIdAndUpdate(req.params.id, {
        name,
        designation,
        location,
        salary,
    });
    res.redirect("/");
});

router.delete("/delete/:id", async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

module.exports = router;