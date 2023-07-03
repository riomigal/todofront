export default function Validator(props) {
  if (props.data && props.data.errors && props.data.errors[props.name]) {
    return (
      <>
        {props.data.errors[props.name].map((element) => {
          return <p class="text-red-500 text-xs my-2 italic">{element}</p>;
        })}
      </>
    );
  }
  return <></>;
}
