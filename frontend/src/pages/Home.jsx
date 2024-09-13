import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMonth } from '../store/features/monthSlice'
import DayCard from '../components/DayCard'

function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMonth())
        console.log('Fetching month...')
    }, [])

    const [days, setDays] = useState([])
    const monthState = useSelector((state) => state.month)
    // console.log("MonthState -: ",monthState)
  
    useEffect(() => {
      setDays(monthState.arrDays)
    }, [monthState])
  
    useEffect(() => {
      console.log("Updated days in app.js =: ", days);
    }, [days]);
  
    if(!monthState.arrDays || days.length <= 0) {
      return <h2>Loading...</h2>
    } else{
      return (
        <>
          <div className='bg-[#172842] min-h-screen py-8'>
            <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
              <h1 className='text-3xl font-bold text-center mb-8 mt-2'>
              {monthState.month}
              </h1>
    
              {/* days  */}
              {
                (days.length == 0) ? null : (
                  <div className='mb-4 p-4 pb-5 flex flex-row flex-wrap justify-start gap-5 bg-[#ccbed7] rounded-xl'>
                    {days.map((day) => (
                      <div key={day.day}>
                          <DayCard id={day._id} day={day.day} todos={day.todos} completedTodos={day.completedTodos} />
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