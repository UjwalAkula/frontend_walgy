import React from 'react'

const Navbar = ({showLoginhandler,showLogout,LogoutHandler}) => {
  return (
    <div className="navsection">
        <div className="company">
          Walgy
        </div>
        <div className="title">
          <b>Vender Dashboard</b>
        </div>
        <div className="userAuth">
          {!showLogout?<button className="btnlogin" onClick={showLoginhandler}>Login</button>:<button className="btnlogin" onClick={LogoutHandler}>Logout</button>}
        </div>
    </div>
  )
}

export default Navbar
