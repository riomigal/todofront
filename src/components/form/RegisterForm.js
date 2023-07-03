import Button from "./fields/Button";
import TextInput from "./fields/TextInput";
import { Form, useActionData, useNavigation } from "react-router-dom";
import ValidatorMessage from "./validation/ValidatorMessage";

export default function RegisterForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form className="space-y-6" method="POST">
          <ValidatorMessage data={data} />
          <TextInput
            id="name"
            label="Username"
            type="text"
            data={data}
            required={true}
          />
          <TextInput
            id="email"
            label="Email"
            type="email"
            data={data}
            required={true}
          />
          <TextInput
            id="password"
            label="Password"
            type="password"
            data={data}
            required={true}
          />
          <TextInput
            id="password_confirmation"
            label="Password Confirmation"
            type="password"
            data={data}
            required={true}
          />
          <Button text="Sign up" isSubmitting={isSubmitting} />
        </Form>
      </div>
    </div>
  );
}
