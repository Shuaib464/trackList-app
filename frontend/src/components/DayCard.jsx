import { Link  } from "react-router-dom"

function DayCard({id, day, todos, completedTodos}) {
  // console.log("day in dayCArd -- ",day)


  return (
    <div>
      <Link to={`/todo/${id}`}>
        <button className={`ml-3 p-2 mt-3 rounded-2xl text-black text-xl w-[45px] text-center font-bold
                   ${todos.length <= 0 ? ('bg-slate-50') : (todos.length === completedTodos.length ? ('bg-green-300') : ('bg-red-200'))} 
                  border border-red-500 cursor-pointer shadow-md
                  transition ease-in-out delay-100 hover:translate-y-1 hover:scale-110 duration-300
                  hover:bg-rose-200 hover:text-red-500`}
                  >
            {day}
        </button>
      </Link>
    </div>
  )
}

export default DayCard

