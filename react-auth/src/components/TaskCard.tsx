import { FC, useEffect, useState } from "react";
import { Card, Form, Table, Button } from "react-bootstrap";
import axios from "axios";

import "../main.css";
import { TaskModel } from "../models/TaskModel";

export const TaskCard: FC<{ token: string }> = (props) => {
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
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((result) => {
        console.log(result);
        setAi(result.data.result.toggle);
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return false;
  };

  /**
   * Function to toggle the toggle between true and false
   * @returns user's toggle state
   */
  const toggleAi = () => {
    setAi(!ai);
    const configuration = {
      method: "put",
      url: `${process.env.REACT_APP_API_URL}toggle`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((success) => {
        console.log(success);
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAi = () => {
    const configuration = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}ai`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((result) => {
        console.log(result.data.result.response.candidates[0].content.parts[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTasks = () => {
    const configuration = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}tasks`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((result) => {
        const res = result.data.result;
        res.sort((a: any, b: any) => {
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
        setTaskList([...res].reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getToggle();
    getTasks();
    // eslint-disable-next-line
  }, []);

  const makeTask = (e: React.FormEvent) => {
    e.preventDefault();
    (e.target as HTMLFormElement).reset();

    const obj = JSON.parse(atob(token.split(".")[1]));
    const name = task;
    const completed = false;
    const userId = obj.userId;
    setIsLoading(true);
    

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

    axios(configuration)
      .then((result) => {
        console.log(result);
        setTask("");
        setIsLoading(false);
        getTasks();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const completeTasks = (taskId: string) => {
    const id: string = taskId;
    const index: number = taskList.findIndex((x) => x._id === id);
    const tasks: TaskModel[] = [...taskList];
    tasks[index].completed = !tasks[index].completed;
    tasks.sort((a: any, b: any) => {
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
    setTaskList(tasks.reverse());
    const configuration = {
      method: "put",
      url: `${process.env.REACT_APP_API_URL}tasks`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name:tasks[index].name,
      },
    };

    axios(configuration)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTasks = (taskId: string, e: React.FormEvent) => {
    e.stopPropagation();
    const id: string = taskId;
    const index: number = taskList.findIndex((x) => x._id === id);
    const tasks: TaskModel[] = [...taskList];
    const name = tasks[index].name;
    tasks.splice(index, 1);
    setTaskList(tasks);
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

    axios(configuration)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                    onClick={() => completeTasks(t._id)}
                  />
                </td>
                <td className="align-middle">
                  {t.completed ? <s>{t.name}</s> : t.name}
                </td>
                <td style={{ width: "100px", padding:"5px" }} className="align-middle">
                  {t.completed ? (
                    <Button
                      onClick={(e) => deleteTasks(t._id, e)}
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
