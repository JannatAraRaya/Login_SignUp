import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {

  return (
    <>
 <div className='text-white flex justify-center items-center bg-cover h-[100vh]' style = {{"backgroundImage":"url('../src/assets/background.jpg')"}}>
<Routes>
  <Route path='login' element={<Login/>}></Route>
  <Route path='sign-up' element={<SignUp/>}></Route>
</Routes>
 </div>
    </>
  )
}

export default App
