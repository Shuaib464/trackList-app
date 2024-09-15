import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Todo from './pages/Todo.jsx'
import App from './App.jsx'
import Month from './pages/Month.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/month/:monthId',
        element: <Month /> 
      },
      {
        path: '/todo/:dayId',
        element: <Todo />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
