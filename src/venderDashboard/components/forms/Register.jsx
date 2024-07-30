import React,{useState} from 'react'
import { API_URL } from '../../../data/apiPath'

const Register = ({showLoginhandler}) => {
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(true)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username,email,password})
      })

      const data=await response.json()

      if(response.ok){
        console.log(data);
        alert("vender registered successfully")
        setUsername('');
        setEmail('');
        setPassword('');
        showLoginhandler();
      }
    }catch(error){
      console.log("registration unsuccessful");
      alert('Registration failed');
    }
  }

  return (
    <div className='registersection'>
      <form  className='registerform' onSubmit={handleSubmit}>
        <h3 >Vender Register</h3>
        <label ><b>Username</b></label>
        <input type="text" name='username' value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='enter your firm name'></input>

        <label ><b>Email</b></label>
        <input type="email" name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='enter your email'></input>

        <label ><b>Password</b></label>
        <input type="password" name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='enter your password'></input>

        <div className="btnsubmit">
            <button type='submit'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register
