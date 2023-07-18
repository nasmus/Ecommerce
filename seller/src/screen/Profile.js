import React,{useState,useEffect} from "react";
import Sidebar from "../component/Sidebar";

function Profile() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('userInfo'));
    if (items) {
     setItems(items);
    }
  }, []);
  return (
    <div className="profile">
      <Sidebar />
      <div className="profile_page">
        <h4>{items.name}</h4>
        <h4>{items.phone}</h4>
        <h4>{items.email}</h4>
        <h4>{items.role}</h4>
      </div>
    </div>
  );
}

export default Profile;
