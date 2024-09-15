import { Link  } from "react-router-dom"

function DayCard({id, day, month, year, todos, completedTodos}) {
  // console.log("day in dayCArd -- ",day)
  const date = new Date()
  const currentDay = date.getDate();
  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()


  return (
    <div>
      <Link to={`/todo/${id}`}>
        <button className={`ml-3 p-2 mt-3 rounded-2xl border border-red-500 cursor-pointer shadow-md text-xl w-[45px]
                  ${(currentDay === day) && (currentMonth === month) && (currentYear === year) ? ('text-red-600 scale-125 shadow-red-400') : ('text-black')} 
                  ${todos.length <= 0 ? ('bg-slate-50') : (todos.length === completedTodos.length ? ('bg-green-300') : ('bg-red-200'))} 
                  text-center font-bold transition ease-in-out delay-100 hover:translate-y-1 hover:scale-110 duration-300
                hover:bg-rose-200 hover:text-red-500`}
                  >
            {day}
        </button>
      </Link>
    </div>
  )
}

export default DayCard

