import React from 'react'
import logo from '../assets/images/pawnee-logo.jpg'
import constants from '../constants'

const Header = () => (
  <div className="h-20 md:h-40 p-3 flex flex-row items-center " style={{ backgroundColor: constants.headerBG }}>
    <img src={logo} className="h-full" />
    <h1 className="text-xl md:text-4xl lg:text-5xl font-black ml-5">City of Pawnee Employee Directory</h1>
  </div>
)

export default Header
