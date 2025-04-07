import { useRef } from "react";
import TodoCss from "./todo.module.css";
function Form({ formFun, myTask, updateTask }) {
  const refElement = useRef("");

  console.log(refElement.current.style);

  function handleFocus() {
    refElement.current.focus();
    refElement.current.style.border = "2px solid red";
  }

  return (
    <>
      <form onSubmit={formFun}>
        <input
          type="text"
          className={TodoCss.input_Box}
          value={myTask}
          onChange={(e) => {
            updateTask(e.target.value);
          }}
          ref={refElement}
        />
        <button className={TodoCss.btn_vibrate} onClick={handleFocus}>
          Add Task
        </button>
      </form>
    </>
  );
}

export default Form;
