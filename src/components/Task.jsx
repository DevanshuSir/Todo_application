import TaskCss from "./todo.module.css";

function Task(props) {
  return (
    <>
      <section className={TaskCss.task_container}>
        <div className={TaskCss.task_heading}>Task Complete</div>
        <div className={TaskCss.task_complete}>
          {props.Ctask}/{props.Ttask}
        </div>
      </section>
    </>
  );
}

export default Task;
