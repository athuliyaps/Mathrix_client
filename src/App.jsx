import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Quiz from './pages/Quiz'
import AddQuestion from './pages/AddQuestion'
import DashBoard from './pages/DashBoard'
import Result from './pages/Result'
import AddComment from './pages/AddComment'
import AddCourse from './pages/AddCourse'

function App() {
 
  return (
    <>
     <Routes>
      <Route path={'/'} element={<Landing/>}/>
      <Route path={'/home'} element={<Home/>}/>
      <Route path={'/register'} element={<Auth/>}/>
      <Route path={'/dash'} element={<DashBoard/>}/>
      <Route path={'/quiz'} element={<Quiz/>}/>
      <Route path={'/result'} element={<Result/>}/>
      <Route path={'/addPage'} element={<AddQuestion/>}/>
      <Route path={'/addComment'} element={<AddComment/>}/>
      <Route path={'/courses'} element={<AddCourse/>}/>



       

     </Routes>
    </>
  )
}

export default App
