import React ,{useState,useEffect}from 'react'
import { API_URL } from '../../../data/apiPath'

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };


  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller = (e) => {
    const value = e.target.value === 'true';
    setBestSeller(value);
  };

  const handleAddProduct=async(e)=>{
    try{
      e.preventDefault();
      const loginToken=localStorage.getItem('loginToken');
      
      let firmId=localStorage.getItem("firm_id");

      if (!firmId){
        firmId=localStorage.getItem('vendorFirmId')
      }


      if(!loginToken || !firmId){
        console.error('User not authenticated')
        return;
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
       category.forEach((value) => {
        formData.append('category', value);
      }); 
      formData.append('bestSeller', bestSeller);
      if (image) {
        formData.append('image', image); 
      }

      const response=await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:'POST',
        headers:{
          'token':loginToken,
          'firm_Id':firmId
        },
        body:formData
      })

      const dataFromServer=await response.json()

      if (response.ok){
        alert('Product added to firm')
        console.log(dataFromServer)
        setProductName('');
        setPrice('');
        setCategory([]);
        setBestSeller(false);
        setImage(null);
        setDescription('');
      }
      }catch(error){
        console.error('Failed to add product')
        alert('Failed to add product')
    }

  }

  return (
    <div className='firmsection'>
        <form className="firmform" onSubmit={handleAddProduct}>
        <h3 >Add Product</h3>
        <label ><b>Product Name</b></label>
        <input type='text' value={productName} onChange={(e)=>{setProductName(e.target.value)}}></input>
        <label ><b>Price</b></label>
        <input type='text' value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
        {/*<label htmlFor=''><b>Category</b></label>
        <input type='text'></input>*/}

        <div className="category-section">
          <label><b>Category</b></label>
          <div className="category-out-box">
            <div className="veg-in-box">
              <label>Veg</label>
              <input type='checkbox' checked={category.includes('veg')} value="veg" onChange={handleCategoryChange}></input>
            </div>
            <div className="nonveg-in-box">
              <label>Non-Veg</label>
              <input type='checkbox' checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}></input>
            </div>
          </div>
        </div>

        <div className="category-section">
          <label ><b>BestSeller</b></label>
          <div className="category-out-box">

            <div className="bestseller-in-box">
              <label >Yes</label>
              <input type='radio' value="true" checked={bestSeller===true} onChange={handleBestSeller}></input>
            </div>

            <div className="bestseller-in-box">
              <label >No</label>
              <input type='radio' value="false" checked={bestSeller===false} onChange={handleBestSeller}></input>
            </div>

          </div>
        </div>

        {/*<label htmlFor=''><b>Bestseller</b></label>
        <input type='text' ></input>*/}

        <label ><b>Description</b></label>
        <input type='text' value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>

        <label ><b>Product Image</b></label>
        <input type='file' onChange={handleImageUpload }></input>
        <br/>
        <div className="btnsubmit">
            <button type='submit'>submit</button>
        </div>
      </form>
      
    </div>
  )
}

export default AddProduct
