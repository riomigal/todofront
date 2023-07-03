import LoginForm from "../components/form/LoginForm";
import Navbar from "../components/layout/Navbar";
import { login } from "../components/services/Requests";

export default function Login() {
  return (
    <>
      <Navbar />
      {localStorage.getItem("token") ? <></> : <LoginForm />}
    </>
  );
}

export async function action({ request }) {
  const data = await request.formData();

  const formData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const responseData = await login(formData);
  return responseData;
}
