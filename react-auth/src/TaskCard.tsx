import {FC, useEffect, useState} from 'react'
import {
  Card,
  Form,
  Table,
  Button
} from 'react-bootstrap'
import axios from 'axios'

export const TaskCard: FC<{token: String}> = (props) => {
  const [task, setTask] = useState<String>("")
  const [taskList, setTaskList] = useState<Array<any>>([])
  const token = props.token

  useEffect(() => {
    getTasks();
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
      url: process.env.REACT_APP_API_URL + "tasks",
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
        getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTasks = () => {
    const configuration = {
      method: "get",
      url: process.env.REACT_APP_API_URL + "tasks",
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

  const completeTasks = (taskName: String) => {
    let name = taskName
    const configuration = {
      method: "put",
      url: process.env.REACT_APP_API_URL + "tasks",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
      }
    };

    axios(configuration)
      .then((result) => {
        getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTasks = (taskName: String) => {
    let name = taskName
    const configuration = {
      method: "delete",
      url: process.env.REACT_APP_API_URL + "tasks",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
      }
    };

    axios(configuration)
      .then((result) => {
        getTasks();
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

        <Form onSubmit={makeTask}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task name"
            />
          </Form.Group>
        </Form>

        <p>Incomplete</p>
        <Table hover>
          <tbody>
            {taskList.map((t) => (
              !t.completed && <tr key={t._id}>
                <td onClick={() => completeTasks(t.name)}>{t.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <p>Completed</p>
        <Table hover>
          <tbody>
            {taskList.map((t) => (
              t.completed && <tr key={t._id}>
                <td onClick={() => completeTasks(t.name)}>{t.name}</td>
                <td className="text-end" onClick={() => deleteTasks(t.name)}><Button variant="danger">X</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>

      </Card.Body>
    </Card>
  )
}