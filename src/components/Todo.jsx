import { useEffect, useRef, useState } from "react";
import TodoCss from "./todo.module.css";
import { toast } from "react-hot-toast";
import Task from "./Task";
import Form from "./Form";
import TodoData from "./TodoData";

function Todo() {
  const todo_data = JSON.parse(localStorage.getItem("todo_data")) || [];

  const [task, setTask] = useState("");
  const [todo_task, setTodo_task] = useState(todo_data);
  const [totalTask, setTotalTask] = useState(0);
  const [completeTask, setCompleteTask] = useState(0);
  const [pendingTask, setPendingTask] = useState(0);
  const darkMode = useRef("");
  const darkModeIcon = useRef("");

  function handleForm(e) {
    e.preventDefault();

    const mytask = task.trim();

    if (!mytask) {
      toast.error("Please add task 🙂");
    } else {
      const isVerify = todo_task.some((value, index) => {
        return value.Task.toLowerCase() === mytask.toLowerCase();
      });

      if (isVerify) {
        toast.error("Task already added.❌");
        setTask("");
      } else {
        setTodo_task([...todo_task, { Task: task, complete: false }]);
        toast.success("Task Added..✔️");
        setTask("");
      }
    }
  }

  useEffect(() => {
    const copyOfArray = [...todo_task];

    const TotalTasks = copyOfArray.filter((value, index) => {
      return value;
    });

    setTotalTask(TotalTasks.length);

    const completeTasks = copyOfArray.filter((value, index) => {
      return value.complete;
    });

    setCompleteTask(completeTasks.length);

    const pendingTask = copyOfArray.filter((value, index) => {
      return !value.complete;
    });

    setPendingTask(pendingTask.length);

    localStorage.setItem("todo_data", JSON.stringify(copyOfArray));
  }, [todo_task]);

  function handleClearAll() {
    setTodo_task([]);
  }

  function handleDarkMode() {
    let bgColor = darkMode.current.style.backgroundColor;

    if (bgColor === "") {
      darkMode.current.style.backgroundColor = "black";
      darkMode.current.style.color = "white";
      darkModeIcon.current.className = "bi bi-toggle2-off fs-1";
    } else if (bgColor === "black") {
      darkMode.current.style.backgroundColor = "#52ACFF";
      darkModeIcon.current.className = "bi bi-toggle2-on fs-1";
    } else {
      darkMode.current.style.backgroundColor = "black";
      darkMode.current.style.color = "white";
      darkModeIcon.current.className = "bi bi-toggle2-off fs-1";
    }
  }

  return (
    <>
      <div className={TodoCss.main} ref={darkMode}>
        <i
          className="bi bi-toggle2-on fs-1"
          ref={darkModeIcon}
          onClick={handleDarkMode}
        ></i>

        <h1 className={TodoCss.heading}>My Todo Application 😍</h1>
        <Task Ctask={completeTask} Ttask={totalTask} />
        <h4> Pending Tasks :- {pendingTask}</h4>
        <div>
          <Form myTask={task} updateTask={setTask} formFun={handleForm} />

          <TodoData allTask={todo_task} taskFun={setTodo_task} />

          <button
            className={TodoCss.clear}
            onClick={handleClearAll}
            style={{ display: todo_task.length === 0 ? "none" : "block" }}
          >
            Clear All 👍
          </button>
        </div>
      </div>
    </>
  );
}

export default Todo;
