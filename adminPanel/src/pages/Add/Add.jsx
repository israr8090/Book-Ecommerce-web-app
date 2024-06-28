import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Add.css';
import { assets } from '../../assets/assets';

const Add = ({ url }) => {
  //--useState
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: '',
    price: ""
  });

  //--onchangeHandler--
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  //--onSubmitHandler--
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    //--axios post for adding item
    const response = await axios.post(`${url}/api/book/add`, formData);

    //--if success
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        category: '',
        price: ""
      });
      setImage(false);
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    };
  };

  return (
    <>
      <div className="add">
        <h2>ADD PORDUCTS</h2>
        <hr />
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className="flex-row">
            <div className="add-img-upload flex-col">
              <p>Upload Image</p>
              <label htmlFor="image">
                <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
              </label>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>

            <div className="add-product-name flex-col">
              <p>Product name</p>
              <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
          </div>

          <div className="flex-row">
            <div className="add-product-description flex-col">
              <p>Product description</p>
              <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here' required></textarea>
            </div>

            <div className="add-category-price">
              <div className="add-category flex-col">
                <p>Product Category</p>
                <select onChange={onChangeHandler} value={data.category} name="category" id="category">
                  <option value="Select">Select</option>
                  <option value="Business & Economics">Business & Economics</option>
                  <option value="Health & Fitness">Health & Fitness</option>
                  <option value="History">History</option>
                  <option value="Literature">Literature</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Science">Science</option>
                  <option value="Social Science">Social Science</option>
                </select>
              </div>
              <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
              </div>
            </div>

          </div>
          <button type='submit' className='add-button'>Add Product</button>
        </form>
      </div>
    </>
  )
};

export default Add;