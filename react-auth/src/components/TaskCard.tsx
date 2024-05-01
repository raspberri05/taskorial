import { FC, useEffect, useState } from "react";
import { Card, Form, Table, Button } from "react-bootstrap";
import axios from "axios";

import "../main.css";
import { TaskModel } from "../models/TaskModel";

/**
 * TaskCard component for displaying and managing tasks
 * Accepts props (properties): token
 * @param token - authentication token for API requests
 * @returns JSX element representing a card containing tasks and form inputs
 */

export const TaskCard: FC<{ token: string }> = (props) => {
  // Declare variables for managing tast-related data
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<Array<TaskModel>>([]);
  const [ai, setAi] = useState<boolean>(true);
  const [dev, setDev] = useState<boolean>(false); //change to true if you don't want to keep toggling on every page load
  const token = props.token;
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Function to get toggle state
   * @returns user's toggle state
   */
  const getToggle = () => {
    const configuration = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}toggle`,
      headers: {
        Authorization: `Bearer ${token}`, // Authorization token for API request
      },
    };

    // Send GET request to server
    axios(configuration)
      .then((result) => {
        // Update local state with retrieved toggle state
        console.log(result);
        setAi(result.data.result.toggle);
      })
      .catch((error) => {
        // log any errors to the console
        console.log(error);
        // return false by default if toggle state is not retrieved yet
        return false;
      });
    // return false by default if toggle state is not retrieved yet
    return false;
  };

  /**
   * Function to toggle the AI mode between true and false
   * @returns user's toggle state
   */
  const toggleAi = () => {
    setAi(!ai);
    const configuration = {
      method: "put",
      url: `${process.env.REACT_APP_API_URL}toggle`,
      headers: {
        Authorization: `Bearer ${token}`, // Authorization token for API request
      },
    };

    // Send PUT request to server to update toggle state
    axios(configuration)
      .then((success) => {
        // Log success message to the console
        console.log(success);
        return;
      })
      .catch((error) => {
        // Log any errors to the console
        console.log(error);
      });
  };

  /**
   * Function to retrieve AI data from server
   * logs result to console
   */
  const getAi = () => {
    const configuration = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}ai`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    // Send GET request to server
    axios(configuration)
      .then((result) => {
        // log AI data to console
        console.log(result.data.result.response.candidates[0].content.parts[0]);
      })
      .catch((error) => {
        // log errors to console
        console.log(error);
      });
  };

  /**
   * Function to sort list of tasks
   * @param tasks - list of tasks to be sorted
   * @returns sorted list of tasks
   */
  const sortTasks = (tasks: TaskModel[]) => {
    return tasks.sort((a: TaskModel, b: TaskModel) => {
      if (a.completed === b.completed) {
        // If completed status is the same, compare by createdAt
        if (a.createdAt < b.createdAt) {
          return -1; // a comes before b
        } else if (a.createdAt > b.createdAt) {
          return 1; // b comes before a
        } else {
          return 0; // createdAt values are equal
        }
      } else {
        // If completed status is different, sort by completed status
        return a.completed ? -1 : 1; // true comes before false
      }
    });
  }

  /**
   * Function to retrieve tasks from the server
   * API request to fetch tasks
   * Sorts the fetched tasks and updates the 'taskList' state
   */
  const getTasks = () => {
    // Configuration for GET request to fetch tasks from server
    const configuration = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}tasks`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Send GET request
    axios(configuration)
      .then((result) => {
        // Extract task data from response
        const res = result.data.result;

        // Sort tasks based on completetion status and creatio date
        sortTasks(res);
        
        // Update task list state with fetched tasks
        setTaskList([...res].reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch initial data when the component is rendered
  useEffect(() => {
    getToggle();
    getTasks();
    // eslint-disable-next-line
  }, []);

  /**
   * Function to create a new task
   * Handles form submission to create a new task
   * Sends a request to server to create a new task
   * @param e - form event object
   */
  const makeTask = (e: React.FormEvent) => {
    e.preventDefault();
    (e.target as HTMLFormElement).reset();

    // Extract user ID from token
    const obj = JSON.parse(atob(token.split(".")[1]));
    const name = task;
    const completed = false;
    const userId = obj.userId;
    setIsLoading(true);
    
    // Prepare configuration for API request
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}tasks`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        completed,
        userId,
        dev,
      },
    };

    // Send POST request to create a new task
    axios(configuration)
      .then((result) => {
        console.log(result);
        setTask("");
        setIsLoading(false);
        const createdTask: TaskModel = result.data.result;
        const newTaskList: TaskModel[] = sortTasks([...taskList, createdTask]);
        setTaskList(newTaskList.reverse());
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  /**
   * Function to toggle completed status of a task
   * Toggles completed status of a specified task
   * Sends a request to server to update task's completed status
   * @param taskName - name of task to toggle
   */
  const completeTasks = (taskName: string) => {
    const name: string = taskName;
    const index: number = taskList.findIndex((x) => x.name === name);
    const tasks: TaskModel[] = [...taskList];

    // Toggle completion status of task
    tasks[index].completed = !tasks[index].completed;

    // Sort task list based on completion status and creation time
    sortTasks(tasks);

    // Update task list state with sorted list
    setTaskList(tasks.reverse());

    // Prepare configuration for API request to update task
    const configuration = {
      method: "put",
      url: `${process.env.REACT_APP_API_URL}tasks`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
      },
    };

    // Send PUT request to task completion status
    axios(configuration)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Function to delete a task
   * Deletes specified task from task list
   * Sends a request to server to delete task
   * @param taskName - name oftask to be deleted
   * @param e - form event object
   */
  const deleteTasks = (taskName: string, e: React.FormEvent) => {
    // Prevent event from propagating further
    e.stopPropagation();

    // Extracting task info
    const name: string = taskName;
    const index: number = taskList.findIndex((x) => x.name === name);
    
    // Create a copy of task list and remove specified task
    const tasks: TaskModel[] = [...taskList];
    tasks.splice(index, 1);

    // Update task list state
    setTaskList(tasks);

    // Configuration for DELETE request to delete task frm server
    const configuration = {
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}tasks`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
      },
    };

    // Send DELETE request
    axios(configuration)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /**
  * Function to toggle developer toggle
  */
  const toggleDev = () => {
    setDev(!dev);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">My Tasks</Card.Title>
        <br />
        {dev && ai && (
          <Button onClick={getAi}>
            Gemini Test (check console devtools for output)
          </Button>
        )}
        {dev && ai && <br />}
        {dev && ai && <br />}
        <Form onSubmit={(e) => makeTask(e)}>
          <div className="d-flex align-items-end">
            <Form.Switch
              type="switch"
              id="custom-switch"
              checked={dev}
              onChange={() => toggleDev()}
            />
            <Form.Label className="text-center m-0">
              {dev ? "Disable Developer Mode" : "Enable Developer Mode"}
            </Form.Label>
          </div>
          &nbsp;
          {ai && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                disabled={isLoading}
                onChange={(e) => setTask(e.target.value)}
                value={task}
                placeholder={
                  taskList.length > 0
                    ? "Enter Task Name"
                    : "Add your first task"
                }
              />
            </Form.Group>
          )}
          {!ai && <p>manual task creation coming soon</p>}
          {dev && (
            <div className="d-flex align-items-end">
              <Form.Switch
                type="switch"
                id="custom-switch"
                checked={ai}
                onChange={() => toggleAi()}
              />
              <Form.Label className="text-center m-0">
                {ai ? "Disable AI Mode" : "Enable AI Mode"}
              </Form.Label>
            </div>
          )}
        </Form>
        <Table>
          <tbody>
            {taskList.map((t) => (
              <tr key={t._id}>
                <td style={{ width: "50px" }} className="align-middle">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    readOnly
                    className="form-check-input"
                    onClick={() => completeTasks(t.name)}
                  />
                </td>
                <td className="align-middle">
                  {t.completed ? <s>{t.name}</s> : t.name}
                </td>
                <td style={{ width: "100px", padding:"5px" }} className="align-middle">
                  {t.completed ? (
                    <Button
                      onClick={(e) => deleteTasks(t.name, e)}
                      className="delete"
                      variant="danger"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </Button>
                  ) : (
                    dev && t.time
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
