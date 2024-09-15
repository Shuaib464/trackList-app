import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMonthByDate } from '../store/features/monthSlice'
import DayCard from '../components/DayCard'

function Home() {
    const dispatch = useDispatch()
    const [days, setDays] = useState([])
    const monthState = useSelector((state) => state.month)
    const {month, year} = useSelector((state) => state.month)
    // console.log("MonthState -: ",monthState)

    const prevClickHandler = () => {
      // console.log('Month value -> ',month)
      let prevMonth = 0
      let prevYear = 0
      if(month === 0) {
          prevMonth = 11;
          prevYear = year -1;
      } else {
          prevMonth = month - 1;
          prevYear = year
      }
      // console.log('Prev-Month value -> ',prevMonth)
      dispatch(fetchMonthByDate({
          month: prevMonth,
          year: prevYear
      }))
      console.log('prev clicked')
    }
    const nextClickHandler = () => {
      // console.log('Month value (next) -> ', month);
      let nextMonth = 0;
      let nextYear = 0;
      if(month === 11) {
          nextMonth = 0;
          nextYear = year + 1;
      } else {
          nextMonth = month + 1;
          nextYear = year
      }
      // console.log('next-Month value (next) -> ', nextMonth);
      dispatch(fetchMonthByDate({
          month: nextMonth,
          year: nextYear
      }))
      console.log('next clicked')
    }

    // useEffect(() => {
    //     dispatch(fetchMonth())
    //     console.log('Fetching month...')
    // }, [])
  
    useEffect(() => {
      setDays(monthState.arrDays)
    }, [monthState])
    
    if(!monthState.arrDays || days.length <= 0) {
      return <h2>Loading...</h2>
    } else{
      return (
        <>
          <div className='bg-[#172842] min-h-screen py-8'>
            <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
              <div className='flex justify-between items-center'>
                <button className='text-lg cursor-pointer border py-1 px-2 mr-1 rounded-lg transition ease-in-out delay-75 duration-200 hover:scale-110'
                    onClick={prevClickHandler}>
                  Previous
                </button>
                <div className='flex flex-col mb-6'>
                  <h1 className='text-3xl font-bold text-center mt-2'>
                    {monthState.monthName}
                  </h1>
                  <p className='text-center font-semibold text-xl'>{year}</p>
                </div>
                <button className='text-lg cursor-pointer border py-1 px-2 mr-1 rounded-lg transition ease-in-out delay-75 duration-200 hover:scale-110' 
                    onClick={nextClickHandler}>
                  Next
                </button>
              </div>
    
              {/* days  */}
              {
                (days.length == 0) ? null : (
                  <div className='mb-4 p-4 pb-5 flex flex-row flex-wrap justify-start gap-5 bg-[#ccbed7] rounded-xl'>
                    {days.map((day) => (
                      <div key={day.day}>
                          <DayCard id={day._id} day={day.day} month={month} year={year} todos={day.todos} completedTodos={day.completedTodos} />
                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          </div>
        </>
      )
    }
}

export default Home