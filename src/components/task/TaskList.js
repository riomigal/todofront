import Spinner from "../form/fields/Spinner";
import { getTasks } from "../services/Requests";
import { useState } from "react";
import Task from "./Task";

export default function TaskList() {
  let [showLoader, setShowLoader] = useState(false);
  let [tasks, setTasks] = useState(() => setTaskList());

  function setTaskList() {
    setShowLoader(true);
    getTasks()
      .then((response) => {
        if (response.status === 200) {
          setTasks(response.data.data);
        }
      })
      .then(() => setShowLoader(false));
  }

  function deleteTaskFromList(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
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
            <Task
              key={task.id}
              task={task}
              onDeleteTask={() => deleteTaskFromList(task.id)}
            />
          ))}
        </ul>
      )}
      {!showLoader && tasks && tasks.length < 1 && (
        <p>There are no tasks. Please add a new task</p>
      )}
    </div>
  );
}
