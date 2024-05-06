/* eslint-disable */
function Button(props) {
  const { setClicked } = props;
  const onclickHandler = () => {
    setClicked((peraviousValue) => peraviousValue + 1);
  };
  return (
    <button type="button" onClick={onclickHandler}>
      click me
    </button>
  );
}
export default Button;
