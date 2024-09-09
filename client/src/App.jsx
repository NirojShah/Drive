import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signup from './Pages/signup/Signup'
import Login from './Pages/login/Login'
import Home from './Pages/home/home'
import MyFilesList from './Pages/file/File'
import Quill from './Pages/quill/Quill'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/file' element={<MyFilesList/>}/>
      <Route path='/quill' element={<Quill/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App