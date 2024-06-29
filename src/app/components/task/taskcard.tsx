"use client";

import { useEffect, useState } from "react";

export default function TaskCard({ userId }: { userId: string }) {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);

  function insertTask(e: React.FormEvent) {
    e.preventDefault();
    (e.target as HTMLFormElement).reset();
    setIsLoading(true);

    const url = "/api/tasks";
    const data = JSON.stringify({
      name: task,
    });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`,
      },
      body: data,
    })
      .then(() => {
        setTask("");
        getTasks();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getTasks() {
    const url = "/api/tasks";

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const res = result;
        res.sort((a: any, b: any) => {
          if (a.completed === b.completed) {
            if (a.createdAt < b.createdAt) {
              return -1;
            } else if (a.createdAt > b.createdAt) {
              return 1;
            } else {
              return 0;
            }
          } else {
            return a.completed ? -1 : 1;
          }
        });
        setTaskList([...res].reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function completeTask(taskId: string, completion: boolean) {
    const id: string = taskId;
    const index: number = taskList.findIndex((x) => x._id === id);
    const tasks: any = [...taskList];
    tasks[index].completed = !tasks[index].completed;
    tasks.sort((a: any, b: any) => {
      if (a.completed === b.completed) {
        if (a.createdAt < b.createdAt) {
          return -1;
        } else if (a.createdAt > b.createdAt) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return a.completed ? -1 : 1;
      }
    });
    setTaskList(tasks.reverse());
    const url = "/api/tasks?updateTask=true";
    const data = JSON.stringify({
      taskId,
      completion,
    });

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`,
      },
      body: data,
    })
      .then(() => {
        getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteTask(taskId: string) {
    const id: string = taskId;
    const newList: any = taskList.filter((x) => x._id !== id);
    setTaskList(newList);
    const url = `/api/tasks?taskId=${taskId}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    })
      .then(() => {
        getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="card">
        <div className="card-body w-23-rem">
          <h2 className="card-title justify-center">Tasks</h2>
          <form onSubmit={(e) => insertTask(e)}>
            <div className="col-span-full">
              <div className="mt-2">
                <input
                  disabled={isLoading}
                  placeholder="do laundry tomorrow at 10am"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 placeholder-gray-400 text-gray-600"
                />
              </div>
            </div>
          </form>
          {isLoading && <span className="loading loading-spinner loading-sm" />}
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "5px" }} />
                  <th style={{ width: "400px" }}>Task</th>
                  <th style={{ width: "5px" }}>
                    <button className="btn btn-xs disabled">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-stopwatch"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
                        <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
                      </svg>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {taskList.map((t) => (
                  <tr key={t._id}>
                    <td style={{ width: "5px" }}>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-accent border-neutral hover:border-neutral"
                            checked={t.completed}
                            readOnly
                            onClick={() => completeTask(t._id, t.completed)}
                          />
                        </label>
                      </div>
                    </td>
                    <td style={{ width: "400px" }}>
                      {t.completed ? <s>{t.name}</s> : t.name}
                      <br />
                      <p className="text-xs">{t.datetime}</p>
                    </td>
                    <td style={{ width: "5px" }} className="text-center">
                      {t.completed ? (
                        <button
                          className="btn btn-xs hover:btn-error"
                          onClick={() => deleteTask(t._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            className="trash-icon bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                        </button>
                      ) : (
                        t.time
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
