import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { BsCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import Create from "./Create";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  console.log(todos);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((error) => console.log(error));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3001/update/" + id)
      .then((result) => {
        location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then((result) => {
        location.reload();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div className="task" key={index}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <TiDelete
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
