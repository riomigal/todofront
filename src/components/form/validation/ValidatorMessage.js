export default function ValidatorMessage(props) {
  if (props.data && props.data.message) {
    return (
      <p className="text-red-500 text-xs my-2 italic">{props.data.message}</p>
    );
  }
  return <></>;
}
