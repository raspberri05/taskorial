const Task = require("../models/taskModel");
const { decodeToken } = require("../lib/decodeToken");
const { predictTime } = require("../lib/gemini");
/**
 * Creates a new task with the predicted time.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
const createTask = (request, response) => {
  predictTime(request.body.name)
    .then((value) => {
      const task = new Task({
        name: request.body.name,
        completed: request.body.completed,
        userId: request.body.userId,
        time: value.response.candidates[0].content.parts[0].text,
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
    .catch((error) => {
      response.status(500).send({
        message: "Prediction failed",
        error,
      });
    });
};

/**
 * Retrieves tasks for a user.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
const getTask = (request, response) => {
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

/**
 * Completes or uncompletes a task for a user.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
const completTask = (request, response) => {
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

/**
 * Deletes a task for a user.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
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

module.exports = { createTask, getTask, deleteTask, completTask };