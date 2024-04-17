import { FC, useEffect, useState } from "react";
import { Card, Form, Table, Button } from "react-bootstrap";
import axios from "axios";

import "../main.css";
import { TaskModel } from "../models/TaskModel";

export const TaskCard: FC<{ token: string }> = (props) => {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<Array<TaskModel>>([]);
  const [ai, setAi] = useState<boolean>(true);
  const token = props.token;

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
        let res = result.data.result;
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

    let obj = JSON.parse(atob(token.split(".")[1]));
    let name = task;
    let completed = false;
    let userId = obj.userId;

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
      },
    };

    axios(configuration)
      .then((result) => {
        console.log(result);
        getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const completeTasks = (taskName: string) => {
    let name: string = taskName;
    let index: number = taskList.findIndex((x) => x.name === name);
    let tasks: TaskModel[] = [...taskList];
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

  const deleteTasks = (taskName: string, e: React.FormEvent) => {
    e.stopPropagation();
    let name: string = taskName;
    let index: number = taskList.findIndex((x) => x.name === name);
    let tasks: TaskModel[] = [...taskList];
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

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">My Tasks</Card.Title>
        <br />
        {ai && (
          <Button onClick={getAi}>
            Gemini Test (check console devtools for output)
          </Button>
        )}
        {ai && <br />}
        {ai && <br />}
        <Form onSubmit={makeTask}>
          {ai && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setTask(e.target.value)}
                placeholder={
                  taskList.length > 0
                    ? "Enter Task Name"
                    : "Add your first task"
                }
              />
            </Form.Group>
          )}
          {!ai && <p>manual task creation coming soon</p>}
          <Form.Switch
            className="d-flex align-items-center toggle" // Add d-flex and align-items-center classes
            type="switch"
            id="custom-switch"
            label={
              <span style={{ marginRight: "10px", paddingLeft: "5px" }}>
                {ai ? "Disable AI Mode" : "Enable AI Mode"}
              </span>
            }
            checked={ai}
            onChange={() => toggleAi()}
          />
        </Form>
        &nbsp;
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
                <td style={{ width: "100px" }} className="align-middle">
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
                    t.time
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
