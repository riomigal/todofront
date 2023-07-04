import Spinner from "../form/fields/Spinner";
import { getPriorities, getTasks } from "../services/Requests";
import { useState, useEffect } from "react";
import Task from "./Task";
import TaskFilter from "./TaskFilter";

export default function TaskList() {
  let [tasks, setTasks] = useState({});
  let [showSpinner, setShowSpinner] = useState(false);
  let [priorities, setPriorities] = useState({});

  async function getPriorityOptions() {
    setShowSpinner(true);
    const response = await getPriorities();
    if (response && response.status && response.status === 200) {
      setPriorities(response.data.data);
    }
    setShowSpinner(false);
  }

  async function setTaskList(queryParams) {
    setShowSpinner(true);
    const response = await getTasks(queryParams);
    if (response && response.status && response.status === 200) {
      setTasks(response.data.data);
    }
    setShowSpinner(false);
  }

  useEffect(() => {
    getPriorityOptions();
    setTaskList("");
  }, []);

  function deleteTaskFromList(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <>
      <TaskFilter
        priorities={priorities}
        onFilterChange={(queryParams) => setTaskList(queryParams)}
      />
      <div className="flex m-auto max-w-5xl flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-5">
          TaskList
        </h1>
        {showSpinner && !priorities.length && !tasks.length && <Spinner />}
        {!showSpinner && priorities.length && tasks.length && (
          <ul className="divide-y divide-gray-100">
            {tasks.map((task) => {
              return (
                <Task
                  priorities={priorities}
                  key={task.id}
                  task={task}
                  onDeleteTask={() => deleteTaskFromList(task.id)}
                />
              );
            })}
          </ul>
        )}
        {!showSpinner && !tasks.length && (
          <p>There are no tasks. Please add a new task</p>
        )}
      </div>
    </>
  );
}
