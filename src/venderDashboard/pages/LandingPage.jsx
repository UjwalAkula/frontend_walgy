import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import Footer from '../components/Footer'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [showLogin,setShowLogin]=useState(false)
  const [showRegister,setShowRegister]=useState(false)
  const [showAddfirm,setShowAddfirm]=useState(false)
  const [showAddproduct,setShowAddproduct]=useState(false)
  const [showAllProducts,setShowAllProducts]=useState(false)
  const [showWelcome,setShowWelcome]=useState(false)
  const [showLogout,setShowLogout]=useState(false)
  const [disableAddfirm,setDisableAddfirm]=useState(false)
 

  useEffect(() => {
    const loginToken=localStorage.getItem('loginToken')
    if (loginToken){
      setShowLogout(true)
    }
  }, [])
  
  useEffect(()=>{
    const firmId=localStorage.getItem('firm_id')
    if (firmId){
      setDisableAddfirm(true)
    }
  },[localStorage.getItem('firm_id')])

  function showLoginhandler() {
    setShowLogin(true)
    setShowRegister(false)
    setShowAddfirm(false)
    setShowAddproduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  const showRegisterhandler=()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowAddfirm(false)
    setShowAddproduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  const showFirmhandler=()=>{
    setShowLogin(false)
    setShowRegister(false)
    setShowAddfirm(true)
    setShowAddproduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  const showproducthandler=()=>{
    setShowLogin(false)
    setShowRegister(false)
    setShowAddfirm(false)
    setShowWelcome(false)
    setShowAddproduct(true)
    setShowAllProducts(false)
  }

  const showwelcomehandler=()=>{
    setShowLogin(false)
    setShowRegister(false)
    setShowAddfirm(false)
    setShowAddproduct(false)
    setShowWelcome(true)
    setShowAllProducts(false)
  }

  const showAllproductshandler=()=>{
    setShowLogin(false)
    setShowRegister(false)
    setShowAddfirm(false)
    setShowAddproduct(false)
    setShowWelcome(false)
    setShowAllProducts(true)
  }

  const LogoutHandler=()=>{
    const logoutConfirmation=confirm('Are you sure you want to log out?')

    if(!logoutConfirmation){
      return;
    }

    localStorage.clear()
    setShowLogout(false)
    window.location.reload()
  }

  const isloggedin=localStorage.getItem('loginToken');

  return (
    <div>
      <div className="landingsection">
        <Navbar showLoginhandler={showLoginhandler} showLogout={showLogout} LogoutHandler={LogoutHandler}/>
        <div className="main-content">
          {showLogin && <Login showRegisterhandler={showRegisterhandler} showwelcomehandler={showwelcomehandler} setShowLogout={setShowLogout}/>}
          {showRegister && <Register showLoginhandler={showLoginhandler}/>}
          <div className="collectionsection">
            {isloggedin && <Sidebar showFirmhandler={showFirmhandler} showproducthandler={showproducthandler} showAllproductshandler={showAllproductshandler}
            disableAddfirm={disableAddfirm}/>}
            {showAddfirm && <AddFirm setDisableAddfirm={setDisableAddfirm} showproducthandler={showproducthandler}/>}
            {showAddproduct && <AddProduct/>}
            {showWelcome && <Welcome/>}
            {showAllProducts && <AllProducts />}
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default LandingPage
