import Navbar from "../components/layout/Navbar";

import TaskList from "../components/task/TaskList";

export default function Tasks() {
  return (
    <>
      <Navbar key="navbar" />
      {localStorage.getItem("token") ? <TaskList key="tasklist" /> : <></>}
    </>
  );
}
