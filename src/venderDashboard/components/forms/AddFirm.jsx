import React, { useState } from 'react';
import { API_URL } from '../../../data/apiPath';

const AddFirm = ({setDisableAddfirm,showproducthandler}) => {
  const [firmName, setFirmName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState('');
  const [file, setFile] = useState(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (e) => {
    const value = e.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setFile(selectedImage);
  };

  const addFirmHandler = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');

      if (!loginToken) {
        console.log("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      if (file) {
        formData.append('image', file);
      } else {
        console.log("No image file selected");
        return;
      }

      category.forEach((value) => {
        formData.append('category', value);
      });

      region.forEach((value) => {
        formData.append('region', value);
      });

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'token': `${loginToken}`
        },
        body: formData
      });

      const dataFromServer = await response.json();
      if (response.ok) {
        console.log(dataFromServer);
        alert('Firm added successfully');
        localStorage.setItem('firm_id', dataFromServer.firm_id);
        localStorage.setItem('firmname',dataFromServer.Firmname);
        setFirmName('');
        setArea('');
        setCategory([]);
        setRegion([]);
        setOffer('');
        setFile(null);
        setDisableAddfirm(true)
        showproducthandler()
      }else if(dataFromServer.message==="Vendor sould have only one firm"){
        alert("firm exists,Can not accept more than one firm")
      }
    }catch(error) {
      console.error('Failed to add firm', error)
    }
  }

  return (
    <div className='container-fluid firmsection'>
      <form className="firmform" onSubmit={addFirmHandler}>
        <h3 >Add Firm</h3>
        <label ><b>Firm Name</b></label>
        <input type='text' name='firmName' value={firmName} onChange={(e)=>{setFirmName(e.target.value)}}></input>
        <label ><b>Area</b></label>
        <input type='text' name='area' value={area} onChange={(e)=>{setArea(e.target.value)}}></input>
        {/*<label htmlFor=''><b>Category</b></label>
        <input type='text'></input>*/}
        <div className="check-inp">
          <label ><b>category</b></label>
          <div className="checkboxOuter">
            <div className="checkboxContainer">
              <label >Veg</label>
              <input type="checkbox" checked={category.includes('veg')} value='veg' onChange={handleCategoryChange}></input>
            </div>
            <div className="checkboxContainer">
              <label >Non-Veg</label>
              <input type="checkbox" checked={category.includes('non-veg')} value='non-veg' onChange={handleCategoryChange}></input>
            </div>
          </div>
        </div>
        {/*<label htmlFor=''><b>Region</b></label>
        <input type='text' ></input>*/}

        <div className="region-section">
          <label ><b>Region</b></label>
          <div className="region-Out-container">
            <div className="region-in-container-1">
              <div className="region-in-container">
                <label >South-Indian</label>
                <input type="checkbox" checked={region.includes('south-indian')} value='south-indian' onChange={handleRegionChange} ></input>
              </div>
              <div className="region-in-container">
                <label >North-Indian</label>
                <input type="checkbox" checked={region.includes('north-indian')}  value='north-indian' onChange={handleRegionChange}></input>
              </div>
            </div>
            <div className="region-in-container-2">
              <div className="region-in-container">
                <label >Chinese</label>
                <input type="checkbox" checked={region.includes('chinese')}  value='chinese' onChange={handleRegionChange}></input>
              </div>
              <div className="region-in-container">
                <label >Bakery</label>
                <input type="checkbox" checked={region.includes('bakery')} value='bakery' onChange={handleRegionChange}></input>
              </div>
            </div>
          </div>
        </div>

        <label ><b>Offer</b></label>
        <input type='text' name='offer' value={offer} onChange={(e)=>{setOffer(e.target.value)}}></input>
        <label ><b>Firm Image</b></label>
        <input type='file'  onChange={handleImageUpload}></input>
        <br/>
        <div className="btnsubmit">
            <button type='submit'>submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddFirm
