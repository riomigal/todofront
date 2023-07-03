import Navbar from "../components/layout/Navbar";
import { addTask } from "../components/services/Requests";
import AddTaskForm from "../components/task/AddTaskForm";

export default function AddTask() {
  return (
    <>
      <Navbar />
      {localStorage.getItem("token") ? <AddTaskForm /> : <></>}
    </>
  );
}

export async function action({ request }) {
  const data = await request.formData();

  const formData = {
    name: data.get("name"),
    description: data.get("description"),
    priority_id: data.get("priority_id"),
    categories: data.get("categories"),
  };

  const responseData = await addTask(formData);
  return responseData;
}
