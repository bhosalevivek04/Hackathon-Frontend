import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './Pages/SignUp/SignUp'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login/Login'
import AuthProvider from './provider/AuthProvider';
import Home from './pages/Home/Home';
import AllMovies from './pages/AllMovies/AllMovies'
import MyReviews from './pages/MyReviews/MyReviews'
import SharedWithMe from './pages/SharedWithMe/SharedWithMe'
import AllReviews from './pages/AllReviews/AllReviews'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import AddReview from './pages/AddReview/AddReview';
import ChangePassword from './pages/ChangePassword/ChangePassword'
import EditProfile from './pages/EditProfile/EditProfile'
import EditReview from './pages/EditReview/EditReview';
import ShareReview from './pages/ShareReview/ShareReview';

function App() {
  return (<div>
    <AuthProvider>
      <Routes>
        <Route
          path='/'
          element={<Navigate to='login' />}
        />
        <Route
          path='login'
          element={<Login />}
        />
        <Route
          path='signup'
          element={<SignUp />}
        />

        <Route
          path='home'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route
            path='allMovies'
            element={<AllMovies />}
          />
          <Route
            path='myReviews'
            element={<MyReviews />}
          />
          <Route
            path='sharedWithMe'
            element={<SharedWithMe />}
          />
          <Route
            path='allReviews'
            element={<AllReviews />}
          />
          <Route
            path='add-review/:id'
            element={<AddReview />}
          />
          <Route
            path='change-password'
            element={<ChangePassword />}
          />
          <Route
            path='edit-profile'
            element={<EditProfile />}
          />
          <Route
            path='edit-review/:id'
            element={<EditReview />}
          />
          <Route
            path='share-review/:id'
            element={<ShareReview />}
          />
        </Route>
      </Routes>
    </AuthProvider>
    <ToastContainer />
  </div>)
}

export default App
