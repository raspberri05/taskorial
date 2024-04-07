import { FC, useEffect, useState } from "react";
import { Card, Form, Table, Button } from "react-bootstrap";
import axios from "axios";

import "./main.css";

export const TaskCard: FC<{ token: string }> = (props) => {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<Array<any>>([]);
  const [ai, setAi] = useState<boolean>(true);
  const token = props.token;

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
        setTaskList([...res].reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  const makeTask = (e: any) => {
    e.preventDefault();
    e.target.reset();

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
    let tasks: any = [...taskList];
    tasks[index].completed = !tasks[index].completed;

    const sortedTasks = sortTasks(index, tasks[index].completed);

    setTaskList(sortedTasks);
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

  const deleteTasks = (taskName: string, e: any) => {
    e.stopPropagation();
    let name: string = taskName;
    let index: number = taskList.findIndex((x) => x.name === name);
    let tasks: any = [...taskList];
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

  const sortTasks = (index: number, completed: boolean) => {
    const sortTasks = [...taskList];
    const [task] = sortTasks.splice(index, 1);

    completed ? sortTasks.push(task) : sortTasks.unshift(task)
    
    return sortTasks;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">My Tasks</Card.Title>
        <br />
        <Button onClick={getAi}>
          Gemini Test (check console devtools for output)
        </Button>
        <br />
        <br />
        <Form onSubmit={makeTask}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => setTask(e.target.value)}
              placeholder={
                taskList.length > 0 ? "Enter Task Name" : "Add your first task"
              }
            />
          </Form.Group>
          <Form.Switch
            className="align-middle toggle" // prettier-ignore
            type="switch"
            id="custom-switch"
            label={ai ? "Disable AI Mode" : "Enable AI Mode"}
            checked={ai}
            onChange={() => setAi(!ai)}
          />
        </Form>
        &nbsp;
        <Table>
          <tbody>
            {taskList.map((t) => (
              <tr key={t._id}>
                <td className="align-middle">
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
                {t.completed === false && (
                  <td className="align-middle">{t.time}</td>
                )}
                {t.completed === true && (
                  <td>
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
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
