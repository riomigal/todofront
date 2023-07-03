import { Form, useActionData, useNavigation } from "react-router-dom";

import TextArea from "../form/fields/TextArea";
import TextInput from "../form/fields/TextInput";
import Button from "../form/fields/Button";
import Select from "../form/fields/Select";
import { getPriorities } from "../services/Requests";
import { useState, useEffect } from "react";
import Spinner from "../form/fields/Spinner";

export default function AddTaskForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  let [priorities, setPriorities] = useState([]);
  let [showLoader, setShowLoader] = useState(false);

  function getPriorityOptions() {
    setShowLoader(true);
    getPriorities()
      .then((response) => {
        if (response.status === 200) {
          setPriorities(response.data.data);
        }
      })
      .then(() => setShowLoader(false));
  }

  useEffect(() => {
    getPriorityOptions();
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add a new task to the list
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {!showLoader ? (
          <Form className="space-y-6" method="POST">
            <TextInput
              id="name"
              label="Task Name"
              type="text"
              data={data}
              info="Add task title/name."
              required={true}
            />
            <TextArea
              id="description"
              label="Task Description"
              data={data}
              info="Describe your task."
              required={true}
            />
            <TextInput
              id="categories"
              label="Categories"
              type="text"
              data={data}
              info="Add comma separated list of categories. E.g.: Work,Project1,..."
            />
            <Select
              id="priority_id"
              label="Priorities"
              options={priorities}
              optionText="Select Priority"
              data={data}
              required={true}
            />

            <Button text="Sign up" isSubmitting={isSubmitting} />
          </Form>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
