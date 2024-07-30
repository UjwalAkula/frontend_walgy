import React,{useState,useEffect} from 'react'
import { API_URL } from '../../data/apiPath'

const AllProducts = () => {
    const [products,setProducts]=useState([])

    const productHandler=async()=>{
        try{
            const firmId=localStorage.getItem('firm_id')
            if (!firmId){
                return console.log('Firm Unavailable')
            }

            const response=await fetch(`${API_URL}/product/${firmId}/products`)
            const AllproductsDataFromServer=await response.json()
            setProducts(AllproductsDataFromServer.products)
        }catch(error){
            alert('Failed to fetch products')
            console.log('failed to fetch products',error)
        }
    }

    useEffect(() => {
      productHandler()
      console.log('THis useeffect runs only once when component  loads')
    }, [])

    const deleteProductById=async(productId)=>{
        try{
            const confirmed = confirm('Are you sure you want to delete this product?');
            if (!confirmed) {
                return;
            }

            const response=await fetch(`${API_URL}/product/${productId}`,{
                method:'DELETE'
            })

            if(response.ok){
                setProducts(products.filter((product)=>{ return product._id!==productId}))
                alert('Product deleted successfully')
            }
        }catch(error){
            console.error('failed to delete product')
            alert('failed to delete product.')
        }
    }
    
  return (
    <div className='products-section'>
      {products.length === 0 ?(<p>No products added</p>):(

        <div className="table-wrapper">
            <table className='product-table'>
            <thead>
                <tr>
                    <th colSpan={4} style={{backgroundColor:'azure',color:'#FF6347'}}>{localStorage.getItem('firmname')}</th>
                </tr>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item)=>{
                    return (
                        <tr key={item._id}>
                            <td>{item.productName}</td>
                            <td>{item.price}</td>
                            <td>
                                {item.image && (
                                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} style={{width:'120px',height:'100px'}}/>
                                )}
                            </td>
                            <td>
                                <button onClick={()=>{deleteProductById(item._id)}} >Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
      )}
    </div>
  )
}

export default AllProducts
