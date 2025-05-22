const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js"); 


router.post("/create", async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
});

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error retrieving tasks" });
    }
});

router.get("/id/:_id", async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) return res.status(404).send({ message: "Task not found" });
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error retrieving the task" });
    }
});

router.put("/markAsCompleted/:_id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params._id,
            { complete: true },
            { new: true }
        );
        if (!task) return res.status(404).send({ message: "Task not found" });
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error marking task as completed" });
    }
});

router.put("/id/:_id", async (req, res) => {
    try {
        const updateFields = {};
        if (req.body.title) updateFields.title = req.body.title;

        const task = await Task.findByIdAndUpdate(
            req.params._id,
            updateFields,
            { new: true }
        );
        if (!task) return res.status(404).send({ message: "Task not found" });
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating the task title" });
    }
});

router.delete("/id/:_id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) return res.status(404).send({ message: "Task not found" });
        res.status(200).send({ message: "Task successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error deleting the task" });
    }
});

module.exports = router;