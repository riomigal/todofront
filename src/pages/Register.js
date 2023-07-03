import RegisterForm from "../components/form/RegisterForm";
import Navbar from "../components/layout/Navbar";
import { register } from "../components/services/Requests";

export default function Register() {
  return (
    <>
      <Navbar />
      {localStorage.getItem("token") ? <></> : <RegisterForm />}
    </>
  );
}

export async function action({ request }) {
  const data = await request.formData();

  const formData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
    password_confirmation: data.get("password_confirmation"),
  };

  const responseData = await register(formData);
  return responseData;
}
