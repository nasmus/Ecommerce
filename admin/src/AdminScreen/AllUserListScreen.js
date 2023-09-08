import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Store } from '../Store';
import Sidebar from "../Component/Sidebar";

function AllUserListScreen() {
    const {state} = useContext(Store);
    const {userInfo} = state;
    const [allUserList, setAllUserList] = useState([]);

    useEffect(() =>{
        const fatchData= async ()=>{
            const userList = await axios.get(`/api/admin/alluser/userlist`,{
                headers: { Authorization: `Bearer ${userInfo.token}` }
            })
            if(userList){
                setAllUserList(userList.data)
            } else {
                console.log('order not found')
            }
        }
        fatchData();
    },[userInfo.token])
  return (
    <div>
        <Sidebar />
        {console.log(allUserList)}
        <table>
          <tr>
            <th>user ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>createdAt</th>
          </tr>
          {allUserList.map((item,index) => (
            <tr key={index} >
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </table>
    </div>
  )
}

export default AllUserListScreen