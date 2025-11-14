import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
function App() {

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Navigate to='/login' />}
        />
        <Route
          path='login'
          element={<Login />}
        />
        <Route
          path='register'
          element={<SignUp />}
        />
      </Routes>
    </>
  )
}

export default App
