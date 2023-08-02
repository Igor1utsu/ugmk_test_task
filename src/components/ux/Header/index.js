import React from 'react'

import './style.css'

const Header = ({ title }) => {
  return (
    <header className="header">
      <h1>UGMK test app</h1>
      <h2>{title}</h2>
    </header>
  )
}

export default Header