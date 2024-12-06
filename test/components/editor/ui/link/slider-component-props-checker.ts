export default function (slider, sliderData) {
  const props = slider.props();

  return (
    props.marks == sliderData.marks &&
    props.initialValue == sliderData.value &&
    props.subheading == sliderData.subheading
  );
}
