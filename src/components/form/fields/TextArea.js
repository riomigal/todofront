import Validator from "../validation/Validator";
import { useState } from "react";

export default function TextArea(props) {
  const [value, setValue] = useState(props.value);
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <textarea
          rows="10"
          cols="10"
          id={props.id}
          name={props.id}
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
          required={props.required}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        ></textarea>
      </div>
      {props.data ? <Validator data={props.data} name={props.id} /> : <></>}
      {props.info ? (
        <p className="text-gray-700 text-xs my-2 italic">{props.info}</p>
      ) : (
        <></>
      )}
    </div>
  );
}
