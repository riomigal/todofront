import Button from "./fields/Button";
import TextInput from "./fields/TextInput";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import ValidatorMessage from "./validation/ValidatorMessage";

export default function LoginForm() {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (data && data.status && data.status === 200) {
    navigate("/tasks", { replace: true });
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form className="space-y-6" method="POST">
          <ValidatorMessage data={data} />
          <TextInput id="email" label="Email" type="email" data={data} />
          <TextInput
            id="password"
            label="Password"
            type="password"
            data={data}
          />
          <Button text="Login in" isSubmitting={isSubmitting} />
        </Form>
      </div>
    </div>
  );
}
