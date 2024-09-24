import { useEffect } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import { Outlet } from 'react-router-dom'
import { fetchMonth } from './store/features/monthSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    ;(() => {
        dispatch(fetchMonth())
        console.log('Fetching month...')
    })()
}, [])
 return(
  <div>
    <Outlet />
  </div>
 )
}

export default App

