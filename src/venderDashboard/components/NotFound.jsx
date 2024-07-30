import React from 'react'
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='notfound'>
      <h3>404</h3>
      <h4>Page Not Found</h4>
      <Link to='/'>
        <b> Get back to home page</b>
      </Link>
    </div>
  )
}

export default NotFound
