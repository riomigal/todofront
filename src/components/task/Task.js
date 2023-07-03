import EditTaskForm from "./EditTaskForm";
import {
  deleteTask,
  markTaskComplete,
  markTaskPending,
} from "../services/Requests";
import { useState } from "react";

export default function Task(props) {
  let [task, setTask] = useState(props.task);
  let [name, setName] = useState(task.name);
  let [description, setDescription] = useState(task.description);
  let [categories, setCategories] = useState(task.categories);
  let [priority, setPriority] = useState(props.task.priority);
  let [completed, setCompleted] = useState(task.completed);
  let [showEditModal, setShowEditModal] = useState(false);

  function getTask() {
    return task;
  }

  function markTaskCompleted() {
    markTaskComplete(task.id).then((response) => {
      if (response.status === 200) {
        setCompleted(true);
      }
    });
  }

  function markTaskIsPending() {
    markTaskPending(task.id).then((response) => {
      if (response.status === 200) {
        setCompleted(false);
      }
    });
  }

  function removeTask() {
    deleteTask(task.id).then((response) => {
      if (response.status === 204) {
        props.onDeleteTask();
      }
    });
  }

  function updateTask(item) {
    setName(item.name);
    setDescription(item.description);
    setCategories(item.categories);
    setPriority(item.priority);
  }

  return (
    <li key={task.id} className="flex flex-wrap justify-between gap-x-6 py-5">
      <div className="flex gap-x-4">
        <div className="flex-auto">
          <p
            key={task.id + "name"}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {name}
          </p>
          <p
            key={task.id + "description"}
            className="my-3 text-sm leading-5 text-gray-500 break-words"
          >
            {description}
          </p>

          {/* <p key={task.id + "created"} className="text-xs">
            {"Created: " + props.task.created}
          </p>
          <p key={task.id + "updated"} className="text-xs">
            {"Updated: " + props.task.updated}
          </p> */}
          <p key={task.id + "priority"} className="text-xs">
            {"Priority: " + priority.name}
          </p>
          <div className="text-sm mt-3" key={task.id + "categories"}>
            {categories.map(function (category) {
              return (
                <span key={task.id + "categories" + category.name}>
                  {"@" + category.name + " "}
                </span>
              );
            })}
          </div>
          <div className="py-4 text-sm" key={task.id + completed}>
            {!completed ? (
              <button
                onClick={markTaskCompleted}
                className="bg-green-500 cursor-pointer hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Mark completed
              </button>
            ) : (
              <button
                onClick={markTaskIsPending}
                className="bg-orange-500 cursor-pointer hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Mark pending
              </button>
            )}
            <span
              onClick={removeTask}
              className="text-xs ml-4 cursor-pointer text-red-500  font-bold py-2 px-4 rounded"
            >
              Delete Task
            </span>
            <button
              onClick={() => {
                setTask(task);
                setShowEditModal(true);
              }}
              className="bg-orange-500 cursor-pointer hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Task
            </button>
            <EditTaskForm
              open={showEditModal}
              close={() => setShowEditModal(false)}
              item={getTask()}
              onUpdateTask={(item) => updateTask(item)}
            />
          </div>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end"></div>
    </li>
  );
}
