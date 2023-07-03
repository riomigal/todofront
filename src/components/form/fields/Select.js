import Validator from "../validation/Validator";

export default function Select(props) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <select
          id={props.id}
          name={props.id}
          required={props.required}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={props.selectedId}
        >
          <option value="">{props.optionText}</option>
          {props.options.map(function (option) {
            return (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
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
