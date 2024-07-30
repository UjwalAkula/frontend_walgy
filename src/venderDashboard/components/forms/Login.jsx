import React,{useState,useEffect} from 'react'
import { API_URL } from '../../../data/apiPath'

const Login = ({showRegisterhandler,showwelcomehandler,setShowLogout}) => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const loginHandler=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch(`${API_URL}/vendor/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({email,password})
      })
      const dataFromServer=await response.json();
      if (response.ok){
        alert('Login success');
        localStorage.setItem('loginToken',dataFromServer.token);
        setEmail('')
        setPassword('')
        showwelcomehandler();
      }

      const vendorId = dataFromServer.vendorId;
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      const vendorDataFromServer = await vendorResponse.json();

      if (vendorResponse.ok) {
        localStorage.setItem('username',vendorDataFromServer.vendorUsername)
        if(vendorDataFromServer.vendorFirmId){
          localStorage.setItem('firm_id', vendorDataFromServer.vendorFirmId);
          localStorage.setItem('firmname',vendorDataFromServer.Firmname)
        }
        setShowLogout(true)
      }


    }catch(error){
      console.log(error)
    }
  };

  return (
    <div className="loginsection">
      <form  className='loginform' onSubmit={loginHandler}>
        <h3 >Vender Login</h3>
        <label ><b>Email</b></label>
        <input type="email" name='email' onChange={(e)=>{setEmail(e.target.value)}} placeholder='enter your email'></input>

        <label ><b>Password</b></label>
        <input type="password" name='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='enter your password'></input>

        <div className="btnsubmit">
            <button type='submit'>Login</button>
        </div>
        <br/>
        <pre><b>New to Walgy?</b> <span onClick={showRegisterhandler}><b>Register</b></span></pre>
      </form>
    </div>
  )
}

export default Login
