import React from 'react'
import AllProducts from './AllProducts'
import './App.css'
import Home from './Home'
import Notifications from './Notifications'
import AddProduct from './addProduct'
import Shop from './Shop'
import Login from './Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
<Router>

<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path='/shop' element={<Shop/>}/>
  <Route path='/addProduct' element={<AddProduct/>}/>
  <Route path='/notifications' element={<Notifications/>}/>
  <Route path='/allProducts' element={<AllProducts/>}/>
  <Route path='/login' element={<Login/>}/>
</Routes>

</Router>

  {/* <AllProducts/> */}
  {/* <AddProduct/> */}
  {/* <Notifications/> */}
  {/* <Home/> */}
  {/* <Shop/> */}
 {/*  <Login/> */}
     
    </>



)
}

export default App
