import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../store/features/todoSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Todo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todoState = useSelector((state) => state.todo.arrTodo);
  const [todos, setTodos] = useState([]);
  const {dayId} = useParams();
  console.log("DayId in Todopage -> ",dayId);
  
  // const fetchTodo = async () => {
  //   try {
  //     const response = await axios.get("/api/v1/getTodos");
  //     console.log("axios res -> ", response.data.data);
  //     dispatch(setTodo(response.data));
  //     // setTodos(response.data.data);
  //   } catch (error) {
  //     console.log("fetchTodo :: axios error ", error);
  //   }
  // };


  useEffect(() => {
    dispatch(fetchTodos(dayId));
  }, [])
  
  useEffect(() => {
    console.log("updated todoState -> ", todoState);
    setTodos(todoState);
    console.log("updated todos -> ", todos);
  }, [todoState, todos]);

  return (
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="flex flex-col w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">
          Manage Your Todos
        </h1>

        {/* todo form  */}
        <div className="mb-4">
          <TodoForm />
        </div>

        {/* todos list  */}
        <div className="flex flex-wrap gap-y-3">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo._id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))
          ) : (
            <p>No todos available</p>
          )}
        </div>

        <button 
            type="submit" 
            className="mt-4 rounded-lg px-3 py-1 bg-blue-600 text-white shrink-0 w-[30%] mx-auto"
            onClick={() => {navigate('/')}}
            >
                Back
        </button>
      </div>
    </div>
  );
}

export default Todo;
