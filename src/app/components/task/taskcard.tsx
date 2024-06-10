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

    const url = `/api/tasks`;
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
    const url = `/api/tasks`;

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
  }

  function completeTask(taskId: string, completion: boolean) {
    const id: string = taskId;
    const index: number = taskList.findIndex((x) => x._id === id);
    const tasks: any = [...taskList];
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
    const url = `/api/tasks?updateTask=true`;
    const data = JSON.stringify({
      taskId: taskId,
      completion: completion,
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
                  placeholder={
                    taskList.length === 0
                      ? "Add your first task"
                      : "Add a new task"
                  }
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5"
                />
              </div>
            </div>
          </form>
          {isLoading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          <div>
            <table className="table">
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
                            onClick={() => completeTask(t._id, t.completed)}
                          />
                        </label>
                      </div>
                    </td>
                    <td style={{ width: "400px" }}>
                      {t.completed ? <s>{t.name}</s> : t.name}
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
                            className="trash-icon bi-trash"
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
