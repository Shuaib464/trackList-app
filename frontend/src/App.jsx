import { useEffect, useState } from 'react'
import './App.css'
import DayCard from './components/DayCard'
import {useDispatch, useSelector} from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { fetchMonth } from './store/features/monthSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMonth())
    console.log('Fetching month...')
}, [])
 return(
  // const [days, setDays] = useState([])
  // const navigate = useNavigate();
  // const monthState = useSelector((state) => state.month)
  // console.log("MonthState -: ",monthState)
  // // let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14, 15, 16, 17,18,19,20,21,22,23,24,25]

  // useEffect(() => {
  //   setDays(monthState.arrDays)
  // }, [monthState])

  // useEffect(() => {
  //   console.log("Updated days in app.js =: ", days);
  // }, [days]);

  // if(!monthState.arrDays || days.length <= 0) {
  //   return <h2>Loading...</h2>
  // } else{
  //   return (
  //     <>
  //       <div className='bg-[#172842] min-h-screen py-8'>
  //         <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
  //           <h1 className='text-2xl font-bold text-center mb-8 mt-2'>
  //           {monthState.month}
  //           </h1>
  
  //           {/* days  */}
  //           {
  //             (days.length == 0) ? null : (
  //               <div className='mb-4 p-4 flex flex-row flex-wrap justify-start gap-5 bg-[#ccbed7] rounded-xl'>
  //                 {days.map((day) => (
  //                   <div  
  //                     // to={`todo/${day._id}`}
  //                     key={day.day}>
  //                       <DayCard id={day._id} day={day.day} todos={day.todos} completedTodos={day.completedTodos} />
  //                   </div>
  //                 ))}
  //               </div>
  //             )
  //           }
  //         </div>
  //       </div>
  //     </>
  //   )
  // }
  <div>
    <Outlet />
  </div>
 )
}

export default App

