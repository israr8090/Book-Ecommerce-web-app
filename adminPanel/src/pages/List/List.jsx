import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  //--fetch all items list 
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/book/list`);
    // console.log(response.data);

    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error");
    }
  };

  //--remove items
  const removeBook = async (bookId) => {
    const response = await axios.post(`${url}/api/book/remove`, { id: bookId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  }

  //--
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="list add flex-col">
        <p>All Books List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {list.map((item, index) => {
            return (
              <>
                <div className="list-table-format" key={index}>
                  <img src={`${url}/images/` + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p onClick={() => removeBook(item._id)} className='cursor'>X</p>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
};

export default List;