import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Form } from "react-router-dom";
import TextInput from "../form/fields/TextInput";
import TextArea from "../form/fields/TextArea";
import Select from "../form/fields/Select";
import Button from "../form/fields/Button";
import { getPriorities, updateTask } from "../services/Requests";
import Spinner from "../form/fields/Spinner";
import ValidatorMessage from "../form/validation/ValidatorMessage";

export default function EditTaskForm(props) {
  const cancelButtonRef = useRef(null);
  let [isSubmitting, setIsSubmitting] = useState(false);
  let [priorities, setPriorities] = useState({});
  let [data, setData] = useState([]);

  useEffect(() => {
    async function getPriorityOptions() {
      const response = await getPriorities();
      setPriorities(response.data.data);
    }
    getPriorityOptions();
  }, []);

  async function update(e) {
    setIsSubmitting(true);
    e.preventDefault();
    let formdata = [];
    new FormData(e.target).forEach((value, key) => {
      formdata[key] = value;
    });
    let response = await updateTask(props.item.id, Object.assign({}, formdata));
    setData(response);
    setIsSubmitting(false);
    props.onUpdateTask(response);
    props.close();
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Edit task
                      </Dialog.Title>
                      <div className="mt-2">
                        {priorities.length ? (
                          <Form
                            className="space-y-6"
                            method="POST"
                            onSubmit={update}
                          >
                            <ValidatorMessage data={data} />
                            <TextInput
                              id="name"
                              label="Task Name"
                              type="text"
                              value={props.item.name}
                              data={data}
                              info="Add task title/name."
                              required={true}
                            />
                            <TextArea
                              id="description"
                              label="Task Description"
                              value={props.item.description}
                              data={data}
                              info="Describe your task."
                              required={true}
                            />
                            <TextInput
                              id="categories"
                              label="Categories"
                              value={
                                props.item.categories &&
                                props.item.categories.map((category) => {
                                  return category.name;
                                })
                              }
                              pattern="[a-zA-Z0-9\s,]+"
                              type="text"
                              data={data}
                              info="Add comma separated list of categories (Only alphanumeric, comma and whitespace allowed). E.g.: Work,Project1,..."
                            />
                            <Select
                              id="priority_id"
                              label="Priorities"
                              options={priorities}
                              optionText="Select Priority"
                              data={data}
                              required={true}
                              selectedId={props.item.priority.id}
                            />

                            <Button text="Update" isSubmitting={isSubmitting} />
                          </Form>
                        ) : (
                          <Spinner />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {!isSubmitting ? (
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={props.close}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
