import React from 'react'

const Sidebar = ({showFirmhandler,showproducthandler,showAllproductshandler,disableAddfirm}) => {
  return (
    <div className="sidebar">
      <ul>
        {!disableAddfirm && <li onClick={showFirmhandler}>Add Firm</li>}
        <li onClick={showproducthandler}>Add Products</li>
        <li onClick={showAllproductshandler}>All Products</li>
        <li>User Details</li>
      </ul>
    </div>
  )
}

export default Sidebar
