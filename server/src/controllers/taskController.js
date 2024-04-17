const Task = require("../models/taskModel");
const { predictTime, placeholder } = require("../lib/gemini");
const { decodeToken } = require("../lib/decodeToken");

const createTask = (request, response) => {
  (request.body.dev ? predictTime(request.body.name) : placeholder())
    .then((value) => {
      const task = new Task({
        name: request.body.name,
        completed: request.body.completed,
        userId: request.body.userId,
        time: request.body.dev
          ? value.response.candidates[0].content.parts[0].text
          : 0,
      });
      task
        .save()
        .then((result) => {
          response.status(201).send({
            message: "Task created successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Task creation failed",
            error,
          });
        });
    })
    .catch(() => {
      console.log("error");
    });
};

const getTasks = (request, response) => {
  const id = decodeToken(request.headers.authorization);
  Task.find({ userId: { $eq: id } })
    .then((result) => {
      response.status(200).send({
        message: "Task fetched successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Task fetching failed",
        error,
      });
    });
};

const updateTask = (request, response) => {
  const id = decodeToken(request.headers.authorization);
  Task.findOne({ name: { $eq: request.body.name }, userId: { $eq: id } })
    .then((task) => {
      let comp = false;
      task.completed ? (comp = false) : (comp = true);

      Task.updateOne(
        { name: { $eq: request.body.name }, userId: { $eq: id } },
        { $set: { completed: comp } },
      )
        .then((result) => {
          response.status(200).send({
            message: "Task updated successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Task updating failed",
            error,
          });
        });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Task fetching failed",
        error,
      });
    });
};

const deleteTask = (request, response) => {
  const id = decodeToken(request.headers.authorization);
  Task.deleteOne({ name: { $eq: request.body.name }, userId: { $eq: id } })
    .then((result) => {
      response.status(200).send({
        message: "Task deleted successfully",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Task deletion failed",
        error,
      });
    });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
