export default function (checkbox, checkboxData) {
  const props = checkbox.props();

  return (
    props.label == checkboxData.label &&
    props.size == checkboxData.size &&
    props.subheading == checkboxData.subheading
  );
}
