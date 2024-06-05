"use client"

import { Card, Form, Button, Table, Spinner } from 'react-bootstrap';
import {useEffect, useState} from "react";
import axios from "axios";

export default function TaskCard({userId}:any) {

  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);

  function insertTask(e: React.FormEvent) {
    e.preventDefault();
    (e.target as HTMLFormElement).reset();
    setIsLoading(true)

    const config = {
      method: "post",
      url: `/api/tasks`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        name: task,
      }
    }

    axios(config)
      .then((result) => {
        setTask('')
        getTasks()
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error")
      })
  }

  function getTasks() {
    const config = {
      method: "get",
      url: `/api/tasks`,
    }

    axios(config)
      .then((result) => {
        setTaskList([...result.data].reverse());
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function completeTask(taskId:string, completion:boolean) {
    const config = {
      method: "put",
      url: `/api/tasks?updateTask=true`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        taskId: taskId,
        completion: !completion
      }
    }

    axios(config)
      .then((result) => {
        getTasks()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function deleteTask(taskId:string) {
    const config = {
      method: "delete",
      url: `/api/tasks?taskId=${taskId}`,
    }

    axios(config)
      .then((result) => {
        getTasks()
      })
      .catch((error) => {
        console.log(error)
      })

  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Card className="bg-dark text-bg-dark border-secondary">
      <Card.Body>
        <Card.Title className="text-center">Tasks</Card.Title>
        <Form onSubmit={(e) => insertTask(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control className="bg-dark text-bg-dark border-secondary"
              disabled={isLoading}
              placeholder="Add your first task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </Form.Group>
          {isLoading && <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>}
        </Form>
        <Table>
          <tbody>
          {taskList.map((t) => (
            <tr key={t._id} className="border-secondary">
              <td style={{ width: "50px" }} className="align-middle bg-dark text-bg-dark">
                <input
                  type="checkbox"
                  checked={t.completed}
                  readOnly
                  className="form-check-input"
                  onClick={() => completeTask(t._id, t.completed)}
                />
              </td>
              <td className="align-middle bg-dark text-bg-dark">
                {t.completed ? <s>{t.name}</s> : t.name}
              </td>
              <td style={{ width: "100px", padding:"5px" }} className="align-middle bg-dark text-bg-dark">
                {t.completed ? (
                  <Button
                    onClick={() => deleteTask(t._id)}
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
  )
}