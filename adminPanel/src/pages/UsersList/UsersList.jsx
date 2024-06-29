import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './UsersList.css';

function UsersList({ url }) {
  const [users, setUsers] = useState([]);

  //--fetch all users function--
  const fetchUsers = async () => {
    const response = await axios.get(`${url}/api/user/allusers`);
    // console.log(response.data);

    if (response.data.success) {
      setUsers(response.data.data);
    }
    else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <>
      <div className="userlist add flex-col-userlist">
        <b>All Registerd Users List</b>
        <div className="userlist-table">
          <div className="userlist-table-format title">
            <b>Name</b>
            <b>Email Id</b>
          </div>

          {users.map((user, index) => {
            return (
              <>
                <div className="userlist-table-format" key={index}>
                  {/* <img src={`${url}/images/` + item.image} alt="" /> */}
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default UsersList