import { Route, Routes } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import ShoppingCart from "./ShoppingCart"




import React from 'react'

const App = () => {
  return (
    <>

      <Header />
      <Routes>
        <Route path="/" element={<Sidebar />}></Route>
        <Route path="/shopping-cart" element={<ShoppingCart />}></Route>
      </Routes>

    </>
  )
}

export default App;