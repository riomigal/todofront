import Spinner from "../form/fields/Spinner";
import {
  deleteTask,
  getTasks,
  markTaskComplete,
  markTaskPending,
} from "../services/Requests";
import { useState, useEffect } from "react";

export default function TaskList() {
  let [tasks, setTasks] = useState([]);
  let [showLoader, setShowLoader] = useState(false);

  function updateTaskList() {
    setShowLoader(true);
    getTasks()
      .then((response) => {
        if (response.status === 200) {
          setTasks(response.data.data);
        }
      })
      .then(() => setShowLoader(false));
  }

  useEffect(() => {
    updateTaskList();
  }, []);

  function markTaskCompleted(id) {
    markTaskComplete(id).then((response) => {
      if (response.status === 200) {
        updateItemCompleted(id);
      }
    });
  }

  function markTaskIsPending(id) {
    markTaskPending(id).then((response) => {
      if (response.status === 200) {
        updateItemCompleted(id);
      }
    });
  }

  function removeTask(id) {
    deleteTask(id).then((response) => {
      if (response.status === 204) {
        updateTaskList();
      }
    });
  }

  function updateItemCompleted(id) {
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          completed: !item.completed,
        };
        return updatedItem;
      }
      return item;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className="flex m-auto max-w-5xl flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-5">
        TaskList
      </h1>
      {showLoader && <Spinner />}
      {!showLoader && tasks && (
        <ul className="divide-y divide-gray-100">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-wrap justify-between gap-x-6 py-5"
            >
              <div className="flex gap-x-4">
                <div className="flex-auto">
                  <p
                    key={task.id + "name"}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {task.name}
                  </p>
                  <p
                    key={task.id + "description"}
                    className="mt-1 text-xs leading-5 text-gray-500 break-words"
                  >
                    {task.description}
                  </p>

                  <p key={task.id + "created"} className="text-xs">
                    {"Created: " + task.created}
                  </p>
                  <p key={task.id + "updated"} className="text-xs">
                    {"Updated: " + task.updated}
                  </p>
                  <p key={task.id + "priority"} className="text-xs">
                    {"Priority: " + task.priority.name}
                  </p>
                  <div className="text-sm mt-3" key={task.id + "categories"}>
                    {task.categories.map(function (category) {
                      return (
                        <span key={task.id + "categories" + category.name}>
                          {"@" + category.name + " "}
                        </span>
                      );
                    })}
                  </div>
                  <div className="py-4 text-sm" key={task.id + task.completed}>
                    {!task.completed ? (
                      <button
                        onClick={() => markTaskCompleted(task.id)}
                        className="bg-green-500 cursor-pointer hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Mark completed
                      </button>
                    ) : (
                      <button
                        onClick={() => markTaskIsPending(task.id)}
                        className="bg-orange-500 cursor-pointer hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Mark pending
                      </button>
                    )}
                    <span
                      onClick={() => removeTask(task.id)}
                      className="text-xs ml-4 cursor-pointer text-red-500  font-bold py-2 px-4 rounded"
                    >
                      Delete Task
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end"></div>
            </li>
          ))}
        </ul>
      )}
      {!showLoader && tasks.length < 1 && (
        <p>There are no tasks. Please add a new task</p>
      )}
    </div>
  );
}
