import TodoCss from "./todo.module.css";
function TodoData({ allTask, taskFun }) {
  function handleClick(id) {
    const copyOfArray = [...allTask];

    copyOfArray[id].complete = !copyOfArray[id].complete;

    taskFun(copyOfArray);
  }

  function handleDelete(id) {
    const copyDeleteArray = [...allTask];

    const deletedValues = copyDeleteArray.filter((value, index) => {
      return index !== id;
    });

    taskFun(deletedValues);
  }

  function handleUpdate(id) {
    const copyUpdateArray = [...allTask];
    const oldValue = copyUpdateArray[id].Task;

    const newValue = prompt(`Update Task :- ${oldValue} `, oldValue);

    if (newValue) {
      const newObj = { Task: newValue, complete: false };

      copyUpdateArray.splice(id, 1, newObj);

      taskFun(copyUpdateArray);
    }
  }

  return (
    <>
      <ul className={TodoCss.list_items}>
        {allTask.length === 0 ? (
          <>
            <p className="text-center">No Task Found 🫤</p>
            <hr />
          </>
        ) : (
          allTask.map((value, index) => (
            <li key={index}>
              <div className="form-check d-inline">
                <input
                  type="checkbox"
                  checked={value.complete}
                  onClick={() => {
                    handleClick(index);
                  }}
                  className="form-check-input"
                />{" "}
              </div>

              <span
                style={{
                  textDecoration:
                    value.complete === true ? "line-through red" : "",
                }}
              >
                {value.Task}
              </span>
              <i
                className="bi bi-trash float-end text-danger "
                onClick={() => {
                  handleDelete(index);
                }}
              ></i>
              <i
                className="bi bi-pencil-square float-end text-success me-3 "
                onClick={() => {
                  handleUpdate(index);
                }}
              ></i>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default TodoData;
